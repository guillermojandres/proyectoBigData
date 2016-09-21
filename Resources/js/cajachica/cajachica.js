 $(document).ready(function(){
     alcargar();
     
     
     
$('#fechaRCCH').Zebra_DatePicker({
     format: 'd-m-Y',
    direction: false
});
     
     
     
     
     
     $('#empleado').select2({
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


$(document).on("click","#nuevoIngresoCCH",function() {
    alDarclickEnNuevo();

});
 $(document).on("click","#cancelarNuevo",function() {
       
        alDarclickEnCancelarNuevo();
       
   });
  
  
 $(document).on("click","#cancelarInsercionNuevoRegistroCCH",function() {
       
         alDarclickEnCancelarNuevo();
       
   });




  $(document).on("click","#guardarRegistroCajaChica",function() {
      
          var num=0;
                $('.requerido').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
           
               
                if (num==0){ 
                    var personaRecibe = $("#entregadoa").val();
                     var personaEntrega= $("#personaEntrega").val();
                     var fechaRCCH = $("#fechaRCCH").val();
                     var valor= $("#valor").val();
//                     var empleado = $("#empleado").val();
                     var cantidadPor = $("#cantidadPor").val();
                     var descripcionRCCH = $("#descripcionRCCH").val();
                     
                     
                        if (isNaN(cantidadPor)!=true){
                            
                             $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {cantidadPor:cantidadPor},
                                    url: Routing.generate('validarRegistroCCH'),
                                    success: function (data)
                                    {
                                if (data.estado==true){
                                             
                                                                $.ajax({
                                                          type: 'POST',
                                                          async: false,
                                                          dataType: 'json',
                                                          data: {fechaRCCH:fechaRCCH,valor:valor,personaRecibe:personaRecibe,cantidadPor:cantidadPor,descripcionRCCH:descripcionRCCH,personaEntrega:personaEntrega},
                                                          url: Routing.generate('insertarRegistroCCH'),
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
                                                                                         var url=Routing.generate('caja_salida_index');
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
                                                        
                                                                swal({
                                                                          title: "Advertencia",
                                                                          text: "<p style='text-align: center;'>El saldo disponible dentro de caja chica es inferior a la cifra a retirar (saldo $ "+data.saldo+")<br>¿Quieres registrar el retiro y tener un saldo negativo?</p>",
                                                                          type: "warning",
                                                                          showCancelButton: true,
                                                                          cancelButtonText: "No",
                                                                          confirmButtonText: "Si",
                                                                          confirmButtonColor: "#00A59D",
                                                                          html:true,
                                                                          closeOnConfirm: true,
                                                                          closeOnCancel: false
                                                                      },
                                                                              function (isConfirm) {
                                                                                  if (isConfirm) {
                                                                                      
                                                                                      
                                                                                                  $.ajax({
                                                                                                    type: 'POST',
                                                                                                    async: false,
                                                                                                    dataType: 'json',
                                                                                                    data: {fechaRCCH: fechaRCCH, valor: valor, cantidadPor: cantidadPor, descripcionRCCH: descripcionRCCH, personaEntrega: personaEntrega},
                                                                                                    url: Routing.generate('insertarRegistroCCH'),
                                                                                                    success: function (data)
                                                                                                    {
                                                                                                        if (data.estado == true) {

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
                                                                                                                            var url = Routing.generate('caja_salida_index');
                                                                                                                            window.open(url, "_self");


                                                                                                                        } else {
                                                                                                                            var url = Routing.generate('caja_chica_index');
                                                                                                                            window.open(url, "_self");

                                                                                                                        }
                                                                                                                    });


                                                                                                        }

                                                                                                    },
                                                                                                    error: function (xhr, status)
                                                                                                    {

                                                                                                    }
                                                                                                });

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
                
                
                
             $("#eliminarRegistroCCH").hide();     
         
            }         
                
       });
  
  
    function editarRegistroCajaChica(idRegistro){
        
        alDarclickEnlaEdicion();

        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {idRegistro: idRegistro},
            url: Routing.generate('llamarRegistrosRegistroCCH'),
            success: function (data)
            {
                if (data.estado == true) {
                    console.log(data.empleadoNombre);
                    
                    
                    var formulario = '<div class="clearfix"></div>\n\
                                        <div class="form-column col-md-3" style="padding-top: 0%;">\n\
                                        <div class="form-group required" >\n\
                                            <label for="fechaRCCHE" class="control-label">Fecha</label>\n\
                                            <input type="hidden" name="idRegistro" id="idRegistro"  value="'+data.idRegistro+'">\n\
                                            </br><input type="text" name="fechaRCCHE" id="fechaRCCHE" class="requeridoE" value="'+data.fecha+'">\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="col-md-9"></div>\n\
                                    <div class="clearfix"></div>\n\
                                           <div class="form-column col-md-3">\n\
                                        <div class="form-group required">\n\
                                              <label class="control-label" for="valor">Entregado a: </label>\n\
                                              <input type="text" class="form-control requerido" id="entregadoaE"  name="entregadoaE" value="'+data.recibio+'">\n\
                                          </div>\n\
                                  </div>\n\
                                <div class="form-column col-md-3"><div class="form-group required" >\n\
                                   <div class="form-group">\n\
                                           <label class="control-label" for="valor">Valor</label>\n\
                                                   <input type="text" class="form-control requeridoE" id="valorE"  name="valorE" value="'+data.valor+'" >\n\
                                           </div>\n\
                                           </div>\n\
                                   </div>\n\
                                    <div class="form-column col-md-3"><div class="form-group required" >\n\
                                    <div class="form-group">\n\
                                    <label class="control-label" for="exampleInputAmount">Cantidad</label>\n\
                                    <div class="input-group">\n\
                                    <div class="input-group-addon">$</div>\n\
                                    <input type="text" class="form-control requeridoE" id="cantidadPorE"  name="cantidadPorE" value="'+data.cantidadPor+'">\n\
                                    <div class="input-group-addon">.00</div>\n\
                                    </div>\n\
                                    </div>\n\
                                    </div>\n\
                                     </div>\n\
                                    <div class="clearfix"></div>\n\
                                   <div class="form-column col-md-8">\n\
                                   <div class="form-group" >\n\
                                   <label for="descripcionRCCH" class="control-label" >Concepto</label>\n\
                                    <textarea name="descripcionRCCHE" id="descripcionRCCHE" class="form-control cler" maxlength="250">'+data.concepto+'</textarea>\n\
                                   </div><div class="form-group" >\n\
                                   <div class="btn-group pull-left">\n\
                                   <a class="btn btn-default  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="cancelarEdicionNuevoRegistroCCH">Cancelar</a>\n\
                                   </div><div class="btn-group pull-left">\n\
                                   <a  class="btn btn-success  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="guardarEdicionCajaChica">Guardar</a>\n\
                                   </div>\n\
                                   </div>\n\
                                         </div>\n\
                                   <div class="form-column col-md-4">\n\
                                        <div class="form-group required" ><div class="form-group">\n\
                                                <label class="control-label" for="valor">Persona que entrega</label>\n\
                                                        <input type="text" class="form-control requerido" id="personaEntrega"  name="personaEntrega" value="'+data.nombre+'">\n\
                                                            </div>\n\
                                                        </div>\n\
                                                   </div>';



                    $("#contenedorInsercionEdicionRegistroCajachica").append(formulario);
                    
                    
//                $('#empleadoE').select2({
//                ajax: {
//                    url: Routing.generate('buscarEmpleado'),
//                    dataType: 'json',
//                    delay: 250,
//                    data: function (params) {
//                        return {
//                            q: params.term,
//                            page: params.page
//                        };
//                    },
//                    processResults: function (data, params) {
//                        var select2Data = $.map(data.data, function (obj) {
//                            obj.id = obj.abogadoid;
//                            obj.text = obj.nombres;
//
//                            return obj;
//                        });
//
//                        return {
//                            results: select2Data
//                        };
//                    },
//                    cache: true
//                },
//                escapeMarkup: function (markup) { return markup; },
//                minimumInputLength: 1,
//                templateResult: formatRepo,
////                templateSelection: formatRepoSelection,
//                formatInputTooShort: function () {
//                    return "Ingrese un caracter para la busqueda";
//                }
//            });

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
    
    
    
    
      $(document).on("click","#guardarEdicionCajaChica",function() {
         var personaRecibe = $("#entregadoaE").val();
          var num=0;
                $('.requeridoE').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
           
               
                if (num==0){ 
      
                     var idRegistro = $("#idRegistro").val();
                     var fechaRCCH = $("#fechaRCCHE").val();
                     var valor= $("#valorE").val();
                      var personaRecibe = $("#entregadoaE").val();
                   //  var empleado = $("#empleadoE").val();
                     var cantidadPor = $("#cantidadPorE").val();
                     var descripcionRCCH = $("#descripcionRCCHE").val();
                     
                        if (isNaN(cantidadPor)!=true){
                            
                                                $.ajax({
                                                    
                                                          type: 'POST',
                                                          async: false,
                                                          dataType: 'json',
                                                          data: {cantidadPor:cantidadPor},
                                                          url: Routing.generate('validarRegistroCCH'),
                                                          success: function (data)
                                                          {
                                                            if (data.estado == true) {
                                                                
                                                                $.ajax({
                                                                        type: 'POST',
                                                                        async: false,
                                                                        dataType: 'json',
                                                                        data: {fechaRCCH:fechaRCCH,valor:valor,personaRecibe:personaRecibe,cantidadPor:cantidadPor,descripcionRCCH:descripcionRCCH,idRegistro:idRegistro},
                                                                        url: Routing.generate('editarRegistroCCH'),
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
                                                                                                       var url=Routing.generate('caja_salida_index');
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
                                                             
                                                                   swal({
                                                                          title: "Advertencia",
                                                                          text: "<p style='text-align: justify;'>El saldo disponible dentro de caja chica es inferior a la cifra a retirar (saldo $ "+data.saldo+")<br>¿Quieres registrar el retiro y tener un saldo negativo?</p>",
                                                                          type: "warning",
                                                                          showCancelButton: true,
                                                                          cancelButtonText: "No",
                                                                          confirmButtonText: "Si",
                                                                          confirmButtonColor: "#00A59D",
                                                                          html:true,
                                                                          closeOnConfirm: true,
                                                                          closeOnCancel: false
                                                                      },
                                                                              function (isConfirm) {
                                                                                  if (isConfirm) {
                                                                                       
                                                                                         $.ajax({
                                                                        type: 'POST',
                                                                        async: false,
                                                                        dataType: 'json',
                                                                        data: {personaRecibe:personaRecibe,fechaRCCH:fechaRCCH,valor:valor,cantidadPor:cantidadPor,descripcionRCCH:descripcionRCCH,idRegistro:idRegistro},
                                                                        url: Routing.generate('editarRegistroCCH'),
                                                                        success: function (data)
                                                                        {
                                                                             if (data.estado==true){
                                                                                   $(".saldo").text(data.saldo);

                                                                     
                                                                                                var url = Routing.generate('caja_salida_index');
                                                                                                window.open(url, "_self");

                                                                                              


                                                                                }

                                                },
                                                error: function (xhr, status)
                                                {

                                                }
                                            });


                                        } else {
                                            var url = Routing.generate('caja_chica_index');
                                            window.open(url, "_self");

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
  
  $(document).on("click","#cancelarEdicionNuevoRegistroCCH",function() {
      
      alDarclickEnCancelarEdicion();
      
      
      
  });  
    
    $(document).on("click","#cancelarEdicion",function() {
      
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
    $("#contenedorInsercionRegistroCajachica").hide();
    $("#eliminarRegistroCCH").hide();
    $("#cancelarNuevo").hide();
    $("#cancelarEdicion").hide();
    
    
}

function alDarclickEnNuevo(){

    $("#contendorTablaRegistrosCajaChica").hide();
    $("#contenedorInsercionRegistroCajachica").show();
    $("#nuevoIngresoCCH").hide();
    $("#cancelarNuevo").show();
    $("#accionesIngreso").hide();
    
    
}
function alDarclickEnCancelarNuevo(){

    $("#contendorTablaRegistrosCajaChica").show();
    $("#contenedorInsercionRegistroCajachica").hide();
    $("#nuevoIngresoCCH").show();
      $("#cancelarNuevo").hide();
      $("#accionesIngreso").show();
    
}

function alDarclickEnlaEdicion(){

    $("#contendorTablaRegistrosCajaChica").hide();
    $("#contenedorInsercionRegistroCajachica").hide();
    $("#nuevoIngresoCCH").hide();
    $("#cancelarEdicion").show();
    
}

function alDarclickEnCancelarEdicion(){

    $("#contendorTablaRegistrosCajaChica").show();
    $("#contenedorInsercionRegistroCajachica").hide();
    $("#nuevoIngresoCCH").show();
    $("#contenedorInsercionEdicionRegistroCajachica div").html('');
     $("#cancelarEdicion").hide();
    
}



