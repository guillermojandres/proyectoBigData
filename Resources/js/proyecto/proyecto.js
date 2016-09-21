 $(document).ready(function(){
     
     
     //Select2 para clientes y contactos dentro de un nuevo proyecto
     
     $("#tipoContrato").select2();
     $('#estadoProyecto').select2();
     $('#tipoProyecto').select2();
            
     
       $('#contactoDirecto').select2({
                ajax: {
                    url: Routing.generate('buscarContacto'),
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            q: params.term,
                            page: params.page
                        };
                    },
                    processResults: function (data, params) {
                        var select2Data = $.map(data.data, function (obj) {
                            obj.id = obj.abogadoid;
                            obj.text = obj.nombre;

                            return obj;
                        });

                        return {
                            results: select2Data
                        };
                    },
                    cache: true
                },
                escapeMarkup: function (markup) { return markup; },
                minimumInputLength: 1,
                templateResult: formatRepoCont,
                templateSelection: formatRepoSelectionCont,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                }
            });


       $('#idcliente').select2({
                ajax: {
                    url: Routing.generate('buscarCliente'),
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            q: params.term,
                            page: params.page
                        };
                    },
                    processResults: function (data, params) {
                        var select2Data = $.map(data.data, function (obj) {
                            obj.id = obj.clienteid;
                            obj.text = obj.nombre;

                            return obj;
                        });

                        return {
                            results: select2Data
                        };
                    },
                    cache: true
                },
                escapeMarkup: function (markup) { return markup; },
                minimumInputLength: 1,
                templateResult: formatRepoC,
                templateSelection: formatRepoSelectionC,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                },
                
                language: {
             noResults: function() {
                 return "<a href='#' id='addNewCliente'>Agregar Nuevo Cliente</a>";
                    }
                }
                    
                
            });
            
            $('#encargadoProyecto').select2({
                ajax: {
                    url: Routing.generate('buscarEncargadoProyecto'),
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            q: params.term,
                            page: params.page
                        };
                    },
                    processResults: function (data, params) {
                        var select2Data = $.map(data.data, function (obj) {
                            obj.id = obj.estadoId;
                            obj.text = obj.nombre;

                            return obj;
                        });

                        return {
                            results: select2Data
                        };
                    },
                    cache: true
                },
                escapeMarkup: function (markup) { return markup; },
                minimumInputLength: 1,
                templateResult: formatRepoENP,
                templateSelection: formatRepoSelectionENP,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                }
            });
    
 //Click dentro de agregar los nuevos dentro de los select2
 
  $(document).on("click","#addNewContacto",function() {
      
        var url = Routing.generate('nuevocontacto');
        window.open(url, "_self");

      
      
      
  });

  $(document).on("click","#addNewCliente",function() {
      
      var url = Routing.generate('nuevocliente');
        window.open(url, "_self");

      
      
      
  });
 
 
            
//Inicializacion de fechas      

$('#fechaInicio').Zebra_DatePicker({
     format: 'd-m-Y',
     direction: -1,
               pair: $('#fechaFin')
});            
            
 $('#fechaFin').Zebra_DatePicker({
      format: 'd-m-Y',
      direction: true
});


//Terminacion de inicializacion de los select2 que sirven para el ingreso de datos generales de una empresa
//Insercion de datos generales de un proyecto
       $(document).on("click","#guardarDatosGeneralesProyecto",function() {
           
           
        var num = 0;

        $('.requerido').each(function () {

            var x = $(this).val();

            if (x == "" || x == null) {
                num = num + 1;
            }

        });

        if (num == 0) {

            var dataImagen =  $("#imagenMapa").attr("src");
            if (dataImagen=="")
            {
                //Solicitar permiso de guardar porque no se ha elegido una imagen del mapa de la ubicacion del proyecto
                                     swal({
                                                    title: "Advertencia",
                                                    text: "No has capturado la imagen del mapa, ¿Quieres guardar los registros del proyecto sin una imagen del  mapa de su ubicación?",
                                                    type: "warning",
                                                    showCancelButton: true,
                                                    cancelButtonText: "No",
                                                    confirmButtonText: "Si",
                                                    confirmButtonColor: "#00A59D",
                                                    closeOnConfirm: true,
                                                    closeOnCancel: true
                                                },
                                                        function (isConfirm) {
                                                            if (isConfirm) {
                                                                
                                                               guardarDatosGenerales();
                                                                
                                                                
                                                            } else {
                                                                

                                                            }
                                                        });      

            }else{
                   guardarDatosGenerales();
            }
            
              }else{
                 swal("Error!", "No debes dejar datos requeridos vacios", "error");
 
            }
            
        
       });
       
       
        function guardarDatosGenerales(){
            
            
            var idPrincipal = $("#idProyecto").val();
             if (idPrincipal==0 ){

                var nombreProyecto,idcliente, contactoDirecto,direccionProyecto, estadoProyecto, tipoProyecto, fechaInicio,
                        fechaFin, encargadoProyecto, observacionesProyecto,longitud,latitud,tipoContrato,dataImagen;
                
                dataImagen =  $("#imagenMapa").attr("src");
                tipoContrato=$("#tipoContrato").val();
                longitud= $("#longitud").val();
                latitud= $("#latitude").val();
                nombreProyecto = $("#nombreProyecto").val();
                idcliente  = $("#idcliente").val();
                contactoDirecto  = $("#contactoDirecto").val();
                direccionProyecto  = $("#direccionProyecto").val();
                estadoProyecto  = $("#estadoProyecto").val();
                tipoProyecto = $("#tipoProyecto").val();
                fechaInicio = $("#fechaInicio").val();
                fechaFin = $("#fechaFin").val();
                encargadoProyecto = $("#encargadoProyecto").val();
                observacionesProyecto = $("#observacionesProyecto").val();
                
                
                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {nombreProyecto:nombreProyecto,i:0},
                                    url: Routing.generate('validarNombreProyecto'),
                                    success: function (data)
                                    {
                                         if (data.estado==true){
                                             
                                                $.ajax({
                                                 type: 'POST',
                                                 async: false,
                                                 dataType: 'json',
                                                 data: {nombreProyecto: nombreProyecto, idcliente: idcliente, contactoDirecto: contactoDirecto, direccionProyecto: direccionProyecto, estadoProyecto: estadoProyecto,
                                                 tipoProyecto: tipoProyecto, fechaInicio: fechaInicio, fechaFin: fechaFin, encargadoProyecto: encargadoProyecto, observacionesProyecto: observacionesProyecto,
                                                 longitud:longitud,latitud:latitud,tipoContrato:tipoContrato,dataImagen:dataImagen},
                                                 url: Routing.generate('insertarDatosGeneralesProyecto'),
                                                 success: function (data)
                                                 {
                                                     if (data.estado == true) {
                                                         
                                                        $("#idProyecto").val(data.idProyecto);
                                                         swal("Exito!", "Datos ingresados con exito", "success");
                                                         
                                                     }


                                                 },
                                                 error: function (xhr, status)
                                                 {

                                                 }
                                             });
          
                                         }else{
                                             
                                             swal("Error!", "Nombre de proyecto ya existe, intenta con otro", "error");
                                             $("#nombreProyecto").val("");
                                             $("#nombreProyecto").hover();
                                             
                                         }
                                         

                                    },
                                    error: function (xhr, status)
                                    {
                      
                    }
            });

          

        }else{
            //Edicion de los datos generales de la empresa
            
             var nombreProyecto,idcliente, contactoDirecto,direccionProyecto, estadoProyecto, tipoProyecto, fechaInicio,
                        fechaFin, encargadoProyecto, observacionesProyecto,longitud,latitud,tipoContrato,dataImagen,idProyecto;
                
                dataImagen =  $("#imagenMapa").attr("src");
                tipoContrato=$("#tipoContrato").val();
                longitud= $("#longitud").val();
                latitud= $("#latitude").val();
                nombreProyecto = $("#nombreProyecto").val();
                idcliente  = $("#idcliente").val();
                contactoDirecto  = $("#contactoDirecto").val();
                direccionProyecto  = $("#direccionProyecto").val();
                estadoProyecto  = $("#estadoProyecto").val();
                tipoProyecto = $("#tipoProyecto").val();
                fechaInicio = $("#fechaInicio").val();
                fechaFin = $("#fechaFin").val();
                encargadoProyecto = $("#encargadoProyecto").val();
                observacionesProyecto = $("#observacionesProyecto").val();
                
                
                
                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {nombreProyecto:nombreProyecto,i:1},
                                    url: Routing.generate('validarNombreProyecto'),
                                    success: function (data)
                                    {
                                         if (data.estado==true){
                                             
                                                $.ajax({
                                                 type: 'POST',
                                                 async: false,
                                                 dataType: 'json',
                                                 data: {nombreProyecto: nombreProyecto, idcliente: idcliente, contactoDirecto: contactoDirecto, direccionProyecto: direccionProyecto, estadoProyecto: estadoProyecto,
                                                 tipoProyecto: tipoProyecto, fechaInicio: fechaInicio, fechaFin: fechaFin, encargadoProyecto: encargadoProyecto, observacionesProyecto: observacionesProyecto,
                                                 longitud:longitud,latitud:latitud,tipoContrato:tipoContrato,dataImagen:dataImagen,idProyecto:idPrincipal},
                                                 url: Routing.generate('modificarDatosGeneralesProyecto'),
                                                 success: function (data)
                                                 {
                                                     if (data.estado == true) {
                                                         
                                                        $("#idProyecto").val(data.idProyecto);
                                                         swal("Exito!", "Datos modificados  con exito", "success");
                                                         
                                                     }


                                                 },
                                                 error: function (xhr, status)
                                                 {

                                                 }
                                             });
          
                                         }else{
                                             
                                             swal("Error!", "Nombre de proyecto ya existe, intenta con otro", "error");
                                          
                                             $("#nombreProyecto").hover();
                                             
                                         }
                                         

                                    },
                                    error: function (xhr, status)
                                    {
                      
                                }
                         });
                    }

        }
        
        
       
     
     
   //Al dar click en nuevo proyecto  
      $(document).on("click","#nuevoProyecto",function() {
        var z= $("#tipoProyectoSeleccionado").val();  
        var url=Routing.generate('nuevoProyecto',{parametro:z});
        window.open(url, "_self");

   });

//Permisos en las tabs

      $(document).on("click","#datosMaquinaria",function() {
          
          var idProyecto= $("#idProyecto").val();
          if (idProyecto==0){
             
              $("#datosGeneralesProyecto").click();
                 
                    swal("Alerta!", "Primero tienes que igresar los datos generales del proyecto.", "warning");
          }
          
       

   });



      $(document).on("click","#datosRecursosHumanos",function() {
          
          var idProyecto= $("#idProyecto").val();
          if (idProyecto==0){
             
              $("#datosGeneralesProyecto").click();
                 
                     swal("Alerta!", "Primero tienes que igresar los datos generales del proyecto.", "warning");
                
          }
          
       

   });
     
   
    $(document).on("click","#datosReportesDiarios",function() {
          
          var idProyecto= $("#idProyecto").val();
          if (idProyecto==0){
             
              $("#datosGeneralesProyecto").click();
                 
                      swal("Alerta!", "Primero tienes que igresar los datos generales del proyecto.", "warning");
          }

   });
     
     
//  Click en cancelar insercion datos generales del proyecto
//Fin document ready
           
 });


//Contacto
function formatRepoCont (data) {
            if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>" + data.nombre+ "</div>" +
                             "</div></div>";
            } else {
                var markup = "Seleccione un contacto";
            }

            return markup;
        }

        function formatRepoSelectionCont (data) {
            if(data.nombre){
                return  data.nombre;
            } else {
                return "Seleccione un contacto";
            }   
        }

//Cliente
function formatRepoC (data) {
            if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>" + data.nombre+ "</div>" +
                             "</div></div>";
            } else {
                var markup = "Seleccione un cliente";
            }

            return markup;
        }

        function formatRepoSelectionC (data) {
            if(data.nombre){
                return  data.nombre;
            } else {
                return "Seleccione un cliente";
            }   
        }


//Encargado de proyecto
function formatRepoENP (data) {
            if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>" + data.nombre+ "</div>" +
                             "</div></div>";
            } else {
                var markup = "Encargado proyecto";
            }

            return markup;
        }

        function formatRepoSelectionENP (data) {
            if(data.nombre){
                return  data.nombre;
            } else {
                return "Encargado proyecto";
            }   
        }