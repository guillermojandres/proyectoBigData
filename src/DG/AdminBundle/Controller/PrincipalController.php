<?php

namespace DG\AdminBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpKernel\Exception;
use DG\AdminBundle\Entity\SQL;

/**
 * Maquina controller.
 *
 * @Route("admin/Principal")
 */
class PrincipalController extends Controller
{
    /**
     * Lists all MaMaquina entities.
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
            switch ($tipoBD) {
                case 1:
                $dsn = "Driver={ODBC Driver 11 for SQL Server};Server={JANDRES};Database=tempdb;Trusted_Connection=yes;ColumnEncryption=E nabled;";  
                $usuario = "Jandres\GJandres"; 
                $clave=""; 
                $cid=odbc_connect($dsn, $usuario, $clave); 
                
                if (!$cid){ 
                echo 'Error en la conexion'; 
                }
                else{
                    
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
        
        $isAjax = $this->get('Request')->isXMLhttpRequest();

         if($isAjax){
            
                $em = $this->getDoctrine()->getManager();
                $nombreBase = $_SESSION["estado"];
                
                /*objeto de conexion*/
                $cid = $this->crearConexion($nombreBase);
                
                /*Tablas de la base de datos*/
                $tablasBase = $this->retornarTablas($nombreBase);
                $numero = count($tablasBase);
                
         
                /*Agregar campo unico a las tablas*/
                 /*Agregar campo unico a las tablas*/
                   for ($i=0;$i<$numero;$i++){
                    $tabla = $tablasBase[$i];
                    $sql="SELECT *, uuid = newid() into ".$nombreBase.".dbo.".$tabla."".$i." FROM ".$tabla; 
                    $result=odbc_exec($cid,$sql);
           
                    }
                    
                    
                   /*Seleccionar el orden de creacion de las tablas*/
                    
                   $tablasOrdenadas = $this->retornarTablasSegunOrdenDeCreacion($nombreBase);
                      
                      
                  /*Borrar las tablas originales de la base*/
                  for ($i=0;$i<$numero;$i++){
                        $tabla = $tablasOrdenadas[$i];
                        $sql="DROP TABLE ".$tabla; 
                        $result=odbc_exec($cid,$sql);
           
                    }
 
                }
                
                
                
               return new JsonResponse();
       
            }
            
            
            function crearConexion($nombreBase) {
                $dsn = "Driver={ODBC Driver 11 for SQL Server};Server={JANDRES};Database=".$nombreBase.";Trusted_Connection=yes;ColumnEncryption=E nabled;";  
                $usuario = "Jandres\GJandres"; 
                $clave=""; 
                $cid=odbc_connect($dsn, $usuario, $clave);
                return $cid;
                
            }
            
            
            
            
            function retornarTablas($nombreBase) {
                
             
                $cid= $this->crearConexion($nombreBase);
                if (!$cid){ 
                    var_dump('Error en la conexion'); 
                }
                else{
                    
                    $valor = array();   
                    $sql="SELECT name FROM sys.Tables"; 
                    $result=odbc_exec($cid,$sql); 
                    while(odbc_fetch_row($result)){
                    for($i=1;$i<=odbc_num_fields($result);$i++){
                               $valor[]=odbc_result($result,$i);
                           }
                       }
                 
                   
                } 
                return $valor;
                
            }
            
            
            function retornarTablasSegunOrdenDeCreacion($nombreBase) {
                
             
                $cid= $this->crearConexion($nombreBase);
                if (!$cid){ 
                    var_dump('Error en la conexion'); 
                }
                else{
                    
                    $valor = array();   
                    $sql="SELECT name as nombre FROM sys.objects WHERE type = 'U' ORDER BY create_date desc"; 
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
