/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Función de inicio de la app
 * 
 * @returns {undefined}
 */
function init() {
    eventRegistro();
    populateEnvioReserva();
    populateBorrarReserva();
    populateVerReserva();
}

/**
 * Populiza los inputs y las acciones de los botones en el formulario de creación de una reserva
 * 
 * @returns {undefined}
 */

/*document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
 console.log(navigator.notification);
 }*/

function populateEnvioReserva() {
    $("#registro").validate();

    /*  $("#datepicker").datepicker({
     inline: true,
     minDate: "today",
     maxDate: "+2M",
     dateFormat: 'yymmdd'
     });
     
     $("#datepicker2").datepicker({
     inline: true,
     minDate: "today",
     maxDate: "+2M",
     dateFormat: 'yyyymmdd'
     
     });
     
     $("#h_inicio").timepicker({
     inline: true,
     showMeridian: false,
     minuteStep: 30,
     showInputs: false,
     minTime: '7:00',
     maxTime: '18:00'
     });*/
    // DE AQUI
    // initialize input widgets first



    $('#jqueryExample .time ').timepicker({
        'showDuration': false,
        'showMeridian': 'false',
        'timeFormat': 'H:i',
        'use24hours': true,
        'minTime': '7:00',
        'maxTime': '19:00',
        toggleActive: true,
        inline: true,
        autoclose: true
    });

    $('#jqueryExample .date').datepicker({
        language: "es",
        toggleActive: true,
        inline: true,
        'startDate': "today",
        'endDate': "+2w",
        'format': 'dd/mm/yyyy',
        autoclose: true,
        'weekStart': 1,
        'daysOfWeekDisabled': [0, 6]
    });

    // initialize datepair
    $('#jqueryExample').datepair();
// A AQUI

    $("#botonDeCrear").click(function () {
        $("#horaDeInicio").val('');
        $("#horaDeFin").val('');
        $("#fechaDeInicio").val('');
    });

    $("#horaDeInicio").on('click', function () {
        $('#horaDeInicio').attr('readonly', true);
    });
    $("#horaDeInicio").on('mouseleave', function () {
        $('#horaDeInicio').attr('readonly', false);
    });

    $("#horaDeFin").click(function () {
        $('#horaDeFin').attr('readonly', true);
    });
    $("#horaDeFin").on('mouseleave', function () {
        $('#horaDeFin').attr('readonly', false);
    });

    $("#botonDeBorrar").click(function () {
        $("#listadoReservas").empty();
    });

    $("#botonDeBorrar").click(function () {
        $("#listadoReservas").empty();
    });

    $("#botonDeConsultar").click(function () {
        $("#listadoConsultas").empty();
    });

    $("#botonDeConsultar2").click(function () {
        $("#listadoConsultas").empty();
    });
    var nombresesion = localStorage.getItem('key');
    $("#modificaNombre").attr("placeholder", nombresesion).blur();

    $("#hacerFoto").click(function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 400,
            targetHeight: 500,
            sourceType: Camera.PictureSourceType.CAMERA
        });
    });
    $("#seleccionarFoto").click(function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 150,
            targetHeight: 150,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    });
    function onSuccess(imageURI) {
        
        var image = document.getElementById('image');
        image.src = imageURI;
        image.style.display = 'block';
        localStorage.setItem('imagen', imageURI);
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
    
     $("#botonActualizar").click(function () {
         var fto = localStorage.getItem('imagen');
         $("#actualizarFoto").attr("src",fto);
         alert(fto);
         $.mobile.changePage("#home");
     });
         

    /*  $("#botonDeConsultar").click(function () {
     $("#listadoConsultas").empty();
     });
     
     $("#botonDeConsultar2").click(function () {
     $("#listadoConsultas").empty();
     });*/

    $('#createReserva').submit(function (event) {
        event.preventDefault();
        var nuevaReserva = "http://192.168.1.150/api/v1/create_reserva";
        var horainicio = $("#horaDeInicio").val();
        var res2 = horainicio.split(":");
        var horaBuena = res2[0] + res2[1];
        var horafin = $("#horaDeFin").val();
        var res3 = horafin.split(":");
        var horaBuena2 = res3[0] + res3[1];
        var fechainicio = $("#fechaDeInicio").val();
        var res = fechainicio.split("/");
        var fechaBuena = res[2] + res[1] + res[0];
        var idrecurso = $('input:radio[name=plaza]:checked').val();
        var nombre = localStorage.getItem('key');
        var idusuario = localStorage.getItem('key2');
        var parse = parseInt(horaBuena);
        var horainicio1 = parse + 1;
        var cadena = horainicio1.toString();

        var cero = cadena[0];
        var horafinal = horainicio1;
        if (cero != 1) {
            horafinal = "0" + horainicio1;
        }

        $.getJSON(nuevaReserva, {
            id_usuario: idusuario,
            h_inicio: horafinal,
            h_fin: horaBuena2,
            f_inicio: fechaBuena,
            f_fin: fechaBuena,
            nombre_reserva: "Reserva de " + nombre,
            descripcion_reserva: "Ninguna",
            id_recurso: idrecurso
        }).done(function (resp) {


            if (resp.error == false) {


                navigator.notification.alert(resp.message);
                /// si la validacion es correcta, muestra la pantalla "home"
                $.mobile.changePage("#home");
            } else {
                navigator.notification.alert(resp.message);
            }
        });
    });
}

/**
 * Populiza las acciones del login y registro
 * 
 * @returns {undefined}
 */
function eventRegistro() {
    $('#registro').submit(function (event) {
        event.preventDefault();
        var registro = "http://192.168.1.150/api/v1/register";
        var nombreregistro = $("#nombreregistro").val();
        var usuarioregistro = $("#usuarioregistro").val();
        var contraregistro = $("#contraregistro").val();
        $.getJSON(registro, {
            email: usuarioregistro,
            password: contraregistro,
            name: nombreregistro
        }).done(function (resp) {

            if (resp.error == false) {
                navigator.notification.alert(resp.message);
                localStorage.setItem('key', resp.name);
                localStorage.setItem('key2', resp.id_usuario);
                /// si la validacion es correcta, muestra la pantalla "home"
                var nombre = resp.name;
                $('#bienvenida').html(nombre);
                $('#bienvenida').append("<img src='images/user.png'>");
                $.mobile.changePage("#home");
            } else {
                // $.mobile.changePage("#home")
                navigator.notification.alert(resp.message);
                /// ejecutar una conducta cuando la validacion falla
            }
        });
    });

    $('#login').submit(function (event) {
        event.preventDefault();
        var acceso = "http://192.168.1.150/api/v1/login";
        var nom = $("#usuario").val();
        var contra = $("#contra").val();
        $.getJSON(acceso, {
            email: nom,
            password: contra
        }).done(function (resp) {


            if (resp.error == false) {
                //alert(resp.message);
                localStorage.setItem('key', resp.name);
                localStorage.setItem('key2', resp.id_usuario);
                /// si la validacion es correcta, muestra la pantalla "home"
                //$.mobile.changePage("#home");
                var nombre = resp.name;
                $('#bienvenida').html(nombre);
                $('#bienvenida').append("<img src='images/user.png'>");
                $.mobile.changePage("#home");

            } else {
                // $.mobile.changePage("#home")

                //alert(resp.message);

                function alertDismissed() {

                    // $.mobile.changePage("#inicio"); // do something
                }
                navigator.notification.alert(
                        resp.message, // message
                        alertDismissed, // callback
                        'Error', // title
                        'Ok'                  // buttonName
                        );

                /// ejecutar una conducta cuando la validacion falla
            }
        });

    });
}

/**
 * Muestra las reservas del usuario
 * 
 * @returns {undefined}
 */

function populateBorrarReserva() {

    $('#botonDeBorrar').click(function (event) {
        //$(location).attr('href','#borrarReserva');
        $.mobile.changePage("#borrarReserva", {
            transition: "slide",
            reverse: true
        });

        event.preventDefault();
        var reservasPropias = "http://192.168.1.150/api/v1/reservas_usuario";
        var nombreusuario = localStorage.getItem('key');
        var idusuario = localStorage.getItem('key2');
        //var fecha = $("#datepicker2").val();
        var f = new Date();
        var MyDateString;
        MyDateString = (f.getFullYear() + "" + ('0' + (f.getMonth() + 1)).slice(-2) + "" + ('0' + f.getDate()).slice(-2));
        $.getJSON(reservasPropias, {
            id_usuario: idusuario,
            fecha: MyDateString
        }).done(function (resp) {
            if (resp.error == false) {
                var html = "";
                var varId = "";
                var j = 0;

                if (resp.reservas == null) {
                    $("#listadoReservas").append("No hay reservas a nombre de " + nombreusuario + ". ");
                }
                else {

                    $.each(resp.reservas, function (i, val) {

                        console.log(val);
                        cadena = resp.reservas[i].h_inicio;
                        var res = cadena.split("");
                        var formatoHora = res[0] + res[1] + ":" + res[2] + "0";
                        cadena3 = resp.reservas[i].h_fin;
                        var res3 = cadena3.split("");
                        var formatoHora2 = res3[0] + res3[1] + ":" + res3[2] + res3[3];
                        cadena2 = resp.reservas[i].f_inicio;
                        var res2 = cadena2.split("");
                        var formatoFecha = res2[6] + res2[7] + "/" + res2[4] + res2[5] + "/" + res2[0] + res2[1] + res2[2] + res2[3];
                        var nombrePlaza = "";
                        if (resp.reservas[i].id_recurso == 0)
                            nombrePlaza = " 2ª planta.";
                        else
                            nombrePlaza = " 4ª planta.";


                        varId = resp.reservas[i].id_reserva;
                        html += "<label  id='" + varId + "' onClick='eliminarReserva(" + varId + ")' class='button alt big icon fa-arrow-circle-right' >" + resp.reservas[i].nombre_reserva + " en la " + nombrePlaza + "</br>&nbsp;&nbsp;&nbsp;&nbsp; Hora: " + formatoHora + " - " + formatoHora2 + "</br>&nbsp;&nbsp;&nbsp;&nbsp; Día: " + formatoFecha + "</label>";
                        j++;
                    });

                    $("#listadoReservas").append(html);

                }
            } else {
                // $.mobile.changePage("#home")
                alert(resp.message);
                /// ejecutar una conducta cuando la validacion falla
            }

        });

    });
}

/**
 * Consultar las reservas
 *
 *
 **/

function populateVerReserva() {
    $('#consultas').submit(function (event) {
        event.preventDefault();
        var reservasPropias = "http://192.168.1.150/api/v1/reservas_fecha";
        var fecha = $("#DiaConsulta").val();
        var res = fecha.split("/");
        var fechaBuena = res[2] + res[1] + res[0];
        $.getJSON(reservasPropias, {
            fecha: fechaBuena
        }).done(function (resp) {
            if (resp.error == false) {
                var html = "";
                var varId = "";
                var j = 0;
                if (resp.reservas == null) {
                    alert("Hola");

                }
                else {
                    $.each(resp.reservas, function (i, val) {

                        console.log(val);
                        cadena = resp.reservas[i].h_inicio;
                        var res = cadena.split("");
                        var formatoHora = res[0] + res[1] + ":" + res[2] + "0";
                        cadena3 = resp.reservas[i].h_fin;
                        var res3 = cadena3.split("");
                        var formatoHora2 = res3[0] + res3[1] + ":" + res3[2] + res3[3];
                        cadena2 = resp.reservas[i].f_inicio;
                        var res2 = cadena2.split("");
                        var formatoFecha = res2[6] + res2[7] + "/" + res2[4] + res2[5] + "/" + res2[0] + res2[1] + res2[2] + res2[3];
                        var nombrePlaza = "";
                        if (resp.reservas[i].id_recurso == 0)
                            nombrePlaza = " 2ª planta.";
                        else
                            nombrePlaza = " 4ª planta.";


                        varId = resp.reservas[i].id_reserva;
                        html += "<center><label  id='" + varId + "' class='alert alert-info' role='alert' >" + resp.reservas[i].nombre_reserva + " en la " + nombrePlaza + "</br> Hora: " + formatoHora + " - " + formatoHora2 + "</br> Día: " + formatoFecha + "</label></center>";
                        j++;
                    });


                    /*  alert($("#Checkbox1").val());
                     $("#Checkbox1").prop("checked", true); */

                    $("#listadoConsultas").append(html);
                }

            }
            else {
                $("#listadoConsultas").append(" No hay ninguna reserva el " + fecha + ". <br><br>");
            }
        });

    });
}


/**
 * Elimina la reserva
 * 
 * @returns {undefined}
 */
function eliminarReserva(varId) {

    //alert('You selected button ' + buttonIndex);


    navigator.notification.confirm(
            '¿Seguro que quieres eliminar tu reserva?', // message
            onConfirm, // callback to invoke with index of button pressed
            'Confirma', // title
            ['Aceptar', 'Cancelar']     // buttonLabels
            );
    // var r = confirm("¿Seguro que quieres eliminar tu reserva?");
    function onConfirm(buttonIndex) {
        if (buttonIndex == 1) {
            var borrarReservas = "http://192.168.1.150/api/v1/delete_reserva";
            var idReserva = varId;
            $.getJSON(borrarReservas, {
                id_reserva: idReserva
            }).done(function (resp) {

                if (resp.borrado == true) {

                    $("#listadoReservas").append("Reserva borrada correctamente. ");


                    /// si la validacion es correcta, muestra la pantalla "home"
                    $.mobile.loadPage("#borrarReserva");
                } else {
                    // $.mobile.changePage("#home")
                    alert("No se pudo borrar la reserva");
                    /// ejecutar una conducta cuando la validacion falla
                }
            });
        }
    }
}

/*function cambiaFoto() {
 $('#fotoPerfil').click(function () {
 
 navigator.camera.getPicture(onSuccess, onFail, {
 quality: 50,
 destinationType: Camera.DestinationType.DATA_URL
 });
 
 function onSuccess(imageData) {
 var image = document.getElementById('image');
 image.src = "data:image/jpg;base64," + imageData;
 image.style.display = 'block';
 }
 
 function onFail(message) {
 alert('Failed because: ' + message);
 }
 
 
 });
 }*/

/**
 * Desconecta al usuario
 * 
 * @returns {undefined}
 */
function borrarSesion() {

    localStorage.removeItem('key');
    localStorage.removeItem('key2');
    localStorage.removeItem('imagen');

}

