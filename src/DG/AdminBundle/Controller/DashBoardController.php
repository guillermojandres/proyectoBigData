<?php //

namespace DG\AdminBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use DG\AdminBundle\Entity\ClientePotencial;
use DG\AdminBundle\Form\ClientePotencialType;
use Symfony\Component\HttpKernel\Exception;


/**
 * ClientePotencial controller.
 *
 * @Route("admin/dashboard")
 */
class DashBoardController extends Controller
{
    /**
     * Lists all ClientePotencial entities.
     *
     * @Route("/", name="dashboard_index",options={"expose"=true})
     * @Method("GET")
     */
    public function indexAction()
    {
        
        return $this->render('dashboard/index.html.twig', array(
            
            
        ));
    }
    
     /**
     * Lists all ClientePotencial entities.
     *
     * @Route("/cPanel", name="dashboard_cpanel",options={"expose"=true})
     * @Method("GET")
     */
    public function CRMAction()
    {
        return $this->render('dashboard/dashboardcpanel.html.twig', array(
            
        ));
    }
    
    
    
    
    
 }
