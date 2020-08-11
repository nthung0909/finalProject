// (function($) {
//     $('.datepicker').datepicker({
//         format: 'mm/dd/yyyy',
//         startDate: '-3d'
//     });
// });
$(function (){
    $('#datepicker').datetimepicker({
        timepicker : false,
        datepicker : true,
        format : 'y-m-d',
        value :'2019-5-8',
        weeks : true
    })
})

