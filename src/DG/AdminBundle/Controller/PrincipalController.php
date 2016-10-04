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
                    
                    
                $dsn = "Driver={ODBC Driver 11 for SQL Server};Server={JANDRES};Database=prueba;Trusted_Connection=yes;ColumnEncryption=E nabled;";  
                $usuario = "Jandres\GJandres"; 
                $clave=""; 
                $cid=odbc_connect($dsn, $usuario, $clave); 
                
                if (!$cid){ 
                echo 'Acm1pt'; 
                }
                else{
                    
                        
                    $sql="SELECT name FROM master.dbo.sysdatabases"; 
                    $result=odbc_exec($cid,$sql); 
                    $x['databases']= odbc_result_all($result);
                    $y = new Response(json_encode($x));
                    var_dump($y);
                    die();
                    
                
                } 
               
                   
                break;
                
                default:
                var_dump("Moriste en el intento");
                break;
            }
            
            
          
        
            return new Response(json_encode($data)); 
            
         }
        
        
    }



    
}
