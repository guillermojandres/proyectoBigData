<?php

namespace DG\AdminBundle\Entity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * CtlUsuario
 *
 * @ORM\Table(name="ctl_usuario")
 * @ORM\Entity
 */
class CtlUsuario implements AdvancedUserInterface, \Serializable
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
     * @ORM\Column(name="username", type="string", length=45, nullable=false)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string", length=255, nullable=false)
     */
    private $salt;

    /**
     * @var boolean
     *
     * @ORM\Column(name="estado", type="boolean", nullable=false)
     */
    private $estado;

//    /**
//     * @var \CtlEmpresa
//     *
//     * @ORM\ManyToOne(targetEntity="CtlEmpresa")
//     * @ORM\JoinColumns({
//     *   @ORM\JoinColumn(name="ctl_empresa_id", referencedColumnName="id")
//     * })
//     */
//    private $ctlEmpresa;
//
//    /**
//     * @var \AbgPersona
//     *
//     * @ORM\ManyToOne(targetEntity="AbgPersona")
//     * @ORM\JoinColumns({
//     *   @ORM\JoinColumn(name="rh_persona_id", referencedColumnName="id")
//     * })
//     */
//    private $rhPersona;

  
    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CtlRol", inversedBy="ctlRol")
     * @ORM\JoinTable(name="ctl_rol_usuario",
     *   joinColumns={
     *     @ORM\JoinColumn(name="ctl_usuario_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="ctl_rol_id", referencedColumnName="id")
     *   }
     * )
     */
   
    private $ctlRol;
    
    private $isEnabled;// = false; 
    
    
    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->ctlRol = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set username
     *
     * @param string $username
     * @return CtlUsuario
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return CtlUsuario
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set salt
     *
     * @param string $salt
     * @return CtlUsuario
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }

    /**
     * Get salt
     *
     * @return string 
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * Set estado
     *
     * @param boolean $estado
     * @return CtlUsuario
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get estado
     *
     * @return boolean 
     */
    public function getEstado()
    {
        return $this->estado;
    }

//    /**
//     * Set ctlEmpresa
//     *
//     * @param \DGAbgSistemaBundle\Entity\CtlEmpresa $ctlEmpresa
//     * @return CtlUsuario
//     */
//    public function setCtlEmpresa(\DGAbgSistemaBundle\Entity\CtlEmpresa $ctlEmpresa = null)
//    {
//        $this->ctlEmpresa = $ctlEmpresa;
//
//        return $this;
//    }
//
//    /**
//     * Get ctlEmpresa
//     *
//     * @return \DGAbgSistemaBundle\Entity\CtlEmpresa 
//     */
//    public function getCtlEmpresa()
//    {
//        return $this->ctlEmpresa;
//    }
//
//    /**
//     * Set rhPersona
//     *
//     * @param \DGAbgSistemaBundle\Entity\AbgPersona $rhPersona
//     * @return CtlUsuario
//     */
//    public function setRhPersona(\DGAbgSistemaBundle\Entity\AbgPersona $rhPersona = null)
//    {
//        $this->rhPersona = $rhPersona;
//
//        return $this;
//    }
//
//    /**
//     * Get rhPersona
//     *
//     * @return \DGAbgSistemaBundle\Entity\AbgPersona 
//     */
//    public function getRhPersona()
//    {
//        return $this->rhPersona;
//    }

    /**
     * Add ctlRol
     *
     * @param \DGAbgSistemaBundle\Entity\CtlRol $ctlRol
     * @return CtlUsuario
     */
    public function addCtlRol(\ERPAdminBundle\Entity\CtlRol $ctlRol)
    {
        $this->ctlRol[] = $ctlRol;

        return $this;
    }

    /**
     * Remove ctlRol
     *
     * @param \DGAbgSistemaBundle\Entity\CtlRol $ctlRol
     */
    public function removeCtlRol(\ERPAdminBundle\Entity\CtlRol $ctlRol)
    {
        $this->ctlRol->removeElement($ctlRol);
    }

    /**
     * Get ctlRol
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCtlRol()
    {
        return $this->ctlRol;
    }
    /**
     * Get roles
     *
     * @return Doctrine\Common\Collections\Collection
     */
    public function getRoles()
    {
        return $this->ctlRol->toArray(); //IMPORTANTE: el mecanismo de seguridad de Sf2 requiere ésto como un array
    }
    
    
    
     /**
     * Compares this user to another to determine if they are the same.
     *
     * @param UserInterface $user The user
     * @return boolean True if equal, false othwerwise.
     */
    public function equals(UserInterface $user) {
        return md5($this->getUsername()) == md5($user->getUsername());
 
    }
 
    /**
     * Erases the user credentials.
     */
    public function eraseCredentials() {
 
    }
    
    /*public function __toString() {
        return $this->username ? $this->username : '';
    }*/
    
    /**
     * @see \Serializable::serialize()
     */
    public function serialize()
    {
        return serialize(array(
            $this->id,
        ));
    }
    /**
     * @see \Serializable::unserialize()
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            ) = unserialize($serialized);
    }
    
    public function isAccountNonExpired()
    {
            return true;
    }

    public function isAccountNonLocked()
    {
            return  !$this->isEnabled;
    }

    public function isCredentialsNonExpired()
    {
            return true;
    }

    public function isEnabled()
    {
        if ((int)$this->estado == 1)
            $this->isEnabled = true;
        else
            $this->isEnabled  = false;
        return  $this->isEnabled;
    }
    
    public function __toString() {
        return $this->username ? $this->username : '';
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
