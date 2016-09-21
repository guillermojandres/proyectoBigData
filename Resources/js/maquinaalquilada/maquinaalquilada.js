 $(document).ready(function(){
 var idDetalle =0;
  var idDetalleExpeMantenimiento =0;
  var xPermisoTablaDatosMantenimiento =0;
  var xPermisoTablaDatosExpedientesMant=0;
  

//Inicializacion de fechas  en el caso de que se alquile una maquina

$('#fechaInicioA').Zebra_DatePicker({
     format: 'd-m-Y',
     direction: true,
               pair: $('#fechaFinA')
});            
            
 $('#fechaFinA').Zebra_DatePicker({
      format: 'd-m-Y',
      direction: true
});            
           
     
     $("#tiempoCobro").select2();
     
$('#anhoMaquina').Zebra_DatePicker({
    format: 'Y',
     direction:false
});


$('#fechaDE').Zebra_DatePicker({
     format: 'M d, Y',
     direction:false
});

     
    $("#colorMaquina").select2({
         placeholder: 'Seleccione un color',
        
    });
    

 //Select2 del tipo de empresa    
     $('#tipoEquipo').select2({
                ajax: {
                    url: Routing.generate('buscarTipoEquipo'),
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
                templateResult: formatRepo,
//                templateSelection: formatRepoSelection,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                }
            });
            
 
 //Select del proveedor
  $('#proveedor').select2({
                ajax: {
                    url: Routing.generate('buscarProveedor'),
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
                templateResult: formatRepo,
                templateSelection: formatRepoSelection,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                }
            });
 

    $(document).on("click","#guargarDatosGeneralesMaquina",function() {
       var idPrincipal = $("#idMaquina").val();
    
        

                            if (idPrincipal==0){

                        //Insercion de los datos generales de la empresa
                            var numeroSerie, numeroEquipo, anho, alias, modelo, tipoEquipo,
                                     placa, color,   marca, descripcion,fechaInicioA,
                                    fechaFinA, proveedor, costoA, tiempoCobro;
                                
                                tiempoCobro = $("#tiempoCobro").val();
                                proveedor=$("#proveedor").val();    
                                fechaInicioA = $("#fechaInicioA").val();
                                fechaFinA = $("#fechaFinA").val();
                                costoA= $("#costoA").val();
                                
                                
                                numeroSerie=$("#numeroSerie").val();
                                numeroEquipo=$("#numeroEquipo").val();
                                anho=$("#anhoMaquina").val();
                                alias=$("#alias").val();
                                modelo=$("#modelo").val();
                                tipoEquipo=$("#tipoEquipo").val();
                                color=$("#color").val();
                                marca=$("#marca").val();
                                descripcion=$("#descripcionMaquina").val();

                                           
                                                                $.ajax({
                                                                    type: 'POST',
                                                                    async: false,
                                                                    dataType: 'json',
                                                                    data: { tiempoCobro:tiempoCobro,proveedor:proveedor, fechaInicioA:fechaInicioA,fechaFinA:fechaFinA,costoA:costoA
                                                                                ,numeroSerie:numeroSerie,numeroEquipo:numeroEquipo,anho:anho,alias:alias,modelo:modelo,tipoEquipo:tipoEquipo,color:color,
                                                                                 marca:marca, descripcion:descripcion},
                                                                    url: Routing.generate('insertarMaquinaAlquilada'),
                                                                    success: function (data)
                                                                    {
                                                                       
                                                                        if (data.estado == true) {
                                                                            
                                                                            swal("Exito!", "Datos de maquinaria alquilada ingresados con exito", "success");
                                                                            $("#idModalFormAlqularMaquina").modal('toggle');

                                                                       }

                                                                    },
                                                                    error: function (xhr, status)
                                                                    {

                                                                    }
                                                                });


                                                        

                            }

                });


        //Pestaña de Imagenes de las maquinas

        $(document).on("click","#imagenesMaquinas",function() {
            var valor = $("#idMaquina").val();

            if (valor==0){
                 
                 $("#datosGenerales").click();
                 
                    
                 swal("Alerta!", "Primero tienes que ingresar los datos generales de la maquina.", "warning");
                
            }
 
     });
  
  
  //Eliminacion de los datos del mantenimiento
   $(document).on("click","#eliminarDatoMantenimiento",function() {
       
            $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {idDatoMantenimiento: idDetalle},
            url: Routing.generate('eliminarDatosMantenimientoEdicion'),
            success: function (data)
            {
                if (data.estado == true) {
                                        $("#eliminarDatoMantenimiento").hide();
                                        var table = $('#listaDatosMantenimientos').DataTable();
                                        
                                                table.ajax.reload(function (json) {

                                                });
                            
                  swal({
                        title: "Registro eliminado con exito",
                        text: "¿Quieres seguir  gestionando datos de mantenimiento?",
                        type: "success",
                        showCancelButton: true,
                        cancelButtonText: "Despues",
                        confirmButtonText: "Seguir",
                        confirmButtonColor: "#00A59D",
                        closeOnConfirm: true,
                        closeOnCancel: false
                    },
                            function (isConfirm) {
                                if (isConfirm) {
                                
         
                                } else {
                                    var url = Routing.generate('dashboard_index');
                                    window.open(url, "_self");

                                }
                            });
                    


                }


            },
            error: function (xhr, status)
            {



            }
        });
                        
   });
  
  
 
   
    //Envio de imagenes de la maquinaria
    
    
 
 var idMaquina=$("#idMaquina").val();
 var correlativoDiv=0; 
    var url = Routing.generate('insertarImagenesMaquinaria', {idMaquina: idMaquina});
    $("#zonaDeImagenes").dropzone({
        url: url,
         success: function(file, response){
          var obj = jQuery.parseJSON(response);
          correlativoDiv=correlativoDiv+1;
            
            var formulario='<div class="col-md-4">\n\
                                                <img src="" style="max-height: 300px;max-width: 300px;margin-top:10px;" id="imgPrueba-'+correlativoDiv+'">\n\
                                            </div>'
              $("#mostrarImagenes").append(formulario);
             $("#imgPrueba-"+correlativoDiv).attr("src","/erpconstructora/web/Photos/maquinaria/"+obj.nombreImagen);
           
               

    }

    });


    $(document).on("click","#cancelarDatosGeneralesMaquinaAlquilada",function() {
        
         $("#idModalFormAlqularMaquina").modal('toggle');
        
    });
    
    
    //visualizar una imagen en grande
    $(document).on("click",".image",function() {
        
      var link=  $(this).attr("src");
         window.open(link, "_blank");
        
        
    });
    



   //Validacion de que vayan solamente numeros dentro del costo
    $(document).on("input","#costoA",function() {
        
          var x =$(this).val();
       if (isNaN(x)!=true){
                        
                      
          }else{
              $(this).val(0);
               swal("Error!", "El campo costo no pueden ser letras o un campo vacio", "error");
                 
          }
        
    });
    
    
    $(document).on("change","#costoA",function() {

          var x =$(this).val();
       if (x==""){
           
                 $(this).val(0);
                  swal("Error!", "El campo costo no pueden ser letras o un campo vacio", "error");       
                      
          }

    });
   
   
  //Fin del document Ready
 });
 
 function formatRepo (data) {
            if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>" +data.nombre+"</div>" +
                             "</div></div>";
            }

            return markup;
        }

        function formatRepoSelection (data) {
            if(data.nombre){
                return  data.nombre;
            } else {
                return "Seleccione un tipo de equipo";
            }   
        }
        
    
    
    function limparformulario(){
        
        $('.requeridoMa').each(function () {

            $(this).val("");

        });
        
        
        
    }
    
  function formatRepoP (data) {
            if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>" + data.nombre+ "</div>" +
                             "</div></div>";
            }

            return markup;
        }

        function formatRepoSelectionP (data) {
            if(data.nombre){
                return  data.nombre;
            } else {
                return "Seleccione un tipo de equipo";
            }   
        }