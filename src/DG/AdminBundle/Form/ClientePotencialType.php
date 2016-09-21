<?php

namespace DG\AdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ClientePotencialType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nombre')
            ->add('telefono')
            ->add('nrc')
            ->add('nit')
            ->add('correoelectronico')
            ->add('movil')
            ->add('paginaWeb')
            ->add('referidoPor')
            ->add('descripcion')
            ->add('direccion')
            ->add('contacto')
            ->add('estadoClientePotencial')
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'DG\AdminBundle\Entity\ClientePotencial'
        ));
    }
}
