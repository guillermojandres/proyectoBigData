<?php

namespace DG\AdminBundle\Entity;

use Symfony\Component\Security\Core\Role\RoleInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * CtlRol
 *
 * @ORM\Table(name="ctl_rol")
 * @ORM\Entity
 */
class CtlRol implements RoleInterface
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="rol", type="string", length=555, nullable=false)
     */
    private $rol;
    
      /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CtlUsuario", mappedBy="ctlRol")
     */
    private $ctlUsuario;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->ctlUsuario = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set rol
     *
     * @param string $rol
     * @return CtlRol
     */
    public function setRol($rol)
    {
        $this->rol = $rol;

        return $this;
    }

    /**
     * Get rol
     *
     * @return string 
     */
    public function getRol()
    {
        return $this->rol;
    }

     public function getRole() {
        return $this->getRol();
    }
    
    public function __toString() {
        return $this->getRole();
    }   
    

    /**
     * Add ctlUsuario
     *
     * @param \ERPAdminBundle\Entity\CtlUsuario $ctlUsuario
     * @return CtlRol
     */
    public function addCtlUsuario(\ERPCRMBundle\Entity\CtlUsuario $ctlUsuario)
    {
        $this->ctlUsuario[] = $ctlUsuario;

        return $this;
    }

    /**
     * Remove ctlUsuario
     *
     * @param \ERPAdminBundle\Entity\CtlUsuario $ctlUsuario
     */
    public function removeCtlUsuario(\ERPCRMBundle\Entity\CtlUsuario $ctlUsuario)
    {
        $this->ctlUsuario->removeElement($ctlUsuario);
    }

    /**
     * Get ctlUsuario
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCtlUsuario()
    {
        return $this->ctlUsuario;
    }

  

}
