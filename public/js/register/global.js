(function($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click', function() {
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker', function(ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click', function(e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click', function(e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function(e) {
            e.stopPropagation();
        });


    } catch (er) { console.log(er); }
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function() {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }


})(jQuery);

function validate() {
    var psw = document.forms["register"]["password"].value;
    var cfpsw = document.forms["register"]["confirmpassword"].value;
    var email = document.forms["register"]["email"].value;
    var firstName = document.forms["register"]["firstname"].value;
    var lastName = document.forms["register"]["lastname"].value;
    var username = document.forms["register"]["username"].value;
    console.log(psw, confirm, email);
    if (firstName === "") {
        document.getElementById("firstname").style.border = "solid 0.5px red";
        $("#firstname").focus();
        return false;
    } else {
        document.getElementById("firstname").style.border = "none";
    }
    if (lastName === "") {
        document.getElementById("lastname").style.border = "solid 0.5px red";
        $("#lastname").focus();
        return false;
    } else
        document.getElementById("lastname").style.border = "none";
    if (email === "") {
        document.getElementById("email").style.border = "solid 0.5px red";
        $("#email").focus();
        return false;
    } else
        document.getElementById("email").style.border = "none";
    if (username === "") {
        document.getElementById("username").style.border = "solid 0.5px red";
        $("#username").focus();
        return false;
    } else
        document.getElementById("username").style.border = "none";
    if (psw.length < 6) {
        document.getElementById("password").style.border = "solid 0.5px red";
        $("#password").focus();
        return false;
    } else
        document.getElementById("password").style.border = "none";
    if (psw !== cfpsw) {
        document.getElementById("confirmpassword").style.border = "solid 0.5px red";
        $("#confirmpassword").focus();
        return false;
    } else
        document.getElementById("confirmpassword").style.border = "none";
    return true;
}