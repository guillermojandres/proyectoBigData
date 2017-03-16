<?php

namespace DG\AdminBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpKernel\Exception;


/**
 * Principal controller.
 *
 * @Route("admin/Principal")
 */
class PrincipalController extends Controller
{
    /**
     * Lists all Principal entities.
     *
     * @Route("/", name="admin_index_principal",options={"expose"=true})
     * @Method("GET")
     */
    public function indexAction()
    {
        

        return $this->render('principal/dbc.html.twig', array(
         
        ));
    }

    
      
     /**
     * @Route("/mostrarBd/data", name="mostrarBd", options={"expose"=true})
     * @Method("POST")
     */

      public function MostrarBdAction(Request $request) {
        
        $isAjax = $this->get('Request')->isXMLhttpRequest();

         if($isAjax){
            
            $em = $this->getDoctrine()->getManager();
            $tipoBD = $request->get('dbMotor');
             $user = $request->get('user');
             $host = $request->get('host');
             $port = $request->get('port');
             $pass = $request->get('pass');
            switch ($tipoBD) {
                
                case 1:
                $dsn = "Driver={ODBC Driver 11 for SQL Server};Server={".$host."};Database=tempdb;Trusted_Connection=yes;ColumnEncryption=Enabled;";  
                $usuario = $user; 
                $clave=$pass; 
                
                try {
                    $cid=odbc_connect($dsn, $usuario, $clave); 
                } catch (\Exception $exc) {
                    $datas["estado"]=false; 
                    return new JsonResponse($datas);
                                       
                }
                if (!$cid){ 
                    var_dump('Error en la conexion :('); 
                }
                else{
                    $PARAMETROS[0]=$host;
                    $PARAMETROS[1]=$user;
                    $PARAMETROS[2]=$pass;
                    $PARAMETROS[3]=$port;
                    
                    $_SESSION["parametros"]=$PARAMETROS;
                    
                    $valores = array();   
                    $sql="SELECT name FROM master.dbo.sysdatabases"; 
                    $result=odbc_exec($cid,$sql); 
                    while(odbc_fetch_row($result)){
                    for($i=1;$i<=odbc_num_fields($result);$i++){
                               $valores[]=odbc_result($result,$i);
                           }
                       }
                       
                } 
                break;
                
                default:
                var_dump("Valores invalidos");
                break;
            }
            
            return new Response(json_encode($valores)); 
            
         }
        
        
    }
    
    
    /**
     * @Route("/mostrarTablas/data/", name="mostrarTablas", options={"expose"=true})
     * @Method("POST")
     */
    
      public function MostrarTablasAction(Request $request) {
        
        $isAjax = $this->get('Request')->isXMLhttpRequest();

         if($isAjax){
            
               $em = $this->getDoctrine()->getManager();
               $nombreBase = $request->get('nombreBase');
               $_SESSION["estado"]=$nombreBase;
               $valor = $this->retornarTablas($nombreBase);
                
               return new JsonResponse($valor);
       
            }
            
 
         }
         
    /**
     * @Route("/conversion/data/", name="conversion", options={"expose"=true})
     * @Method("POST")
     */
    
      public function ConversionAction(Request $request) {
        header("Content-Type:text/html;charset=utf-8");
        $isAjax = $this->get('Request')->isXMLhttpRequest();
        

         if($isAjax){
            
                $em = $this->getDoctrine()->getManager();
                $nombreBase = $_SESSION["estado"];
                
                /*objeto de conexion*/
                $cid = $this->crearConexion($nombreBase);
                
                /*Tablas de la base de datos*/
                $tablasBase = $this->retornarTablas($nombreBase);
                $numero = count($tablasBase);
                
                $metaDataTablas = $this->retornarTablasSegunGerarquia($nombreBase);
                $_SESSION["metadata"]=$metaDataTablas;
                                
//Crear Json File
                $metaTabla = $_SESSION["metadata"];
                
                $SUPERSQL="";
                $superSQL1="SELECT ";
                $superSQL2=" from ";
                $superSQL3="\n";
                
//Concateno todas las tablas a las que les hago un SELECT
                $tablasOrdenadas = $_SESSION["banderas"];
                
                for ($l=0;$l<count($tablasOrdenadas);$l++) {
                    
                     if ($l==0){
//                         $alias = $this->retornarAlias($tablasOrdenadas[$l]);
                         $superSQL2.=$tablasOrdenadas[$l];
                    }
                        if($l<count($tablasOrdenadas)-1){
                            $etx=".*,";
                        }else{
                            $etx=".*";
                        }
//                      $alias = $this->retornarAlias($tablasOrdenadas[$l]);
                     $superSQL1.=" ".$tablasOrdenadas[$l].$etx;
                        
                }
//                   
 
          
// Hago todos los left utter joins
          
               foreach ($metaTabla as $row){
                  
                     $superSQL3.=" left outer join ".$row["tablaHija"]." on ".$row["tablaPadre"].".".$row["pk"]." = " .$row["tablaHija"].".".$row["llaveExtranjera"]."\n";
    
                }                 
                $v= array();
                $SUPERSQL=$superSQL1.$superSQL2.$superSQL3;

                $result=odbc_exec($cid,$SUPERSQL); 
              
                 while ($info = odbc_fetch_array($result)) {
                     $nuevoArray = $this->utf8_converter2($info);
                    $v[] = array_map('utf8_encode', $nuevoArray);
                 }
                 
                $near = json_encode($v, JSON_UNESCAPED_UNICODE);
//                print(json_last_error_msg());
                
               
             $fp = fopen('jsonFiles/'.$nombreBase.'.json', 'w+');
             fwrite($fp, print_r($near,true));
             fclose($fp);
            
            $ultima_linea = system('"C:\Program Files\MongoDB\Server\3.2\bin\mongoimport" --db '.$nombreBase.' --collection '.$nombreBase.' --file C:\xampp\htdocs\proyectos\proyectoBigData\jsonFiles\\'.$nombreBase.'.json --jsonArray', $retval);

                    $data["estado"]=true;
                    return new JsonResponse($data);
                }
                  
               
       
            }
            
           function utf8_converter2(&$array) {

               foreach ($array as $key =>$row ){
                   
                   if(!mb_detect_encoding($key, 'utf-8', true)){
		               $key2 = utf8_encode($key);
                       $array[$key2]=$array[$key];
                       unset($array[$key]);        
                    }
                   
               }
			  
               return $array;
          }
            
            function retornarAlias($tabla) {
                
                $valor = str_split($tabla);
                $dimension = count($valor);
                $retorno = $valor[0].$valor[$dimension-3].$valor[$dimension-2].$valor[$dimension-1];
                return $retorno;
            }
            function crearConexion($nombreBase) {
                if ($_SESSION["parametros"]){
                    $parametros = $_SESSION["parametros"];
                     $dsn = "Driver={ODBC Driver 11 for SQL Server};Server={".$parametros[0]."};Database=".$nombreBase.";Trusted_Connection=yes;ColumnEncryption=Enabled;";  
                     $usuario =$parametros[1]; 
                     $clave=$parametros[2]; 
                     $cid=odbc_connect($dsn, $usuario, $clave);
                    return $cid;
                    
                }
               
                
            }
            
            
            function retornarTablasSegunGerarquia($nombreBase) {
                $cid= $this->crearConexion($nombreBase);
                $tablasNormales = $this->retornarTablas($nombreBase);
                if (!$cid){ 
                    var_dump('Error en la conexion :('); 
                }
                else{
                    
                    $valor = array(); 
                    $tablas = array();
                    
                    for ($i=0;$i<count($tablasNormales);$i++) {
                        
                        $sql=" EXEC sp_fkeys '".$tablasNormales[$i]."';"; 
                        $result=odbc_exec($cid,$sql);
                        while(odbc_fetch_row($result)){
                        for($k=1;$k<=odbc_num_fields($result);$k++){
                                   $valor[]=odbc_result($result,$k);
                               }
                           }
                         
                                $tablas[$tablasNormales[$i]]=($valor);
                                unset($valor);

                         $valor = array();
                     }
                
                    //Empezamos el ordenamiento de las llaves foraneas de los registros
                    $cantidadForaneas=0;
                    $nArreglo = array();
                    $banderas = array();
                    $p=0;
                    foreach ($tablas as $registro){
                           $p=$p+1;
                         for ($m=0;$m<count($registro);$m=$m+14){
                             if($p==1){
                                 $nombrePrimeraTabla=$registro[2];
                             }
                         }
                    }
                    
                    
                    $banderas[]=$nombrePrimeraTabla;
                   
                $existenciaHijo = false;
                $existenciaPadre = false;
                    foreach ($tablas as $registro){

                         for ($m=0;$m<count($registro);$m=$m+14){
                                 $numeroBanderas=count($banderas);
                                    for($j=0;$j<$numeroBanderas;$j++){

                                        if($banderas[$j]==$registro[$m+2]){
                                            $existenciaPadre = true;
                                            for ($k=0;$k<$numeroBanderas;$k++){
                                                if ($banderas[$k]==$registro[$m+6]){
                                                    $existenciaHijo = true;
                                                    exit();
                                                }
                                            }
                                        }
                                    }

                                    if ($existenciaPadre == false){

                                        for ($g=0;$g<$numeroBanderas;$g++){
                                                if ($banderas[$g]==$registro[$m+6]){
                                                    $existenciaHijo = true;

                                                }
                                        }
                                    }
                                  if($existenciaHijo==false && $existenciaPadre== true){
                                       $nArreglo[]=["tablaPadre"=>$registro[$m+2],"pk"=>$registro[$m+3],"tablaHija"=>$registro[$m+6],"llaveExtranjera"=>$registro[$m+7]];
                                       $banderas[]=$registro[$m+6];
                                   }else if($existenciaHijo==true && $existenciaPadre== false){
                                       $nArreglo[]=["tablaPadre"=>$registro[$m+6],"pk"=>$registro[$m+7],"tablaHija"=>$registro[$m+2],"llaveExtranjera"=>$registro[$m+3]];
                                       $banderas[]=$registro[$m+2];
                                   }   

                             }
                        $existenciaHijo = false;
                        $existenciaPadre = false; 

                     }
                   $_SESSION["banderas"]=$banderas;  
//                    var_dump($banderas);
//                    die();
                   return $nArreglo;
                   
                } 
                  
            }
            
            function retornarTablas($nombreBase) {
                
             
                $cid= $this->crearConexion($nombreBase);
                if (!$cid){ 
                    var_dump('Error en la conexion'); 
                }
                else{
                    
                    $valor = array();   
                    $sql="SELECT name  FROM sys.tables WHERE type = 'U' AND sys.tables.name != 'sysdiagrams'  ORDER BY create_date asc;"; 
                    $result=odbc_exec($cid,$sql); 
                    while(odbc_fetch_row($result)){
                    for($i=1;$i<=odbc_num_fields($result);$i++){
                               $valor[]=odbc_result($result,$i);
                           }
                       }
                 
                   
                } 
                return $valor;
                
            }
            
            
            
            
            
            
    
}
