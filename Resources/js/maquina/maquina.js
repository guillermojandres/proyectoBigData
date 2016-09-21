 $(document).ready(function(){
 var idDetalle =0;
  var idDetalleExpeMantenimiento =0;
  var xPermisoTablaDatosMantenimiento =0;
  var xPermisoTablaDatosExpedientesMant=0;
  var maquinaActual=0;
  

  
  
    $("#formularioEdicionExpedienteMaquinaria").hide()
    $("#almacenarInsersion").hide();

     $("#eliminarDatoMantenimiento").hide();
     $("#eliminarDatoExpedienteMantenimiento").hide();
     $(".formularioInsercionExpedienteMaquinaria").hide();
     $("#addNewRowDatoMante").hide();
     
     
     
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
    
     
     
           $(document).on("click","#nuevoRegistroDatoMantenimiento",function() {
           
           $("#nuevoRegistroDatoMantenimiento").hide();
           $("#contenidoTablaExpedienteMantenimiento").hide();
            $("#addNewRowDatoMante").show();
            $("#newDatoMante").click();
             $("#desdeMaquina").hide();
             $("#extraerRegistros").hide();
             $("#eliminarDatoMantenimiento").hide();
           
           
       }); 
       
       function seleccionarRegistroDatoMantenimiento(){
           
            $("#nuevoRegistroDatoMantenimiento").hide();
            $("#contenidoTablaExpedienteMantenimiento").hide();
            $("#addNewRowDatoMante").hide();
            $("#contenidoDatosMantenimiento").hide();
              $("#desdeMaquina").hide();
             $("#extraerRegistros").hide();
             $("#eliminarDatoMantenimiento").hide();
           
           
       }
     
     
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
            
            
 //Select del tipo de mantenimiento
   $('#tipoMantenimiento').select2({
                ajax: {
                    url: Routing.generate('buscarTipoMantenimiento'),
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
 
 
 //Select del proyecto
  $('#proyecto').select2({
                ajax: {
                    url: Routing.generate('buscarProyecto'),
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
                vin, placa, color, tamanho, capacidad, marca, descripcion;
      
            numeroSerie=$("#numeroSerie").val();
            numeroEquipo=$("#numeroEquipo").val();
            anho=$("#anhoMaquina").val();
            alias=$("#alias").val();
            modelo=$("#modelo").val();
            tipoEquipo=$("#tipoEquipo").val();
            vin=$("#vin").val();
            placa=$("#placa").val();
            color=$("#colorMaquina").val();
            tamanho=$("#tamanho").val();
            capacidad=$("#capacidad").val();
            marca=$("#marca").val();
            descripcion=$("#descripcionMaquina").val();
            
            
            if (numeroEquipo!=""){
                
       $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {numeroSerie:numeroSerie,numeroEquipo:numeroEquipo,
                                        placa:placa,n:0},
                                    url: Routing.generate('validarMaquina'),
                                    success: function (data)
                                    {
                                    
                                     if (data.estado==true){
                                         

                                            $.ajax({
                                                type: 'POST',
                                                async: false,
                                                dataType: 'json',
                                                data: {numeroSerie: numeroSerie, numeroEquipo: numeroEquipo, anho: anho, alias: alias, modelo: modelo, tipoEquipo: tipoEquipo,
                                                    vin: vin, placa: placa, color: color, tamanho: tamanho, capacidad: capacidad, marca: marca, descripcion: descripcion},
                                                url: Routing.generate('insertarMaquina'),
                                                success: function (data)
                                                {
                                                   $("#idMaquina").val(data.idMaquina);
                                                   $("#idMaquinaNuevoExpedienteMantenimiento").val(data.idMaquina);
                                                   $("#idMaquinaInsercionImagen").val(data.idMaquina);
                                                 
                                                 
                                                    if (data.estado == true) {

                                                swal({
                                                    title: "Exito!",
                                                    text: "Datos generales guardados exitosamente",
                                                    timer: 1500,
                                                    type: 'success',
                                                    showConfirmButton: false
                                                });
                                          
                                            setTimeout( function(){ 
                                                location.reload();
                                            }  , 1000 );
                                                 }

                                                },
                                                error: function (xhr, status)
                                                {

                                                }
                                            });
                                         
                  
                                     }
                                     else if(data.estado=="equipo"){
                                           Lobibox.notify("info", {
                                        size: 'mini',
                                        msg: 'Registro de numero de equipo ya existente, intente con otro.'
                                    });
                                     }
                                     else if(data.estado=="placa"){
                                           Lobibox.notify("info", {
                                        size: 'mini',
                                        msg: 'Registro de numero de pĺaca ya existente, intente con otro.'
                                    });
                                     }
                                     else if(data.estado=="serie"){
                                           Lobibox.notify("info", {
                                        size: 'mini',
                                        msg: 'Registro de numero de serie ya existente, intente con otro.'
                                    });
                                     }
                                       
                                             
                                    },
                                    error: function (xhr, status)
                                    {
                      
                    }
            });
        }else{
            swal("Error!", "El numero de equipo es requerido", "error");
        }
      

              
        }else{
         
            var idMaquina = $("#idMaquina").val();
      
             //Edicion de los datos generales de la maquinaria desde el formulario de insercion
             var numeroSerie, numeroEquipo, anho, alias, modelo, tipoEquipo,
            vin, placa, color, tamanho, capacidad, marca, descripcion;
      
            numeroSerie=$("#numeroSerie").val();
            numeroEquipo=$("#numeroEquipo").val();
            anho=$("#anhoMaquina").val();
            alias=$("#alias").val();
            modelo=$("#modelo").val();
            tipoEquipo=$("#tipoEquipo").val();
            vin=$("#vin").val();
            placa=$("#placa").val();
            color=$("#colorMaquina").val();
            tamanho=$("#tamanho").val();
            capacidad=$("#capacidad").val();
            marca=$("#marca").val();
            descripcion=$("#descripcionMaquina").val();

          
       $.ajax({
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: {numeroSerie:numeroSerie,numeroEquipo:numeroEquipo,
                                        placa:placa,n:1},
                                    url: Routing.generate('validarMaquina'),
                                    success: function (data)
                                    {
                                    
                                     if (data.estado==true){
      
                                            $.ajax({
                                                type: 'POST',
                                                async: false,
                                                dataType: 'json',
                                                data: {numeroSerie: numeroSerie, numeroEquipo: numeroEquipo, anho: anho, alias: alias, modelo: modelo, tipoEquipo: tipoEquipo,
                                                    vin: vin, placa: placa, color: color, tamanho: tamanho, capacidad: capacidad, marca: marca, descripcion: descripcion,idMaquina:idMaquina},
                                                url: Routing.generate('modificarMaquina'),
                                                success: function (data)
                                                {
                                                    $(".limpiarLabel").text("");
                                                    
                                                     $("#idMaquina").val(data.idMaquina);
                                                     $("#aliasDG").text(data.nombre);
                                                     $("#marcaDG").text(data.marca);
                                                     $("#serieDG").text(data.serie);
                                                     $("#modeloDG").text(data.modelo);
                                                     
                                                
                                                    if (data.estado == true) {
                                                        
                                                swal({
                                                    title: "Datos  modificados con exito",
                                                    text: "¿Quieres seguir completando los datos de la maquina ingresada?",
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
                                                                    var url=Routing.generate('admin_maquina_index');
                                                                window.open(url,"_self"); 

                                                            }
                                                        });
                                                       
                                                       

                                                    }

                                                },
                                                error: function (xhr, status)
                                                {
                                                    
                                                }
                                            });
                                            
                                      
                                     }
                                     else if(data.estado=="equipo"){
                                           Lobibox.notify("info", {
                                        size: 'mini',
                                        msg: 'Registro de numero de equipo ya existente, intente con otro.'
                                    });
                                     }
                                     else if(data.estado=="placa"){
                                           Lobibox.notify("info", {
                                        size: 'mini',
                                        msg: 'Registro de numero de pĺaca ya existente, intente con otro.'
                                    });
                                     }
                                     else if(data.estado=="serie"){
                                           Lobibox.notify("info", {
                                        size: 'mini',
                                        msg: 'Registro de numero de serie ya existente, intente con otro.'
                                    });
                                     }
                                       
                                             
                                    },
                                    error: function (xhr, status)
                                    {
                      
                            }
                        });



                    }

                });

  //Validacion para que tenga que completar los datos en un orden en especifico
  //Pestaña de Datos de Mantenimiento
  
     $(document).on("click","#datosMantenimiento",function() {
            var valor = $("#idMaquina").val();
            
            
            
            if (valor==0){
                 
                 $("#datosGenerales").click();
                 
                 swal("Alerta!", "Primero tienes que ingresar los datos generales de la maquina.", "warning");
                 
            }else{
                
                if (xPermisoTablaDatosMantenimiento==0){
                    maquinaActual=$("#idMaquina").val();
                     llamarDataTableDatosMantenimiento();
                     xPermisoTablaDatosMantenimiento=xPermisoTablaDatosMantenimiento+1;
                }
               
                
            }
            
            
            
        });     
        
        //Pestaña de datos del Expediente
      $(document).on("click","#datosExpedienteMantenimiento",function() {
            var valor = $("#idMaquina").val();
            
            
            
            if (valor==0){
                 
                 $("#datosGenerales").click();
                 
                   
                 swal("Alerta!", "Primero tienes que ingresar los datos generales de la maquina.", "warning");
                
            }else{
                
                if (xPermisoTablaDatosExpedientesMant==0){
                     llamarDataTableExpedientesMantenimientos();
                     xPermisoTablaDatosExpedientesMant=xPermisoTablaDatosExpedientesMant+1;
                }
               
                
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
  
     
     
   //Donde se llena el data table que contiene los datos de mantenimientos
    
    function llamarDataTableDatosMantenimiento(){
            var idMaqui= $("#idMaquina").val();

            var url = Routing.generate('datosmantenimientodata',{idMaquina: idMaqui});
            
            $('#listaDatosMantenimientos').DataTable({
                columnDefs: [
                    {
                        targets: [0, 1, 2, 3],
                        className: 'mdl-data-table__cell--non-numeric'
                    }
                ],
                "pageLength": 10,
                "lengthMenu": [20],
                "dom": "ftp",
                "processing": true,
                "ajax": {
                    "url": url,
                    "type": 'GET'
                  
                },
                "columns": [
                    {"data": "codigo"},
                    {"data": "nombre"},
                    {"data": "numeroOriginal"},
                    {"data": "numeroComercial"}
                ],
                "language": {
                    "info": "Mostrando página _PAGE_ de _PAGES_",
                    "infoEmpty": "",
                    "emptyTable": "<center>No se encontraron registros</center>",
                    "paginate": {
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "processing": "<p>Procesando petición...</p>",
                    "search": "<p>Buscar registros:</p>",
                    "lengthMenu": "Mostrar _MENU_ registros"
                }


            });

    }
          
          
//Donde se me crean los campos que llenan el detalle de Datos de Mantenimiento          

var numeroEliminacion=0;
  
  $(document).on("click",".addDatosMantenimiento",function() {
      numeroEliminacion=numeroEliminacion+1;
      var formulario="";
      
        formulario = '<div class="panel panel-default" id="DatosMantenimiento-'+numeroEliminacion+'"><div class="panel-body" ><div class="divMadreDatosMantenimiento" ><div class="form-column col-md-3"><div class="form-group required" >\n\
                            <label for="nombre" class="control-label">Repuesto/Trabajo realizar</label>\n\
                                <input type="text" class="form-control nombreDato requerido" id="nombre" placeholder="Repuesto o trabajo a realizar" name="nombre" >\n\
                                </div>\n\
                           </div>\n\
                            <div class="form-column col-md-3"><div class="form-group" >\n\
                                <label for="marca" class="control-label">Marca</label>\n\
                                <input type="text" class="form-control marcaDato" id="marca" placeholder="Marca del producto" name="marca" >\n\
                                </div>\n\
                           </div>\n\
                            <div class="form-column col-md-3"><div class="form-group" >\n\
                                <label for="marca" class="control-label">Numero original</label>\n\
                                <input type="text" class="form-control numeroOriginal" id="numeroOriginal" placeholder="# Original" name="numeroOriginal" >\n\
                                </div>\n\
                           </div>\n\
                            <div class="form-column col-md-3"><div class="form-group" >\n\
                                <label for="marca" class="control-label">Numero comercial</label>\n\
                                <input type="text" class="form-control numeroComercial" id="numeroComercial" placeholder="# Comercial" name="numeroComercial" >\n\
                                </div>\n\
                           </div>\n\
                            <div class="clearfix"></div>\n\
                             <div class="form-column col-md-9"><div class="form-group" >\n\
                              <label for="descripcion" class="control-label">Descripcion</label>\n\
                                        <textarea class="form-control descripcionDato" id="descripcion" placeholder="Descripcion del producto" name="descripcion" maxlength="350"></textarea>\n\
                             </div>\n\
                            </div>  \n\
                                <div class="col-md-2" style="margin-top: 25px;margin-left:10px; border-radius: 0;">\n\
                                     <div class="btn-group pull-right"><button class="btn btn-danger  btn-sm eliminarDiv" style="margin-left: 5px;margin-top: 35px;margin-right:-80px; " id="'+numeroEliminacion+'">Eliminar</button>\n\
                                </div>\n\
                             <div class="clearfix"></div></div></div></div>';
      
      
       $("#contenidoDatosMantenimiento").append(formulario);
       
       $("#almacenarInsersion").show();
      $("#nombre").focus();
      
  });
  
  
  
  
  //Eliminar div de expediente de mantenimiento en la edicion
   
   $(document).on("click",".eliminarDiv",function() {
         var idDetalleOrden = $(this).attr("id");

         
           swal({
                                                    title: "Advertencia",
                                                    text: "¿Estas seguro de remover?",
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
                                                                
                                                           numeroEliminacion=numeroEliminacion-1;
                                                            if (numeroEliminacion==0){
                                                                
                                                                    $("#almacenarInsersion").hide();
                                                                    $("#cancelarFormularioDatoManetenimiento").click();
                                                                    
                                                                
                                                            }
                                                          

                                                            } else {

                                                                
                                                            }
                                                            
                                                            
                                                        });

                                            });
   
  //Donde se envian los valores de que se quieren registrar
   $(document).on("click","#guardarFormularioDatoManetenimiento",function() {
       
         var num=0;
         
                $('.requerido').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
       
        if (num==0){
            
        var nombres = new Array();
        var numerosOriginal = new Array();
        var numerosComercial = new Array();
        
        var descripciones = new Array();
          var marcas = new Array();
            
            $(".nombreDato").each(function(k, va) {
                     nombres.push($(this).val());
             });
             
              $(".numeroOriginal").each(function(k, va) {
                     numerosOriginal.push($(this).val());
             });
             
             
            $(".numeroComercial").each(function(k, va) {
                     numerosComercial.push($(this).val());
             });
             
            $(".descripcionDato").each(function(k, va) {
                     descripciones.push($(this).val());
             });
             $(".marcaDato").each(function(k, va) {
                     marcas.push($(this).val());
             });
             
             
        var idMaquina = $("#idMaquina").val();       
             
       $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {nombres:nombres,numerosOriginal:numerosOriginal,descripciones:descripciones,idMaquina:idMaquina,
                marcas:marcas,numerosComercial:numerosComercial},
            url: Routing.generate('insertarDatosMantenimiento'),
            success: function (data)
            {
                if (data.estado==true){
                              $("#almacenarInsersion").hide();

                                        $('#contenidoDatosMantenimiento').html('');
                                        
                                        var table = $('#listaDatosMantenimientos').DataTable();
                                        
                                                table.ajax.reload(function (json) {

                                                });
                            
                  swal({
                        title: "Datos de mantenimiento ingresados con exito",
                        text: "¿Quieres seguir inrgesando  datos de mantenimiento?",
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
                                    $("#cancelarFormularioDatoManetenimiento").click();
                               

                                } else {
                                    var url = Routing.generate('admin_maquina_index');
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
         swal("Error!", "El campo repuesto o trabajo a realizar es requerido", "error");

   }
               
   });
   
   
  //seleccion de un Tr para una eliminacion
   $(document).on("click","tbody>tr",function() {
       
          

             var identificador =     $(this).attr("role");
       
            if(identificador=="row"){
                    
                    var idTabla = $(this).parent().parent().attr('id');
                  
                    
                    if (idTabla=='listaExpedienteMantenimientos'){
                     var idCliente1 =  $(this).children().html();
                     idDetalleExpeMantenimiento=idCliente1;
                     
                    
                    $("tr").css('background-color', 'white');
                    $("tr").css('border-color', '#262626');
                    $(this).css('background-color', '#E9E6E6');
                    $("#eliminarDatoExpedienteMantenimiento").show();  
                        
                    }else if(idTabla=='listaDatosMantenimientos'){
                        
                    var idCliente =  $(this).children().html();
                     idDetalle=idCliente;
                  
                    $("tr").css('background-color', 'white');
                    $("tr").css('border-color', '#262626');
                    $(this).css('background-color', '#E9E6E6');
                    $("#eliminarDatoMantenimiento").show();  
                    
                    }
                    
                

                    
             }else{
                  $("#eliminarDatoMantenimiento").hide();
                  
             }
          
           
           
                
       });
       
       
       
       
    //Click dentro del boton que me elimina un registro de un detalle de expediente de mantenimiento
    
     $(document).on("click","#eliminarDatoExpedienteMantenimiento",function() {
         
          var url=Routing.generate('eliminarExpedienteMantenimiento');
           
            swal({
                                                    title: "<p style='font-size:16px;'><b>Estas a punto de eliminar un registro de expediente de mantenimiento</b></p> ",
                                                    text: "<br>¿Quieres eliminar el registro?<br> Si aceptas, los datos  no podran ser recuperados.",
                                                    type: "warning",
                                                    html: true,
                                                    showCancelButton: true,
                                                    cancelButtonText: "No",
                                                    confirmButtonText: "Si",
                                                    confirmButtonColor: "#FF4E4E",
                                                     cancelButtonColor: "BLUE",
                                                    closeOnConfirm: true,
                                                    closeOnCancel: true
                                                },
                                                        function (isConfirm) {
                                                            if (isConfirm) {
                                                                     $.ajax({
                                                                            type: 'POST',
                                                                            async: false,
                                                                            dataType: 'json',
                                                                            data: {idDetalleExpeMantenimiento:idDetalleExpeMantenimiento},
                                                                            url: url,
                                                                            success: function (data)
                                                                            {


                                                                                if (data.estado == true) {
                                                                                    
                                                                                    
                                                                                 
                                                                                 
                                                                                 var tableExpedienteM = $('#listaExpedienteMantenimientos').DataTable();
                                                                                var idMaqui = $("#idMaquina").val();
                                                                                var url = Routing.generate('datosexpedientesmantenimientodata', {idMaquina: idMaqui});
                                                                                tableExpedienteM.ajax.url(url).load();
                                                                                limparformulario();
                                                                                    
                                                                                
                                                                                }

                                                                            },
                                                                            error: function (xhr, status)
                                                                            {

                                                                            }
                                                                        });

                                      
                                                            } else {
                                                                   
                                                                   $("#eliminarAbono").hide();
                                                                   

                                                            }
                                                        });
         
       
         
     });
     
     
     
     
   //Construccion del div que me genera las cajas de edicion de un campo.
   

   $(document).on("dblclick","tbody>tr",function() {
       
          var identificador =     $(this).attr("role");
       
            if(identificador=="row"){
       var idTabla = $(this).parent().parent().attr('id');
       
        
                  
                    
             if (idTabla=='listaExpedienteMantenimientos'){
              var idRegistro =  $(this).children().html();
                     
            $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {idRegistro: idRegistro},
            url: Routing.generate('seleccionarDatosExpedienteMantenimiento'),
            success: function (data)
            {
                var correlativo=0;
                var total = data.total
                total= total.toFixed(2);
                
                if (data.estado == true) {
                        var imagenVisibilidad= '';
                        if (data.imagen==null){
                            imagenVisibilidad=' display:none; '

                        }
        var formulario = "";
                            formulario=' <div class="row" id="formularioEdicionExpedienteMaquinaria" style="margin-top: 10px;">\n\
                                                    <form action=""  id="formEdicionExpediente" enctype="multipart/form-data" method="POST">\n\
                    <input type="hidden" name="idRegistro" id="idRegistro" value="'+data.registro+'" >\n\
                     <input type="hidden" name="idMaquinaNuevoExpedienteMantenimientoE" id="idMaquinaNuevoExpedienteMantenimientoE" value="'+data.idMaquina+'" >\n\
                    <div class="form-column col-md-4">\n\
                        <div class="form-group required" style="margin-right: 2%;">\n\
                       <label for="tipoMantenimiento" class="control-label">Tipo de Mantenimiento</label>\n\
                        <select id="tipoMantenimientoE" name="tipoMantenimientoE" class="form-control requeridoINEME clerSelect" style="width: 100%" >\n\
                            <option selected value="'+data.tipoMantenimientoId+'" selected>'+data.tipoMantenimientoNombre+'</option>\n\
                            </select>\n\
                        </div>\n\
                    </div>\n\
                    <div class="form-column col-md-4" style="padding-top: 0%;">\n\
                         <div class="form-group required" >\n\
                                <label for="fechaDE" class="control-label">Fecha</label>\n\
                                </br><input type="text" name="fechaDEE" id="fechaDEE" class="requeridoINEME cler" value="'+data.fecha+'">\n\
                            </div>\n\
                        </div><div class="clearfix"></div>\n\
                            <div class="form-column col-md-4">\n\
                                <div class="form-group" style="margin-right: 2%;">\n\
                                    <label for="proyecto" class="control-label">Proyecto</label>\n\
                                        <select id="proyectoE" name="proyectoE" class="form-control cler" style="width: 100%">\n\
                                           <option selected value="'+data.proyectoId+'"  selected>'+data.proyectoNombre+'</option>\n\
                                        </select>\n\
                                     </div>\n\
                             </div>\n\
                                <div class="form-column col-md-4">\n\
                                      <div class="form-group required" style="margin-right: 8%;" >\n\
                                            <div class="form-group">\n\
                                            <label for="numeroFactura" class="control-label ">Numero Factura</label>\n\
                                                  <div class="input-group">\n\
                                                    <div class="input-group-addon">#</div>\n\
                                                  <input type="text   " class="form-control requeridoINEME cler" id="numeroFacturaE"  name="numeroFacturaE" value="'+data.numeroFactura+'">\n\
                                            </div>\n\
                                       </div>\n\
                                    </div>\n\
                                </div>\n\
                                 <div class="form-column col-md-4">\n\
                                            <div class="form-group" style="margin-right: 2%;">\n\
                                            <label for="fotoFactura" class="control-label">Foto de factura</label>\n\
                                            <input type="file" class="clerSelect" id="fotoFacturaE"  name="fotoFacturaE">\n\
                                 </div>\n\
                                  </div><div class="clearfix"></div>\n\
                                        <div class="form-column col-md-8">\n\
                                            <div class="form-group" >\n\
                                                <label for="descripcionDatoExpediente" class="control-label" >Descripción</label>\n\
                                                <textarea name="descripcionDatoExpedienteE" id="descripcionDatoExpedienteE" class="form-control cler" maxlength="250">'+data.descripcion+'</textarea>\n\
                                            </div>\n\
                                        </div>\n\
                                        <div class="form-column col-md-4" >\n\
                                            <div class="form-group" >\n\
                                            <img src="/erpconstructora/Photos/expediente/'+data.imagen+'"  style="max-height: 300px;max-width: 300px;'+imagenVisibilidad+'" id="prevFacturaE">\n\
                                            <input type="hidden" value='+data.imagenIdRegistro+' name="idRegistroImagen">\n\
                                        </div>\n\
                                    </div>\n\
                                        <input type="hidden" name="totalCostoE" id="costoTotalBaseE" value="'+total+'">\n\
                                    </form>\n\
                        <div class="clearfix"></div>\n\
                        <div class="form-column col-md-4" >\n\
                         <div class="form-group" >\n\
                                <img src=""  style="display: none; max-height: 300px;max-width: 300px;" id="prevFactura">\n\
                                </div>\n\
                         </div>\n\
                        <div class="clearfix"></div>\n\
                           <div style="margin-bottom:0;margin-top: 10px;margin-left: 10px;"  class="formularioInsercionExpedienteMaquinaria">\n\
                                   <img src="/erpconstructora/Resources/src/img/add.png" title="Nuevo detalle" class="addExpedienteDatosMantenimientoEdicion">\n\
                                           <b class="addExpedienteDatosMantenimientoEdicion">Agregar detalle</b><br><br>\n\
                                                   </div>\n\
                                                        <div  id="detalleDimanicoExpedienteMantenimientoEdicion" style="margin-left:2%;margin-right:2%;">\n\
                                                         </div>\n\
                                                       <div class="clearfix">\n\
                                                        </div>\n\
                                                            <div class="col-md-4">\n\
                                                                    <div class="form-group" >\n\
                                                                       <div class="btn-group pull-left"><a class="btn btn-default  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="cancelarInsercionExpeManetenimientoEdicion">Cancelar</a>\n\
                                                                   </div>\n\
                                                                 <div class="btn-group pull-left">\n\
                                                               <a  class="btn btn-success  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="guardarExpedienteEdicion">Guardar</a>\n\
                                                        </div>\n\
                                                    </div>\n\
                                               </div>\n\
                                            <div class="col-md-4"></div>\n\
                                                   <div class="form-column col-md-4">\n\
                                                           <div class="form-group required" style="margin-right: 2%;" >\n\
                                                               <div class="form-group">\n\
                                                                           <label class="control-label" for="exampleInputAmount">Total</label>\n\
                                                                           <div class="input-group"><div class="input-group-addon">$</div>\n\
                                                                                           <input type="text" class="form-control requeridoINEM totalCosto" id="totalCostoE"   readonly disabled value="'+total+'">\n\
                                                                                       <div class="input-group-addon">\n\
                                                                                       </div>\n\
                                                                                   </div>\n\
                                                                           </div>\n\
                                                                       </div>\n\
                                                                   </div>\n\
                                                                 </div>';
                    
                    
                    
                    $("#contenidoExpedienteMantenimiento").hide();
                    $("#nuevoDestalleExpeMante").hide();
                    $("#formularioInsercionExpedienteMaquinaria").hide();
                    $("#eliminarDatoExpedienteMantenimiento").hide();
                    $("#formularioEdicionExpedienteMaquinaria").append(formulario);
                    


        $.each(data.detalle, function( key, value ) {  
                                            
                                             correlativo=correlativo+1;
                                             var idProveedor, nombreProveedor;
                                             idProveedor=value.idProv;
                                             nombreProveedor= value.provNombre;
                                             if (idProveedor==null){
                                                 idProveedor=0;
                                                 nombreProveedor= "Seleccione un proveedor...";
                                                 
                                             }

     var agregar = ' <div class="divDetalle" id="detalleDivEdicion-'+value.id+'"><div class="form-column col-md-4"><div class="form-group required" style="margin-right: 2%;" >\n\
        <input type ="hidden" name="idRegistro" class="idRegistros" value="'+value.id+'">\n\
                                    <div class="form-group"><label for="serie" class="control-label">Nombre</label>\n\
                                        <div class="input-group"><div class="input-group-addon">#</div>\n\
                                            <input type="text" class="form-control requeridoINEME nombresE" id="nombresE"  name="nombresE" value="'+value.nombreDet+'" >\n\
                                             </div>\n\
                                            </div>\n\
                                       </div>\n\
                                  </div>\n\
                                    <div class="form-column col-md-4">\n\
                               <div class="form-group required" style="margin-right: 2%;" ><div class="form-group"><label class="control-label" for="exampleInputAmount">Costo</label>\n\
                               <div class="input-group"><div class="input-group-addon">$</div>\n\
                                    <input type="text" class="form-control requeridoINEME costosE costosG" id="costosE"  name="costosE" value="'+value.costo+'">\n\
                                        <div class="input-group-addon">.00</div>\n\
                                     </div>\n\
                                </div>\n\
                              </div> \n\
                            </div>\n\
                     <div class="form-column col-md-3">\n\
                            <div class="form-group" style="margin-right: 2%;">\n\
                                    <label for="proveedor" class="control-label">Proveedor</label>\n\
                                        <select id="proveedorE-'+correlativo+'" name="proveedoresE" class="form-control clerSelect proveedoresE" style="width: 100%">\n\
                                        <option value="'+idProveedor+'">'+nombreProveedor+'</option>\n\
                                   </select>\n\
                                        </div>\n\
                                    </div> <div  id="'+value.id+'" class="eliminarDivDetalleExpedienteEB btn btn-danger col-md-1" style="margin-top: 25px;margin-left:-2px;border-radius: 0;">Delete</div>\n\
                    <div class="clearfix"></div>\n\
                        </div>';

            $("#detalleDimanicoExpedienteMantenimientoEdicion").append(agregar);      
            
             $('#proveedorE-'+correlativo).select2({
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
//                templateSelection: formatRepoSelection,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                }
            });

        });
                                            
                    

$('#fechaDEE').Zebra_DatePicker({
     format: 'M d, Y'
});


    //Select del tipo de mantenimiento
   $('#tipoMantenimientoE').select2({
                ajax: {
                    url: Routing.generate('buscarTipoMantenimiento'),
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
 
 
 //Select del proyecto
  $('#proyectoE').select2({
                ajax: {
                    url: Routing.generate('buscarProyecto'),
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
 
                    
                    
                    
                  
                        $("#formularioEdicionExpedienteMaquinaria").show();
                
               }


            },
            error: function (xhr, status)
            {



            }
        });
                     
//Doble click de en la tabla lista de datos de mantenimiento

                    }else if(idTabla=='listaDatosMantenimientos'){
                        
                    var idDatoMantenimiento = $(this).children().html();
                    idDetalle = idDatoMantenimiento;
                    $("#eliminarDatoMantenimiento").hide();
                    seleccionarRegistroDatoMantenimiento();
                    


                            $.ajax({
                                type: 'POST',
                                async: false,
                                dataType: 'json',
                                data: {idDatoMantenimiento: idDatoMantenimiento},
                                url: Routing.generate('seleccionarDatosMantenimientoEdicion'),
                                success: function (data)
                                {
                                    if (data.estado == true) {
                                        var form = "";

                                        form = '<div class="panel panel-default"><div class="panel-body" ><div class="form-column col-md-3"><div class="form-group required" >\n\
                                            <label for="nombre" class="control-label">Repuesto/Trabajo realizar</label>\n\
                                                <input type="text" class="form-control nombreDatoE requerido" id="nombre" placeholder="Nombre del producto" name="nombre" value="' + data.nombre + '" >\n\
                                                </div>\n\
                                           </div>\n\
                                            <div class="form-column col-md-3"><div class="form-group" >\n\
                                                <label for="numero" class="control-label">Marca</label>\n\
                                                <input type="text" class="form-control marcaDatoE" id="marcaDatoE" placeholder="Marca del producto" name="marcaDatoE" value="' + data.marca + '">\n\
                                                </div>\n\
                                           </div>\n\
                                            <div class="form-column col-md-3"><div class="form-group" >\n\
                                                <label for="marca" class="control-label">Numero original</label>\n\
                                                <input type="text" class="form-control numeroOriginalE" id="numeroOriginalE" placeholder="# Original" name="numeroOriginalE" value="' + data.numeroOriginal + '">\n\
                                                </div>\n\
                                           </div>\n\
                                            <div class="form-column col-md-3"><div class="form-group" >\n\
                                                <label for="marca" class="control-label">Numero comercial</label>\n\
                                                <input type="text" class="form-control numeroComercialE" id="numeroComercial" placeholder="# Comercial" name="numeroComercialE" value="' + data.numeroComercial + '">\n\
                                                </div>\n\
                                           </div>\n\
                                            <div class="clearfix"></div>\n\
                                            <div class="form-column col-md-9"><div class="form-group" >\n\
                                              <label for="descripcion" class="control-label">Descripcion</label>\n\
                                              <textarea class="form-control descripcionDatoE" id="descripcion" placeholder="Descripcion del producto" name="descripcion" >' + data.descripcion + '</textarea>\n\
                                             </div>\n\
                                            </div>\n\
                                            <div class="form-column col-md-6"></div>\n\
                                            <div class="clearfix"></div>\n\
                                                  <div id="almacenarEdicion">\n\
                                                    <div class="form-column col-md-4" style="margin-left: -120px;"><div class="form-group" >\n\
                                                <div class="btn-group pull-right">\n\
                                                    <a class="btn btn-default  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="cancelarEdicionDatoManetenimiento">Cancelar</a>\n\
                                                </div>\n\
                                                <div class="btn-group pull-right"><button class="btn btn-success  btn-sm " style="margin-left: 5px;margin-top: 35px;" id="guardarEdicionDatoManetenimiento">Guardar</button>\n\
                                                </div></div>\n\
                                                </div> </div></div></div>';


                                        $("#edicionDatosMantenimiento").append(form);


                                    }


                                },
                                error: function (xhr, status)
                                {

                                }

                            });
        
            //Esta seccion del codigo reconoce el doble click para asi poder editar con doble click        
        }else if (idTabla=='listaMaquinas'){
            
                 var idMaquinaEditar = $(this).children().html();
                 var url=Routing.generate('editarmaquina',{id:idMaquinaEditar});
            
                                    window.open(url, "_self");

        }
    }
});


//Eliminar registro de detalle en la edicion y de un solo eliminar el registro dentro de la BD
      $(document).on("click",".eliminarDivDetalleExpedienteEB",function() {
         
                                                           
                   var idRegistro = $(this).attr("id");
                                                                
                                                                
                                swal({
                                                    title: "Advertencia",
                                                    text: "¿Estas seguro de remover este registro? Si aceptas removerlo, no habra forma de recuperar los datos posteriormente",
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
                                                                   
                                                             

                                                                $.ajax({
                                                                    type: 'POST',
                                                                    async: false,
                                                                    dataType: 'json',
                                                                    data: {idRegistro:idRegistro},
                                                                    url: Routing.generate('eliminarRegistroDetalleEspediente'),
                                                                    success: function (data)
                                                                    {


                                                                        if (data.estado == true) {

                                                                            $("#detalleDivEdicion-"+idRegistro).remove();
                                                                            llenarTotalPagarEdicion();
                                                                                                                                                                 
                                                                        }

                                                                    },
                                                                    error: function (xhr, status)
                                                                    {

                                                                    }
                                                                });
                                                                
                                                                


                                                            } else {
                                                                
                                                                
                                                                
                                                            }
                                                            
                                                            
                                                        });
      
         
     });


//Agregegar nuevo registro al detalle de la edicion de un registro de Expediente de mantenimiento

  var correlativoDetalleExpedienteEdicion=0;
   $(document).on("click",".addExpedienteDatosMantenimientoEdicion",function() {
     correlativoDetalleExpedienteEdicion=correlativoDetalleExpedienteEdicion+1;
          
     var agregar = ' <div class="divDetalle" id="detalleDiv-'+correlativoDetalleExpedienteEdicion+'"><div class="clearfix"></div><div class="form-column col-md-4"><div class="form-group required" style="margin-right: 2%;" >\n\
                                    <div class="form-group"><label for="serie" class="control-label">Nombre</label>\n\
                                        <div class="input-group"><div class="input-group-addon">#</div>\n\
                                            <input type="text" class="form-control requeridoINEME nombresENuevo" id="nombresE"  name="nombresE" >\n\
                                             </div>\n\
                                            </div>\n\
                                       </div>\n\
                                  </div>\n\
                                    <div class="form-column col-md-4">\n\
                               <div class="form-group required" style="margin-right: 2%;" ><div class="form-group"><label class="control-label" for="exampleInputAmount">Costo</label>\n\
                               <div class="input-group"><div class="input-group-addon">$</div>\n\
                                    <input type="text" class="form-control requeridoINEME costosENuevo costosG" id="costosE"  name="costosE" value="0">\n\
                                        <div class="input-group-addon">.00</div>\n\
                                     </div>\n\
                                </div>\n\
                              </div> \n\
                            </div>\n\
                     <div class="form-column col-md-3">\n\
                            <div class="form-group" style="margin-right: 2%;">\n\
                                    <label for="proveedor" class="control-label">Proveedor</label>\n\
                                        <select id="proveedorEN-'+correlativoDetalleExpedienteEdicion+'" name="proveedoresE" class="form-control clerSelect proveedoresENuevo" style="width: 100%" >\n\
                                        <option value="0">Proveedor...</option>\n\
                                            </select>\n\
                                        </div>\n\
                                    </div> <div  id="'+correlativoDetalleExpedienteEdicion+'" class="eliminarDivDetalleExpedienteEdicion btn btn-danger col-md-1" style="margin-top: 25px;margin-left:-2px;border-radius: 0;">Delete</div>\n\
                    <div class="clearfix"></div>\n\
                        </div>';
     
     
     $("#detalleDimanicoExpedienteMantenimientoEdicion").append(agregar);
     
     $('#proveedorEN-'+correlativoDetalleExpedienteEdicion).select2({
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
//                templateSelection: formatRepoSelection,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                }
            });
     
     

   });
//Final de agregar nuevo




$(document).on("click","#cancelarInsercionExpeManetenimientoEdicion",function() {

       
       $("#formularioEdicionExpedienteMaquinaria div").html("");
       
       $("#cancelarInsercionExpeManetenimiento").click();
       
                   
        
        
    });




   //Donde se almacenan los valores de la edicion de los datos del mantenimiento    
  $(document).on("click","#guardarEdicionDatoManetenimiento",function() {
      
                 var num=0;
         
                $('.requerido').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
       
        if (num==0){
        
      
           
       var nombres = new Array();
        var numerosOriginal = new Array();
        var numerosComercial = new Array();
        var descripciones = new Array();
        var marcas = new Array();

        $(".nombreDatoE").each(function (k, va) {
            nombres.push($(this).val());
        });

        $(".numeroOriginalE").each(function (k, va) {
            numerosOriginal.push($(this).val());
        });
        
          $(".numeroComercialE").each(function (k, va) {
            numerosComercial.push($(this).val());
        });

        $(".descripcionDatoE").each(function (k, va) {
            descripciones.push($(this).val());
        });
        
         $(".marcaDatoE").each(function (k, va) {
            marcas.push($(this).val());
        });
      
      
      
      $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {idDatoMantenimiento: idDetalle,nombres:nombres,numerosOriginal:numerosOriginal,descripciones:descripciones
            ,marcas:marcas,numerosComercial:numerosComercial},
            url: Routing.generate('editarDatosMantenimientoEdicion'),
            success: function (data)
            {
                if (data.estado == true) {

                                        
                                        var table = $('#listaDatosMantenimientos').DataTable();
                                        
                                                table.ajax.reload(function (json) {

                                                });
                            
                  swal({
                        title: "Datos de mantenimiento ingresados con exito",
                        text: "¿Quieres seguir gestionando  datos de mantenimiento?",
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
                                    
                                    $("#cancelarEdicionDatoManetenimiento").click();
                                    
                                

                                } else {
                                    var url = Routing.generate('admin_maquina_index');
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
              swal("Error!", "El campo repuesto o trabajo a realizar es requerido, no puedes dejarlo vacio", "error");
            
        }
        
        

    });  
    
    
    
        function alcancelarEdicionDatoMantenimiento(){
            
            $('#edicionDatosMantenimiento').html('');
            $("#almacenarInsersion").hide();
            $("#nuevoRegistroDatoMantenimiento").show();
            $("#contenidoTablaExpedienteMantenimiento").show();
            $("#addNewRowDatoMante").hide();
            $("#contenidoDatosMantenimiento").show();
            $("#desdeMaquina").show();
            $("#extraerRegistros").show();
            
            
            
        }
    
  
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
  
  
    $(document).on("click","#cancelarFormularioDatoManetenimiento",function() {
        
            $('#contenidoDatosMantenimiento').html('');
            $("#almacenarInsersion").hide();
            $("#nuevoRegistroDatoMantenimiento").show();
            $("#contenidoTablaExpedienteMantenimiento").show();
            $("#addNewRowDatoMante").hide();
            $("#desdeMaquina").show();
            $("#extraerRegistros").show();
            $("#eliminarDatoMantenimiento").hide();
                
                limparformulario();
        
        
    });
    
    
//Ajax  que llena el data table de expedientes de mantenimientos
     function llamarDataTableExpedientesMantenimientos(){
            var idMaqui= $("#idMaquina").val();

            var url = Routing.generate('datosexpedientesmantenimientodata',{idMaquina: idMaqui});
            
          $('#listaExpedienteMantenimientos').DataTable({
                columnDefs: [
                    {
                        targets: [0, 1, 2,3],
                        className: 'mdl-data-table__cell--non-numeric'
                    }
                ],
                "pageLength": 10,
                "lengthMenu": [20],
                "dom": "ftp",
                "processing": true,
//                "serverSide": true,
                "ajax": {
                    "url": url,
                    "type": 'GET'
                  
                },
                "columns": [
                    {"data": "id"},
                    {"data": "fecha"},
                    {"data": "tipomantenimiento"},
//                    {"data": "serie"},
                    {"data": "costo"},
                    {"data": "proyecto"}
                    
                ],
                "language": {
                    "info": "Mostrando página _PAGE_ de _PAGES_",
                    "infoEmpty": "",
                    "emptyTable": "<center>No se encontraron registros</center>",
                    "paginate": {
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "processing": "<p>Procesando petición...</p>",
                    "search": "<p>Buscar registros:</p>",
                    "lengthMenu": "Mostrar _MENU_ registros"
                }


            });

    }
    
    
  
  $(document).on("click","#nuevoDestalleExpeMante",function() {
      $("#nuevoDestalleExpeMante").hide();
      $("#contenidoExpedienteMantenimiento").hide();
      $(".formularioInsercionExpedienteMaquinaria").show();
      $("#eliminarDatoExpedienteMantenimiento").hide();
        limparformulario();

      
  });
 
  $(document).on("click","#cancelarInsercionExpeManetenimiento",function() {
      
      $("#nuevoDestalleExpeMante").show();
      $("#contenidoExpedienteMantenimiento").show();
      $(".formularioInsercionExpedienteMaquinaria").hide();
      $("#detalleDimanicoExpedienteMantenimiento div").html("");
      $("#totalCosto").val("");
        limparformulario();

      
  });
  
 //Guardar los datos del expediente 
  //Variable global
  
  var flag=true;
  var Extension="";
  
  //Seleccion de imagen
   $(document).on("change","#fotoFactura",function()
    {
        
         //obtenemos un array con los datos del archivo
        var file = $(this)[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        Extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
      
        if ( Extension == "png" || Extension == "bmp"
                    || Extension == "jpeg" || Extension == "jpg") {
        	flag = true;
                 readURL(this);
                 $("#prevFactura").show();
                 
             
        }else{
            
        	flag = false;
                  swal("Error!", "Formato de archivo invalido", "error");
                  $(this).val("");
                     $("#prevFactura").hide();
        }
        

        
    });
  
  
  
  
  //Insercion de nuevo expediente de mantenimiento
  //Click en agregar mas a los detalles
    var correlativoDetalleExpediente=0;
   $(document).on("click",".addExpedienteDatosMantenimiento",function() {
     correlativoDetalleExpediente=correlativoDetalleExpediente+1;
          
     var agregar = ' <div class="divDetalle" id="detalleDiv-'+correlativoDetalleExpediente+'"><div class="clearfix"></div><div class="form-column col-md-4"><div class="form-group required" style="margin-right: 2%;" >\n\
                                    <div class="form-group"><label for="serie" class="control-label">Nombre</label>\n\
                                        <div class="input-group"><div class="input-group-addon">#</div>\n\
                                            <input type="text" class="form-control requeridoINEM nombres" id="nombres"  name="nombres" >\n\
                                             </div>\n\
                                            </div>\n\
                                       </div>\n\
                                  </div>\n\
                                    <div class="form-column col-md-4">\n\
                               <div class="form-group required" style="margin-right: 2%;" ><div class="form-group"><label class="control-label" for="exampleInputAmount">Costo</label>\n\
                               <div class="input-group"><div class="input-group-addon">$</div>\n\
                                    <input type="text" class="form-control requeridoINEM costos" id="costos"  name="costos" value="0">\n\
                                        <div class="input-group-addon">.00</div>\n\
                                     </div>\n\
                                </div>\n\
                              </div> \n\
                            </div>\n\
                     <div class="form-column col-md-3">\n\
                            <div class="form-group" style="margin-right: 2%;">\n\
                                    <label for="proveedor" class="control-label">Proveedor</label>\n\
                                        <select id="proveedor-'+correlativoDetalleExpediente+'" name="proveedores" class="form-control clerSelect proveedores" style="width: 100%" >\n\
                                        <option value="0">Proveedor...</option>\n\
                                            </select>\n\
                                        </div>\n\
                                    </div> <div  id="'+correlativoDetalleExpediente+'" class="eliminarDivDetalleExpediente btn btn-danger col-md-1" style="margin-top: 25px;margin-left:-2px;border-radius: 0;">Delete</div>\n\
                    <div class="clearfix"></div>\n\
                        </div>';
     
     
     $("#detalleDimanicoExpedienteMantenimiento").append(agregar);
     
     $('#proveedor-'+correlativoDetalleExpediente).select2({
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
//                templateSelection: formatRepoSelection,
                formatInputTooShort: function () {
                    return "Ingrese un caracter para la busqueda";
                }
            });
     
     

   });
   
   //Eliminar fila de nuevo registro dentro de la edicion de un registro de Expediente
   
    $(document).on("click",".eliminarDivDetalleExpedienteEdicion",function() {
         var idDetalleOrden = $(this).attr("id");

         
                    swal({   
                                                    title: "Advertencia",
                                                    text: "¿Estas seguro de remover?",
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
                                                                   
                                                
                                                                $("#detalleDiv-"+idDetalleOrden).remove();
                                                                llenarTotalPagarEdicion();
                                                          

                                                            } else {

                                                                
                                                            }
                                                            
                                                            
                                                        });
         
         
        });
  
   
   
    $(document).on("input",".costos",function() {
        
     
          var x =$(this).val();
       if (isNaN(x)!=true && x!=""){
                         llenarTotalPagarIngreso();
                      
          }else{
              $(this).val(0);
               swal("Error!", "El campo costo no pueden ser letras o un campo vacio", "error");
                 
          }
        
    });
    
      $(document).on("input",".costosG",function() {
          
          var x =$(this).val();
        
        
          if (isNaN(x)!=true && x!=""){
                      llenarTotalPagarEdicion();
                      
          }else{
              $(this).val(0);
               swal("Error!", "El campo costo no pueden ser letras o un campo vacio", "error");
                 
          }
        
        
        
    });
    
     function llenarTotalPagarIngreso(){
            var x=0;

             $('.costos').each(
                       function (){

                       var subTotal =  $(this).val();
                      
                       
                        x=x+parseFloat(subTotal);

                       });
            x=x.toFixed(2);
            $("#totalCosto").val(x);
            $("#costoTotalBase").val(x);
            
            
        }
    
    
    function llenarTotalPagarEdicion(){
            var x=0;

             $('.costosG').each(
                       function (){

                       var subTotal =  $(this).val();
                        x=x+parseFloat(subTotal);
                        
                        

                       });
            x=x.toFixed(2);
            $("#totalCostoE").val(x);
            $("#costoTotalBaseE").val(x);
            
            
        }
    
   
   //Eliminacion de fila de registro de detalle
  
   $(document).on("click",".eliminarDivDetalleExpediente",function() {
         var idDetalleOrden = $(this).attr("id");

         
           swal({
                                                    title: "Advertencia",
                                                    text: "¿Estas seguro de remover?",
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
                                                                   
                                                
                                                                $("#detalleDiv-"+idDetalleOrden).remove();
                                                                llenarTotalPagarIngreso();
                                                          

                                                            } else {

                                                                
                                                            }
                                                            
                                                            
                                                        });
         
         
        });
  
  
  //Agregar expediente de mantenimiento
    $(document).on("click","#guardarExpediente",function() {
        
        
         var num=0;
         
                $('.requeridoINEM').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
           
        var valorDetalle = 0;
        
        
          $('.nombres').each(function () {
            valorDetalle = valorDetalle + 1;


        });
        if (num==0){
            
            
            if(valorDetalle!=0){


         var controlCosto =0;
                        
            $('.costos').each(function () {
                
                var costo = $(this).val();
                if (isNaN(costo) != true) {
                    
                    controlCosto=controlCosto;
                } else {
                    controlCosto=controlCosto+1;
                   
                }


            });
                
                
     if (controlCosto==0){
                    
          var costos = new Array();
          var nombres = new Array();
          var proveedores = new Array();
          
          $(".nombres").each(function(k, va) {
                     nombres.push($(this).val());
             });
            
            
               $(".costos").each(function(k, va) {
                     costos.push($(this).val());
             });
            
               $(".proveedores").each(function(k, va) {
                     proveedores.push($(this).val());
             });

            var frm = new FormData($("#formInsercionExpediente")[0]);
            
           
             $.ajax({
                                                type: 'POST',
                                                async: false,
                                                dataType: 'json',
                                                data: frm,
                                                url: Routing.generate('insertarExpedienteMantenimiento'),
                                                 //necesario para subir archivos via ajax
                                                cache: false,
                                                contentType: false,
                                                processData: false,
                                                //una vez finalizado correctamente
                                                success: function (data)
                                                {
                                                     
                                                
                                                     if (data.estado == true) {
                                                         var idExpediente = data.idExpediente;
                                                             $.ajax({
                                                                type: 'POST',
                                                                async: false,
                                                                dataType: 'json',
                                                                data: {nombres:nombres,costos:costos,
                                                                            proveedores:proveedores,idExpediente:idExpediente},
                                                                url: Routing.generate('insertarDetalleExpediente'),
                                                                success: function (data)
                                                                {
                                                                    if (data.estado == true) {
                                                                                         swal({
                                                                                            title: "Datos de mantenimiento ingresados con exito",
                                                                                            text: "¿Quieres seguir  ingresando datos de expediente de mantenimiento?",
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

                                                                                                            $("#nuevoDestalleExpeMante").show();
                                                                                                            $("#contenidoExpedienteMantenimiento").show();
                                                                                                            $(".formularioInsercionExpedienteMaquinaria").hide();
                                                                                                            $("#detalleDimanicoExpedienteMantenimiento div").html("");
                                                                                                                var tableExpedienteM = $('#listaExpedienteMantenimientos').DataTable();
                                                                                                                var idMaqui = $("#idMaquina").val();
                                                                                                                var url = Routing.generate('datosexpedientesmantenimientodata', {idMaquina: idMaqui});
                                                                                                                tableExpedienteM.ajax.url(url).load();

                                                                                                                limparformulario();

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

                                                    }

                                                },
                                                error: function (xhr, status)
                                                {
                                                    
                                                }
                                            });
                                            
                                            
               }else{
                   
                    swal("Error!", "El campo costo no puede ser letras", "error");
               }                                
      
       }else{
             swal("Error!", "Debes agregar un detalle", "error");
           
       }
       
      }else{
      
                    swal("Error!", "No debes dejar campos ruqueridos vacios", "error");
                    
      }
      
       
   });
   
 //termina ingresar los datos de expediente
 //Empieza la insercion de los datos a editar dentro de un expediente
//Variable global
  
  var flag=true;
  var Extension="";
  
  //Seleccion de imagen
   $(document).on("change","#fotoFacturaE",function()
    {
        
        
         //obtenemos un array con los datos del archivo
        var file = $(this)[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        Extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
      
        if ( Extension == "png" || Extension == "bmp"
                    || Extension == "jpeg" || Extension == "jpg") {
        	flag = true;
                 readURLE(this);
                 $("#prevFacturaE").show();
                 
             
        }else{
        	flag = false;
                  swal("Error!", "Formato de archivo invalido", "error");
                  $(this).val("");
                     $("#prevFacturaE").hide();
        }
        

        
    });
  //Insercion de nuevo expediente de mantenimiento
    $(document).on("click","#guardarExpedienteEdicion",function() {
                 var num=0;
                $('.requeridoINEME').each( function (){
            
                       var x=$(this).val();
            
                       if(x=="" || x==null){
                           num=num+1;
                       }

                       });
        if (num==0){
            
        var controlCosto =0;
            $('.costosG').each(function () {
                
                var costo = $(this).val();
                if (isNaN(costo) != true) {
                    
                    controlCosto=controlCosto;
                } else {
                    controlCosto=controlCosto+1;
                   
                }


            });
           
        if (controlCosto==0) {
            //Valores que ya existen
          var costos = new Array();
          var nombres = new Array();
          var proveedores = new Array();
          var idRegistros = new Array();
          
                $(".nombresE").each(function (k, va) {
                    nombres.push($(this).val());
                });


                $(".costosE").each(function (k, va) {
                    costos.push($(this).val());
                });

                $(".proveedoresE").each(function (k, va) {
                    proveedores.push($(this).val());
                });
                
                $(".idRegistros").each(function (k, va) {
                    idRegistros.push($(this).val());
                });
            //Nuevo ingreso en la edicion
                var costosNuevosE = new Array();
                var nombresNuevosE = new Array();
                var proveedoresNuevosE = new Array();
             $(".nombresENuevo").each(function (k, va) {
                    nombresNuevosE.push($(this).val());
                });


                $(".costosENuevo").each(function (k, va) {
                    costosNuevosE.push($(this).val());
                });

                $(".proveedoresENuevo").each(function (k, va) {
                    proveedoresNuevosE.push($(this).val());
                });
            
            
                 
            var frm = new FormData($("#formEdicionExpediente")[0]);
            
           
             $.ajax({
                                                type: 'POST',
                                                async: false,
                                                dataType: 'json',
                                                data: frm,
                                                url: Routing.generate('modificarExpedienteMantenimiento'),
                                                 //necesario para subir archivos via ajax
                                                cache: false,
                                                contentType: false,
                                                processData: false,
                                                //una vez finalizado correctamente
                                                success: function (data)
                                                {
                                                     
                                                
                                                     if (data.estado == true) {

                                                             var idExpediente = data.idExpediente;
                                                             $.ajax({
                                                                type: 'POST',
                                                                async: false,
                                                                dataType: 'json',
                                                                data: {idExpediente:idExpediente,nombres:nombres,costos:costos,
                                                                            proveedores:proveedores,idExpediente:idExpediente,costosNuevosE:costosNuevosE,
                                                                        nombresNuevosE:nombresNuevosE,proveedoresNuevosE:proveedoresNuevosE,idRegistros:idRegistros},
                                                                url: Routing.generate('modificarDetalleExpediente'),
                                                                success: function (data)
                                                                {
                                                                    if (data.estado == true) {
                                                                                         swal({
                                                                                            title: "Datos de mantenimiento modificados con exito",
                                                                                            text: "¿Quieres seguir  ingresando datos de expediente de mantenimiento?",
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

                                                                                                       $("#formularioEdicionExpedienteMaquinaria div").html("");
                                                                                                       $("#cancelarInsercionExpeManetenimiento").click();

                                                                                                       var tableExpedienteM = $('#listaExpedienteMantenimientos').DataTable();
                                                                                                       var idMaqui = $("#idMaquina").val();
                                                                                                       var url = Routing.generate('datosexpedientesmantenimientodata', {idMaquina: idMaqui});
                                                                                                       tableExpedienteM.ajax.url(url).load();

                                                                                               } else {

                                                                                               var url = Routing.generate('admin_maquina_index');
                                                                                               window.open(url, "_self");

                                                                                           }
                                                                                       });


                                                                                }

                                                                },
                                                                error: function (xhr, status)
                                                                {



                                                                }
                                                            });

                                                    }

                                                },
                                                error: function (xhr, status)
                                                {
                                                    
                                                }
                                            });
                                            
          } else {
                 
                    swal("Error!", "El costo de la factura no puede ser letras", "error");
                }                      
                    
      }else{
      
                    swal("Error!", "No debes dejar campos ruqueridos vacios", "error");
                    
      }
      
       
   });
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
             $("#imgPrueba-"+correlativoDiv).attr("src","/erpconstructora/Photos/maquinaria/"+obj.nombreImagen);
    }

    });


    $(document).on("click","#cancelarDatosGeneralesMaquina",function() {
        
         var url = Routing.generate('admin_maquina_index');
         window.open(url, "_self");
        
    });
    
    
    //visualizar una imagen en grande
    $(document).on("click",".image",function() {
        
      var link=  $(this).attr("src");
         window.open(link, "_blank");
        
        
    });
    
    
   //Click en el boton cancelarEdicionDatoManetenimiento
   
     $(document).on("click","#cancelarEdicionDatoManetenimiento",function() {

//            $("#almacenarEdicion").hide();        
                alcancelarEdicionDatoMantenimiento();
            
         
     });

     //Funcion del select para jalar los datos de Datos de repuestos
     //Se inicaliza el select que llama a las maquinarias existenetes
     
      $('#idMaquinaSeleccionarDatosMantenimiento').select2({
                ajax: {
                    url: Routing.generate('buscarMaquina'),
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        
                        return {
                            q: params.term,
                            page: params.page,
                            x:maquinaActual
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
                templateResult: formatRepoM,
               templateSelection: formatRepoSelectionM,
                formatInputTooShort: function () {
                    
                    return "Ingrese un caracter para la busqueda";
                
                }
                
            });
     //Funcion de llamar los datos de mantenimiento de una maquina y replicarlos en otra
        
      $(document).on("change","#idMaquinaSeleccionarDatosMantenimiento",function() {
          
      $("#extraerRegistros").show();
      
    });
    
   
   
   
       $(document).on("click","#extraerEInsertarRegistros",function() {
          
            var idMaquinaCopiarRegistros = $("#idMaquinaSeleccionarDatosMantenimiento").val();
            if (idMaquinaCopiarRegistros==0){
                
                 swal("Información!", "Para poder extraer e insertar registros existentes de una maquina ya creada a una nueva,  primero debes seleccionar la maquina de la cual deseas copiar los registros.", "info");
            }
            else{
                var idMaquinaNueva  =$("#idMaquina").val();
                
                
                                                         $.ajax({
                                                                    type: 'POST',
                                                                    async: false,
                                                                    dataType: 'json',
                                                                    data: {idMaquinaCopiarRegistros:idMaquinaCopiarRegistros,idMaquinaNueva:idMaquinaNueva},
                                                                    url: Routing.generate('copiarRegistrosDeMantenimiento'),
                                                                    success: function (data)
                                                                    {
                                                                        if(data.estado == true){

                                                                                                       var table = $('#listaDatosMantenimientos').DataTable();
                                                                                                       var idMaqui = $("#idMaquina").val();
                                                                                                       var url = Routing.generate('datosmantenimientodata', {idMaquina: idMaqui});
                                                                                                       table.ajax.url(url).load();
                                                                                                       
                                                                               swal({
                                                                                        title: "Exito!",
                                                                                        text: "Datos generales guardados exitosamente",
                                                                                        timer: 1500,
                                                                                        type: 'success',
                                                                                        showConfirmButton: false
                                                                                    });

                                                                        }
                                                                       
                                                                        
                                                                     },
                                                                        error: function (xhr, status)
                                                                        {

                                                                        }
                                                                });
                
                
                }
      
    });
   
  //Fin del document Ready
 });
 
 function formatRepo (data) {
            if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>" + data.nombre+ "</div>" +
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
        
     function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#prevFactura').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    
    function limparformulario(){
        
        $("#tipoMantenimiento").val(0).change();
        $("#fechaDE").val("");
        $("#serie").val("");
        $("#costo").val("");
        $("#numeroFactura").val("");
        $("#proyecto").val(0).change();
        $("#proveedor").val(0).change();
        $("#fotoFactura").val("");
        $("#descripcionDatoExpediente").val("");
        $("#prevFactura").hide();
        $("#eliminarDatoExpedienteMantenimiento").hide();

        
    }
    
      function readURLE(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#prevFacturaE').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    
   //Las funciones de los select para la asignacion de maquinaria
function formatRepoM (data) {
                     if(data.nombre){
                var markup = "<div class='select2-result-repository clearfix'>" +
                             "<div class='select2-result-repository__meta'>" +
                             "<div class='select2-result-repository__title'>"+ data.maIdentificacionAlquiler+' '+ data.nombre + " - " + data.alias + "</div>" +
                             "</div></div>";
            } 
            return markup;
        }

        function formatRepoSelectionM (data) {
            if(data.nombre){
                return  data.maIdentificacionAlquiler+' '+data.nombre + " - " + data.alias ;
            } else {
                return "Seleccione una maquina";
            }   
        }