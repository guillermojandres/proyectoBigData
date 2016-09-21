$(document).ready(function(){
            
  var permisoCorreo;
  var valor = $("#correoCp").val();

    if (valor!=" "){
        permisoCorreo=true;
        
    }else{
        permisoCorreo=false;
    }
     
  $(document).on("input",".correo",function() {

       var email = $(this).val();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        if (email==""){
         
                 $(".msg").hide();
                   $(".error").hide();      
                   
     }else if (re.test(email)) {
            $('.msg').hide();
            $('.success').show();
            permisoCorreo=true;
        } else {
            $('.msg').hide();
            $('.error').show();
            permisoCorreo=false;
        }
       
     
  });             
            
            
         $('.telefono').mask('0000-0000', {placeholder: "0000-0000"});
         $('#nitCP').mask('0000-000000-000-0', {placeholder: "0000-000000-000-0"});
         $('#nrcCP').mask('000000-0', {placeholder: "000000-0"});
     
     
     
         $(document).on("click","#nuevoCp",function() {
             
   
             
             
             var nombre, direccion,telefono,telefonoM,nrc,nit,correoElectronico,paginaWeb,descripcion,referidoPor;
               nombre=$("#nombreCp").val();
        
               direccion=$("#direccionCp").val();
               telefono=$("#telefonoCp").val();
               telefonoM=$("#telefonoMCp").val();
               nrc=$("#nrcCP").val();
               nit=$("#nitCP").val();
               correoElectronico=$("#correoCp").val();
               paginaWeb=$("#paginaWebCp").val();
               descripcion=$("#descripcionCp").val();
               referidoPor=$("#referidoPor").val();
               
               
                  var num=0;
                  
                  
                 $('.requerido').each( function (){
                       
                       var x=$(this).val();
            
                       if(x==""){
                           num=num+1;
                       }

                       });
           
               
                       if (num==0){
                           
                          if (correoElectronico=="" || permisoCorreo==true)
                      {    
               
                      $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {nombre:nombre,direccion:direccion,telefono:telefono,telefonoM:telefonoM,nrc:nrc,
                                     nit:nit,correoElectronico:correoElectronico,paginaWeb:paginaWeb,descripcion:descripcion,referidoPor:referidoPor},
                                    url: Routing.generate('insertarCp'),
                                    success: function (data)
                                    {
                                         if (data.estado==true){
                                         
                                          swal({
                                            title: "Exito!",
                                            text: "Datos guardados exitosamente",
                                            timer: 1500,
                                            type: 'success',
                                            showConfirmButton: false
                                          });
                                          
                                            setTimeout( function(){ 
                                              var url=Routing.generate('admin_clientepotencial_index');
                                        window.open(url,"_self"); 
                                         }  , 1000 );

                                         }
                                         else{
                                             
                                                Lobibox.notify("error", {
                                          size: 'mini',
                                          msg: 'Error al insertar los datos, espere un momento'
                                      });
                                            location.reload();
                                            
                                             
                                         }
                                        
                                             
                    
                                         
                                          
                                    },
                                    error: function (xhr, status)
                                    {
                      
                    }
            });
        }else{
             swal("Error!", "Direccion de correo electonico no valido", "error");
            
        }
                 
                 } else {
                     
                      swal("Error!", "No debes dejar campos ruqueridos vacios", "error");

        }

 });
     
 $(document).on("click","#editarCp",function() {
      var idClienteP,nombre, direccion,telefono,telefonoM,nrc,nit,correoElectronico,paginaWeb,descripcion,referidoPor;
              
               idClienteP=$("#idClienteP").val();
               nombre=$("#nombreCp").val();
               direccion=$("#direccionCp").val();
               telefono=$("#telefonoCp").val();
               telefonoM=$("#telefonoMCp").val();
               nrc=$("#nrcCP").val();
               nit=$("#nitCP").val();
               correoElectronico=$("#correoCp").val();
               paginaWeb=$("#paginaWebCp").val();
               descripcion=$("#descripcionCp").val();
               referidoPor=$("#referidoPor").val();
               
               
                 var num=0;       
               
     $('.requeridoE').each( function (){
                       
                       var x=$(this).val();
            
                       if(x==""){
                           num=num+1;
                       }

                       });
           
               
                       if (num==0){
                           
                           if (correoElectronico=="" || permisoCorreo==true)
                      {           
        
        
          $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {idClienteP:idClienteP,nombre:nombre,direccion:direccion,telefono:telefono,telefonoM:telefonoM,nrc:nrc,
                                     nit:nit,correoElectronico:correoElectronico,paginaWeb:paginaWeb,descripcion:descripcion,referidoPor:referidoPor},
                                    url: Routing.generate('editarCp'),
                                    success: function (data)
                                    {
                                         if (data.estado==true){
                                             
                                            swal({
                                            title: "Exito!",
                                            text: "Datos modificados exitosamente",
                                            timer: 1500,
                                            type: 'success',
                                            showConfirmButton: false
                                          });
                                          
                                            setTimeout( function(){ 
                                             var url=Routing.generate('admin_clientepotencial_index');
                                            window.open(url,"_self"); 
                                         }  , 1000 );  
                                             
                                             
                                         
                                        
                                                         
                                            
                                             
                                         }
                                         else{
                                             
                                                Lobibox.notify("error", {
                                          size: 'mini',
                                          msg: 'Error al insertar los datos, espere un momento'
                                      });
                                            location.reload();
                                            
                                             
                                         }
                                        
                                             
                    
                                         
                                          
                                    },
                                    error: function (xhr, status)
                                    {
                      
                    }
            });
            
         }else{
             
                swal("Error!", "Direccion de correo electonico no valido", "error");
         }
            
              }
                else {
            swal("Error!", "No debes dejar campos que son requeridos, vacios.", "error");

        }
        
         
	
  });
  $(document).on("click","#cancelarEdicionCp",function() {
      
       var url=Routing.generate('admin_clientepotencial_index');
                                            window.open(url,"_self"); 
      
  });    
     
   $(document).on("click","#cancelarNuevoCp",function() {
      
       var url=Routing.generate('admin_clientepotencial_index');
                                            window.open(url,"_self"); 
      
  });    
  
  


      
    
 });


