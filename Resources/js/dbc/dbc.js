 $(document).ready(function(){
     $("salirConversion").hide();
  var contadorNext = 0;
     var dbMotor;
     $(document).on("click",".introjs-nextbutton",function() {
         contadorNext= contadorNext+1;
          if (contadorNext==2){
             dbMotor = $("#dbMotor").val();
                if (dbMotor==1){
//                    Aqui tiene que ir el valor de la variable del append
                        var textoFormulario ='';
                            $(".introjs-tooltiptext").append(textoFormulario);
                
            }

         }else if (contadorNext==3){
             
             var user=$("#user").val();
             var pass=$("#pass").val();
             var port=$("#port").val();
             var host=$("#host").val();
             
             
             
             if (user!="" && host !="" ){
                 
                 $.ajax({
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {user:user,pass:pass,port:port,host:host,dbMotor:dbMotor},
                    url: Routing.generate('mostrarBd'),
                    success: function (data)
                    {
                        if (data.estado==false){
                           
                                $(".introjs-prevbutton").click();
                            
                        }else{
                                 
                        var form ="";
                      //data = jQuery.parseJSON(data);
                       $.each(data, function( k, v ) {
                           
                            var form="<div class='row' style='margin-top:20px;'><center>\n\
                            <div class='col-md-12' style='font-size:16px;'><b>"+v+"</b></div>\n\
                            <div class='clearfix'></div>\n\
                            <div class='col-md-4'></div>\n\
                            <div class='col-md-4 bdSeleccionada' value='"+v+"' id='"+v+"'><button class='btn-success'>Seleccionar</button></div>\n\
                            <div class='col-md-4'></div><div class='clearfix'></div></center></div>";
                            $("#bdExistentes").append(form);


                      });
                      
                      $("#modal").modal();
                      $(".introjs-skipbutton").click();
                            
                        }
 
                    },
                    error: function (xhr, status)
                    {

                    }
                   });
                 //Para el modal
                 
         
             }else{
                 //Si el valor del usuario es igual a nada entonces volvemos atras
                 $(".introjs-prevbutton").click();
             }
             
         }else if(contadorNext==4){
                 //Si el valor del usuario es igual a nada entonces volvemos atras
                 $(".introjs-skipbutton").click();
                 $(".modal").modal();
             }
   
     });
      $(document).on("click",".introjs-prevbutton",function() {
         contadorNext= contadorNext-1;
        
         
     });
     
     $(document).on("click",".bdSeleccionada",function() {
         var nombreBase = $(this).attr("id");
         swal({
                                                    title: "Advertencia",
                                                    text: "¿Seguro que quieres seleccionar la base de datos: <b>"+nombreBase+"</b> ?",
                                                    type: "warning",
                                                    html:true,
                                                    showCancelButton: true,
                                                    cancelButtonText: "No",
                                                    confirmButtonText: "Si",
                                                    confirmButtonColor: "#00A59D",
                                                    closeOnConfirm: true,
                                                    closeOnCancel: false
                                                },
                                                        function (isConfirm) {
                                                            if (isConfirm) {
                                                                    
                                                                    $.ajax({
                                                                            type: 'POST',
                                                                            async: false,
                                                                            dataType: 'json',
                                                                            data: {nombreBase:nombreBase},
                                                                            url:Routing.generate('mostrarTablas') ,
                                                                            success: function (data)
                                                                            {
                                                                            $("#bdExistentes").html("");    
                                                                   $.each(data, function( k, v ) {
                                                                                        var form="<div class='row' style='margin-top:20px;'><div class='col-md-12' style='text-align:center;font-size:16px;'>"+v+"</div>\n\
                                                                                        <div class='clearfix'></div></div>";
                                                                                        $("#bdExistentes").append(form);


                                                                         $("#encabezado").text("Tablas encontradas en la Base");


                                                                   });
                                                                   var btn = "<div class='col-md-4'></div>\n\
                                                                              <div class='col-md-4 btn btn-primary' id='convertirBd' style='margin-top:20px;'>Convertir a BIG DATA</div>\n\
                                                                               <div class='col-md-4'></div>";
                                                                    $("#bdExistentes").append(btn);
                                                                                

                                                                            },
                                                                            error: function (xhr, status)
                                                                            {

                                                                            }
                                                                        });

                                      
                                                            } else {
                                                                    

                                                            }
                                                        });
         
       
         
     });
     
      $(document).on("click","#convertirBd",function() {
          
           $.ajax({
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {},
                    url: Routing.generate('conversion'),
                    success: function (data)
                    {
                        var agregado1 ='';
                        var agregado2 ='';
                        var agregado3 ='';
                        var agregado4 ='';
                        if (data.estado==true){
                            agregado1 ='<div class="progress">\n\
                                <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"\n\
                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%" id="">\n\
                                  Extrayendo datos relacionales...\n\
                                </div>\n\
                            </div>';
                            agregado2='<div class="progress">\n\
                                <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"\n\
                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%" id="">\n\
                                  Generando archivo intermedio...\n\
                                </div>\n\
                            </div>';
                            
                            agregado3='<div class="progress">\n\
                                <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"\n\
                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%" id="">\n\
                                  Conviertiendo datos a BIG DATA...\n\
                                </div>\n\
                            </div>';
                            
                            agregado4='<div class="panel panel-primary">\n\
                                        <div class="panel-heading">¡Exito!</div>\n\
                                        <div class="panel-body">Datos migrados en un 100%, por favor consulte la nueva base de datos en MongoDB.</div>\n\
                                      </div>';
                        
                        $("#encabezado").text("Estado final");
                        $("#bdExistentes").html("");
                        var delay=1000; //3 second

                        setTimeout(function() {
                          $("#bdExistentes").append(agregado1);
                        }, delay);
                        delay = delay+1000;
                        setTimeout(function() {
                          $("#bdExistentes").append(agregado2);
                        }, delay);
                        delay = delay+1000;
                        setTimeout(function() {
                          $("#bdExistentes").append(agregado3);
                        }, delay);
                        delay = delay+1000;
                        setTimeout(function() {
                          $("#bdExistentes").append(agregado4);
                        }, delay);
                        delay = delay+500;
                         setTimeout(function() {
                           var salirButton = "<center><button id='salirConversion' class='btn btn-primary' style='margin-top:10px;'>Salir</button><center>"
                          $("#bdExistentes").append(salirButton);          
                          $("salirConversion").show();
                        }, delay);
                           
  
                        }
                    },
                    error: function (xhr, status)
                    {

                    }
                   });
         
         
     });
     
    $(document).on("click","#salirConversion",function() {
         $("#modal").modal("toggle");
         location.reload();
    });
     
     
     
 });
