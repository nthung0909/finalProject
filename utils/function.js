module.exports = {
    getDateTime: (date) => {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        //console.log('' + day + '/' + month + '/' + year);
        return '' + month + '/' + day + '/' + year;
    }
}