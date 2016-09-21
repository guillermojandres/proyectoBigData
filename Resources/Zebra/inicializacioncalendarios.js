/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



        $('#dgplusbellebundle_personatratamiento_fechaVenta').Zebra_DatePicker({
            months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            direction:true,
            show_clear_date:false,
            show_select_today: "Hoy",
            default_position: "below",
            offset:[-142,40]
        });
        
        

        $('#dgplusbellebundle_cita_fechaCita').Zebra_DatePicker({
            months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            direction:true,
            format: 'd-m-Y',
            show_clear_date:false,
            show_select_today: "Hoy",
            default_position: "below",
            offset:[-142,40]
        });
        
        
        $('#fecha').Zebra_DatePicker({
            months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            
            show_clear_date:false,
            show_select_today: "Hoy",
            default_position: "below",
            offset:[-142,40]
        });
        
        
        $('.calZebra').Zebra_DatePicker({
            months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            format: 'd-m-Y',
            show_clear_date:false,
            show_select_today: "Hoy",
        });


        $('#fecha-inicio').Zebra_DatePicker({
            months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            format: 'd-m-Y',
            show_clear_date:false,
            show_select_today: "Hoy",
            onSelect: function(){
                $('#fecha-fin').val('');
                anioInicioUser = $('#fecha-inicio').val();
                    
            },
            onClear: function(){
                $('canvas').remove();
            },
            pair: $('#fecha-fin')
        });
            
        $('#fecha-fin').Zebra_DatePicker({
            months:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            direction: true,
            format: 'd-m-Y',
            show_clear_date:false,
            show_select_today: false,
            onSelect: function(){
                if(anioInicioUser!==""){
                    var aniofinUser = $('#fecha-fin').val();
                    var url = "{{ path('admin_reporte_consolidado_grafico') }}";
                    url+="?anioInicioUser="+anioInicioUser+"&anioFinUser="+aniofinUser;
                    $('#contenedorGrafico').load(url);
                            //myLineChart.update();    
                }
            }
        });

        
