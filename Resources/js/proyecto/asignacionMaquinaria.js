 $(document).ready(function(){
     alcargar();
     
 
     
     //Click dentro del boton de nuevo
  $(document).on("click","#nuevaAsignacionMaquinaria",function() {
      
                clickNuevaAsignacion();
                $("#newMaquinaProyecto").click();

    });
   $(document).on("click","#addNewRegistroMaquinariaProyecto",function() {
      
               $(".contenidoDatosNuevosMaquinariaProyecto").show();
 

    });
    
    //Click dentro de agregar nuevo registro de peoyecto la clase
          var correlativo=0;
          var numeroEliminacion=0;
          
     $(document).on("click",".addNewRegistroMaquinariaProyecto",function() {
             numeroEliminacion=numeroEliminacion+1;
             correlativo=correlativo+1;
      var formulario="";
      
        formulario = '<div class="panel panel-default" id="DatosMantenimiento-'+numeroEliminacion+'"><div class="panel-body" ><div class="divMadreDatosMantenimiento" >\n\
                                    <div class="form-column col-md-3">\n\
                                        <div class="form-group" style="margin-right: 2%;">\n\
                                        <label for="maquina-" class="control-label">Maquina</label>\n\
                                        <select id="maquina-'+correlativo+'" name="maquina" class="form-control maquina requeridoMP" style="width: 100%">\n\
                                        <option value="0" selected eneable>Maquina...</option>\n\
                                   </select>\n\
                              </div>\n\
                            </div>\n\
                              <div class="col-md-9"></div>\n\
                               <div class="clearfix"></div>\n\
                                <div class="form-column col-md-3 operariosMaquinaCant">\n\
                                            <label for="operarioMaquina" class="control-label">Operario</label>\n\
                                             <div id="radiosOperarios">\n\
                                            <label class="radio-inline"><input type="radio" name="operarioMaquina-'+correlativo+'" class="operarioMaquina" checked="checked" value="1">Si</label>\n\
                                            <label class="radio-inline"><input type="radio" name="operarioMaquina-'+correlativo+'" class="operarioMaquina" value="0">No</label>\n\
                                            </div>\n\
                                        </div>\n\
                                </div>\n\
                             <div class="form-column col-md-3">\n\
                                            <div class="form-group" >\n\
                                                     <label for="horasMinimas" class="control-label">Numero horas minimas</label>\n\
                                                    <div class="form-group"><div class="input-group"><div class="input-group-addon">#</div>\n\
                                                    <input type="text" min="1" class="form-control horasMinimas requeridoMP" id="horasMinimas-'+correlativo+'"  placeholder="Horas minimas" name="horasMinimas" value="0"></div></div>\n\
                                              </div>\n\
                                    </div>\n\
                                     <div class="form-column col-md-3">\n\
                                                    <label for="operarioMaquina" class="control-label" maquinaTipoCobro>Tipo de cobro</label>\n\
                                                    <div id="radiosOperarios">\n\
                                                    <label class="radio-inline"><input type="radio" name="tipoCobro-'+correlativo+'" class="tipoCobro" checked="checked" value="2">Dia</label>\n\
                                                    <label class="radio-inline"><input type="radio" name="tipoCobro-'+correlativo+'" class="tipoCobro" value="1">Hora</label>\n\
                                                </div>\n\
                                        </div>\n\
                                           <div class="form-column col-md-3">\n\
                                            <div class="form-group" >\n\
                                                     <label for="costoMaquina" class="control-label">Precio</label>\n\
                                                    <div class="form-group"><div class="input-group"><div class="input-group-addon">$</div><input type="text" min="1" class="form-control costoMaquina requeridoMP"  placeholder="costo" name="costoMaquina" value="0"></div></div>\n\
                                              </div>\n\
                                 </div>\n\
                                <input type="hidden" id="idMaquinaSeleccionada-'+correlativo+'" name="" value="0">\n\
                                <div class="clearfix"></div>\n\
                                    <div class="col-md-10"></div>\n\
                                        <div class="col-md-2" style=" border-radius: 0;">\n\
                                                <div class="btn-group pull-right"><button class="btn btn-danger  btn-sm eliminarNuevoRegistroAsignacionMaquinaProyecto" id="'+numeroEliminacion+'">Eliminar</button>\n\
                                                </div>\n\
                                        </div>\n\
                                              <div class="clearfix"></div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>';
      
      
         $("#contenidoDatosNuevosMaquinariaProyecto").append(formulario);
       
              $('#maquina-'+correlativo).select2({
                ajax: {
                    url: Routing.generate('buscarMaquina'),
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        
                        return {
                            q: params.term,
                            page: params.page,
                            x:maquinasSelccionadas
                           };
                    },
                    processResults: function (data, params) {
                        var select2Data = $.map(data.data, function (obj) {
                            obj.id = obj.maquinaid;
                            if (obj.maIdentificacionAlquiler!=""){
                                 obj.text = obj.maIdentificacionAlquiler+'-'+obj.nombre + ' - ' + obj.alias;
                            }else{
                                  obj.text = '#'+obj.nombre + ' - ' + obj.alias;
                            }
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
                
                },
                  language: {
                     noResults: function() {
                 return "<a href='#' id='addNevaMaquina'>Agregar nueva maquina</a><br>\n\
                             <a href='#' id='alquilarMaquina'>Alquilar maquina</a>";
                    }
                }, 
                
            });


    }); 
     $(document).on("click","#addNevaMaquina",function() {

        var url = Routing.generate('nuevamaquina');
        window.open(url, "_blank");
        

     });
     
     $(document).on("click","#alquilarMaquina",function() {
         
             
         $("#idModalFormAlqularMaquina").modal();
         

     });
    
    
    
   
  //Eliminacion de div que se ha ingresado dentro del apend de 
  //nuevo registro de asignacion de maquinaria proyecto
 $(document).on("click",".eliminarNuevoRegistroAsignacionMaquinaProyecto",function() {
         var idDetalleOrden = $(this).attr("id");

         
           swal({
                                                    title: "Advertencia",
                                                    text: "¿Estas seguro de remover el registro?",
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
                                                                $("#DatosMantenimiento-"+idDetalleOrden).remove();   
                                                                maquinasSelccionadas= [];
                                                                   
                                                                   
                                                              
                                                                $(".maquina").each(function (k, va) {
                                                                  maquinasSelccionadas.push($(this).val());
                                                                });
                                                                
                                                                    
                                                               
                                                              
                                                                    numeroEliminacion=numeroEliminacion-1;
                                                                     if (numeroEliminacion==0){

                                                                            $("#insercionMaquinariaProyecto").hide();

                                                                       }
                                                                       
                                                                       

                                                            } else {

                                                                
                                                            }
                                                            
                                                            
                                                        });

                                            });   
 var maquinasSelccionadas = new Array();
 //maquinasSelccionadas.push(0);
 
      $(document).on("change",".maquina",function() {

                var idMaquina = $(this).val();
                var identificador = $(this).attr("id");
                identificador= identificador.replace('maquina-','');
                $("#idMaquinaSeleccionada-"+identificador).val(idMaquina);
                 maquinasSelccionadas.push(idMaquina);
               
            
               
      });
      
//      horasMinimas
      
      
 
  $(document).on("click","#guardarFormularioMaquinariaProyecto",function() {
                        var cont =0;
                                                                $(".maquina").each(function () {
                                                                    
                                                                      var x =  $(this).val();
                                                                      if (x==0){
                                                                          cont=cont+1;
                                                                           swal("Error!", "El campo de maquina no puede ir vacio", "error");
                                                                          }
                                                                      
                                                                });
                                                                
                                                                 $(".requeridoMP").each(function () {
                                                                    
                                                                      var x =  $(this).val();
                                                                      if (x=="" || x==0){
                                                                          cont=cont+1;
                                                                           swal("Error!", "Los campos requeridos no pueden ir vacios", "error");
                                                                          }
                                                                      
                                                                }); 
                                                                
                                                      if (cont==0){
                                                       guardarMaquinariaProyecto();
                                                          
                                                      }          
                                                     
  });
  
  
    function guardarMaquinariaProyecto(){
          
            var maquinas = new Array();
            var operarioMaquinas= new Array();
            var tipoCobros = new Array();
            var horasMinimas = new Array();
            var costoMaquinas = new Array();
            
            $(".maquina").each(function(k, va) {
                     maquinas.push($(this).val());
             });
             
             
              $(".operariosMaquinaCant").each(function(k, va) {
                  var numero = k+1;
                  operarioMaquinas.push($('input[name="operarioMaquina-'+numero+'"]:checked').val());
  
             });
             
               $(".maquinaTipoCobro").each(function(k, va) {
                  var numero = k+1;
                  tipoCobros.push($('input[name="tipoCobro-'+numero+'"]:checked').val());
  
                });
               
                 $(".horasMinimas").each(function(k, va) {
                     horasMinimas.push($(this).val());
                    });
                    
                     $(".costoMaquina").each(function(k, va) {
                     costoMaquinas.push($(this).val());
                     
                    });
                    
                   $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {maquinas:maquinas,operarioMaquinas:operarioMaquinas,tipoCobros:tipoCobros,
                                                horasMinimas:horasMinimas,costoMaquinas:costoMaquinas},
                                    url: Routing.generate('insertarMaquinariaProyecto'),
                                    success: function (data)
                                    {
                                         if (data.estado==true){
                                             
                                         var url=Routing.generate('admin_proveedor_index');
                                        window.open(url,"_self"); 
                                        
                                                         
                                            
                                             
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
                    
                    
                    
                    
        
        
        
    }
 
  
  //Fin Document Ready    
 });
 
 
 //Funciones dentro del click y al momento de cargar
 function alcargar (){
     $("#nuevaEliminacionMaquinaria").hide();
     $("#addNewRegistroMaquinariaProyecto").hide();
     $(".contenidoDatosNuevosMaquinariaProyecto").hide();
 }
 
 
 function clickNuevaAsignacion (){
     
     $("#nuevaAsignacionMaquinaria").hide();
     $("#addNewRegistroMaquinariaProyecto").show();
     $("#contenidoTablaMaquinariaAsignada").hide();

 }

 //Las funciones de los select para la asignacion de maquinaria
function formatRepo (data) {
                     if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>"+ data.maIdentificacionAlquiler+' '+ data.nombre + " - " + data.alias + "</div>" +
                             "</div></div>";
            } 
            return markup;
        }

        function formatRepoSelection (data) {
            if(data.nombre){
                return  data.maIdentificacionAlquiler+' '+data.nombre + " - " + data.alias ;
            } else {
                return "Seleccione una maquina";
            }   
        }