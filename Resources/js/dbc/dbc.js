 $(document).ready(function(){
  var contadorNext = 0;
     $(document).on("change","#dbMotor",function() {
       
         
     });
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
                                                                                                        
                    },
                    error: function (xhr, status)
                    {

                    }
                   });
                 
         
             }else{
                 //Si el valor del usuario es igual a nada entonces volvemos atras
                 $(".introjs-prevbutton").click();
             }
             
         }
   
     });
      $(document).on("click",".introjs-prevbutton",function() {
         contadorNext= contadorNext-1;
        
         
     });
     
     
     
     
     
 });
