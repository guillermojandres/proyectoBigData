 $(document).ready(function(){
     alcargar();
     
     
     
$('#fechaRCCHIngresos').Zebra_DatePicker({
     format: 'd-m-Y',
    direction: false
});
     
     
     
     
     
     $('#empleadoIngresos').select2({
                ajax: {
                    url: Routing.generate('buscarEmpleado'),
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
                            obj.text = obj.nombres;

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


$(document).on("click","#nuevoIngresoCCHIngresos",function() {
    alDarclickEnNuevo();

});
 $(document).on("click","#cancelarNuevoIngresos",function() {
       
        alDarclickEnCancelarNuevo();
       
   });
  
  
 $(document).on("click","#cancelarInsercionNuevoRegistroCCHIngresos",function() {
       
         alDarclickEnCancelarNuevo();
       
   });




  $(document).on("click","#guardarRegistroCajaChicaIngresos",function() {
      
          var num=0;
                $('.requerido').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
           
               
                if (num==0){ 
      
                     var personaEntrega= $("#personaEntregaIngresos").val();
                     var fechaRCCH = $("#fechaRCCHIngresos").val();
                     var valor= $("#valorIngresos").val();
                     var personaRecibeIngresos = $("#personaRecibeIngresos").val();
                     var cantidadPor = $("#cantidadPorIngresos").val();
                     var descripcionRCCH = $("#descripcionRCCHIngresos").val();
                     
                     
                        if (isNaN(cantidadPor)!=true){
                              $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {fechaRCCH:fechaRCCH,valor:valor,personaRecibeIngresos:personaRecibeIngresos,cantidadPor:cantidadPor,descripcionRCCH:descripcionRCCH,personaEntrega:personaEntrega},
                                    url: Routing.generate('insertarRegistroCCHIngresos'),
                                    success: function (data)
                                    {
                                         if (data.estado==true){
                                             
                                             $(".saldo").text(data.saldo);
                                             
                                          
                                          swal({
                                                    title: "Datos  ingresados con exito",
                                                    text: "¿Quieres seguir ingresando mas registros dentro de caja chica?",
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
                                                                   var url=Routing.generate('caja_ingresos_index');
                                                                window.open(url,"_self"); 
                                                                  
                                      
                                                            } else {
                                                                    var url=Routing.generate('caja_chica_index');
                                                                window.open(url,"_self"); 

                                                            }
                                                        });
                                            
                                             
                                         }

                                    },
                                    error: function (xhr, status)
                                    {
                      
                    }
            });

                        }else{
                            
                            swal("Error!", "El monto de cantidad no pueden ser letras", "error");
                        }
                        
                        
                }else{
                    
                      swal("Error!", "No debe dejar datos vacios a la hora de guardar", "error");
                }
      


  });
  
  
  $(document).on("dblclick","tbody>tr",function() {
           
            var identificador = $(this).attr("role");
            if(identificador=="row"){
              var idRegistro =  $(this).children().html();
                editarRegistroCajaChica(idRegistro);
                
                
                
             $("#eliminarRegistroCCHIngresos").hide();     
         
            }         
                
       });
  
  
    function editarRegistroCajaChica(idRegistro){
        
        alDarclickEnlaEdicion();

        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {idRegistro: idRegistro},
            url: Routing.generate('llamarRegistrosRegistroCCHIngresos'),
            success: function (data)
            {
                if (data.estado == true) {
                    console.log(data.empleadoNombre);
                    
                    
                    var formulario = '<div class="clearfix"></div>\n\
                                        <div class="form-column col-md-3" style="padding-top: 0%;">\n\
                                        <div class="form-group required" >\n\
                                            <label for="fechaRCCHE" class="control-label">Fecha</label>\n\
                                            <input type="hidden" name="idRegistro" id="idRegistro"  value="'+data.idRegistro+'">\n\
                                            </br><input type="text" name="fechaRCCHE" id="fechaRCCHEIngresos" class="requeridoE" value="'+data.fecha+'">\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="col-md-9"></div>\n\
                                    <div class="clearfix"></div>\n\
                                <div class="form-column col-md-4"><div class="form-group required" >\n\
                                   <div class="form-group">\n\
                                           <label class="control-label" for="valor">Valor</label>\n\
                                                   <input type="text" class="form-control requeridoE" id="valorEIngresos"  name="valorEIngresos" value="'+data.valor+'" >\n\
                                           </div>\n\
                                           </div>\n\
                                   </div>\n\
                                    <div class="form-column col-md-4"><div class="form-group required" >\n\
                                        <div class="form-group">\n\
                                    <label class="control-label" for="exampleInputAmount">Cantidad</label>\n\
                                    <div class="input-group">\n\
                                    <div class="input-group-addon">$</div>\n\
                                    <input type="text" class="form-control requeridoE" id="cantidadPorEIngresos"  name="cantidadPorEIngresos" value="'+data.cantidadPor+'">\n\
                                    <div class="input-group-addon">.00</div>\n\
                                                </div>\n\
                                             </div>\n\
                                            </div>\n\
                                     </div>\n\
                                     <div class="col-md-4"></div>\n\
                                    <div class="clearfix"></div>\n\
                                     <div class="form-column col-md-4"><div class="form-group required" >\n\
                                        <div class="form-group"><label class="control-label" for="valor">Persona que entrega</label>\n\
                                    <input type="text" class="form-control requerido" id="personaEntreEgaIngresos"  name="personaEntregaEIngresos" value="'+data.nombre+'" >\n\
                                    </div>\n\
                                    </div>\n\
                                    </div>\n\
                                    <div class="form-column col-md-4"><div class="form-group required" ><div class="form-group"><label class="control-label" for="valor">Persona que Recibe</label>\n\
                                    <input type="text" class="form-control requerido" id="personaRecibeEIngresos"  name="personaRecibeIngresos" value="'+data.pesonaQueRecibe+'">\n\
                                     </div>\n\
                                    </div>\n\
                                    </div>\n\
                                    <div class="form-column col-md-8">\n\
                                   <div class="form-group" >\n\
                                   <label for="descripcionRCCH" class="control-label" >Concepto</label>\n\
                                    <textarea name="descripcionRCCHE" id="descripcionRCCHEIngresos" class="form-control cler" maxlength="250">'+data.concepto+'</textarea>\n\
                                   </div><div class="form-group" >\n\
                                   <div class="btn-group pull-left">\n\
                                   <a class="btn btn-default  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="cancelarEdicionNuevoRegistroCCHIngresos">Cancelar</a>\n\
                                   </div><div class="btn-group pull-left">\n\
                                   <a  class="btn btn-success  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="guardarEdicionCajaChicaIngresos">Guardar</a>\n\
                                   </div>\n\
                                   </div>\n\
                                         </div>';


                    $("#contenedorInsercionEdicionRegistroCajachicaIngresos").append(formulario);
                    
                    
                $('#empleadoE').select2({
                ajax: {
                    url: Routing.generate('buscarEmpleado'),
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
                            obj.text = obj.nombres;

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

                    $('#fechaRCCHE').Zebra_DatePicker({
                        format: 'd-m-Y',
                        direction: false
                    });
     


                }

            },
            error: function (xhr, status)
            {

            }
        });

    }
    
    
    
    
      $(document).on("click","#guardarEdicionCajaChicaIngresos",function() {
      
          var num=0;
                $('.requeridoE').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
           
               
                if (num==0){ 
      
                     var idRegistro = $("#idRegistro").val();
                     var fechaRCCH = $("#fechaRCCHEIngresos").val();
                     var valor= $("#valorEIngresos").val();
                     var personaEntreEgaIngresos = $("#personaEntreEgaIngresos").val();
                     var cantidadPor = $("#cantidadPorEIngresos").val();
                     var descripcionRCCH = $("#descripcionRCCHEIngresos").val();
                     var personaRecibeEIngresos= $("#personaRecibeEIngresos").val();
                     
                        if (isNaN(cantidadPor)!=true){
                              $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {fechaRCCH:fechaRCCH,valor:valor,personaEntreEgaIngresos:personaEntreEgaIngresos,cantidadPor:cantidadPor,descripcionRCCH:descripcionRCCH,idRegistro:idRegistro,
                                    personaRecibeEIngresos:personaRecibeEIngresos},
                                    url: Routing.generate('editarRegistroCCHEIngresos'),
                                    success: function (data)
                                    {
                                         if (data.estado==true){
                                              $(".saldo").text(data.saldo);
                                          
                                          swal({
                                                    title: "Datos  editados  con exito",
                                                    text: "¿Quieres seguir modificando mas registros dentro de caja chica?",
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
                                                                   var url=Routing.generate('caja_ingresos_index');
                                                                window.open(url,"_self"); 
                                                                  
                                      
                                                            } else {
                                                                    var url=Routing.generate('caja_chica_index');
                                                                window.open(url,"_self"); 

                                                            }
                                                        });
                                            
                                             
                                         }

                                    },
                                    error: function (xhr, status)
                                    {
                      
                    }
            });

                        }else{
                            
                            swal("Error!", "El monto de cantidad no pueden ser letras", "error");
                        }
                        
                        
                }else{
                    
                      swal("Error!", "No debe dejar datos vacios a la hora de guardar", "error");
                }
      


  });
  
  $(document).on("click","#cancelarEdicionNuevoRegistroCCHIngresos",function() {
      
      alDarclickEnCancelarEdicion();
      
      
      
  });  
    
    $(document).on("click","#cancelarEdicionIngresos",function() {
      
      alDarclickEnCancelarEdicion();
      
      
      
  });  
    


 });
 
     


 function formatRepo (data) {
            if(data.nombres){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>" + data.nombres+ "</div>" +
                             "</div></div>";
            } else {
                var markup = "Seleccione un empleado";
            }

            return markup;
        }

        function formatRepoSelection (data) {
            if(data.nombre){
                return  data.nombres;
            } else {
                return "Seleccione un empleado";
            }   
        }


function alcargar(){
    $("#contenedorInsercionRegistroCajachicaIngresos").hide();
    $("#eliminarRegistroCCHIngresos").hide();
    $("#cancelarNuevoIngresos").hide();
    $("#cancelarEdicionIngresos").hide();
    
    
}

function alDarclickEnNuevo(){

    $("#contendorTablaRegistrosCajaChicaIngresos").hide();
    $("#contenedorInsercionRegistroCajachicaIngresos").show();
    $("#nuevoIngresoCCHIngresos").hide();
    $("#cancelarNuevoIngresos").show();
    $("#accionesIngresoIngresos").hide();
    
    
}
function alDarclickEnCancelarNuevo(){

    $("#contendorTablaRegistrosCajaChicaIngresos").show();
    $("#contenedorInsercionRegistroCajachicaIngresos").hide();
    $("#nuevoIngresoCCHIngresos").show();
      $("#cancelarNuevoIngresos").hide();
      $("#accionesIngresoIngresos").show();
    
}

function alDarclickEnlaEdicion(){

    $("#contendorTablaRegistrosCajaChicaIngresos").hide();
    $("#contenedorInsercionRegistroCajachicaIngresos").hide();
    $("#nuevoIngresoCCHIngresos").hide();
    $("#cancelarEdicionIngresos").show();
    
}

function alDarclickEnCancelarEdicion(){

    $("#contendorTablaRegistrosCajaChicaIngresos").show();
    $("#contenedorInsercionRegistroCajachicaIngresos").hide();
    $("#nuevoIngresoCCHIngresos").show();
    $("#contenedorInsercionEdicionRegistroCajachicaIngresos div").html('');
     $("#cancelarEdicionIngresos").hide();
    
}




