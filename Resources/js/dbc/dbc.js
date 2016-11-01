 $(document).ready(function(){
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
             
             
             
             if (user!=""){
                 
                 $.ajax({
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {user:user,pass:pass,port:port,host:host,dbMotor:dbMotor},
                    url: Routing.generate('mostrarBd'),
                    success: function (data)
                    {
                        var form ="";
                      //data = jQuery.parseJSON(data);
                       $.each(data, function( k, v ) {
                           var form="<div class='row' style='margin-top:20px;'><div class='col-md-4'></div>\n\
                            <div class='col-md-2'><b>"+v+"</b></div>\n\
                            <div class='col-md-2'>\n\
                            <div' class='btn btn-success bdSeleccionada' value='"+v+"' id='"+v+"'>SELECT</div></div>\n\
                            <div class='col-md-4'></div><div class='clearfix'></div></div>";
                            $("#bdExistentes").append(form);
                     

                      });
                      
                      $("#modal").modal();
                      $(".introjs-skipbutton").click();
                      
                      
                      
                      
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
                                                    text: "¿Seguro que quieres seleccionar la base de datos con el nombre <b>"+nombreBase+"</b> ?",
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
                           var form="<div class='row' style='margin-top:20px;'><div class='col-md-2'></div>\n\
                            <div class='col-md-4'><b>"+v+"</b></div>\
                            <div class='col-md-6'></div><div class='clearfix'></div></div>";
                            $("#bdExistentes").append(form);
                            
                            
                            $("#encabezado").text("Tablas encontradas en la Base");
                     

                      });
                      var btn = "<div class='col-md-6 btn btn-primary' id='convertirBd'>Convertir</div>";
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
                        var form ="";
                      //data = jQuery.parseJSON(data);
                       $.each(data, function( k, v ) {
                     

                      });
                      
                     

                    },
                    error: function (xhr, status)
                    {

                    }
                   });
         
         
     });
     
     
     
     
     
 });
