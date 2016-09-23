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
                $hostname = 'JANDRES';
                $port = '1433';
                $dbname = 'tempdb';
                $username = 'Jandres\GJandres';
                $pwd = '';
                
                $obj = new SQL($hostname, $port, $dbname, $username, $pwd);
                $n=$obj->connect();
                var_dump($n);
                die();
                   
                break;
                
                default:
                   var_dump("Moriste en el intento");
                    break;
            }
            
            
          
        
            return new Response(json_encode($data)); 
            
         }
        
        
    }

    
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    
    
    

    
}
