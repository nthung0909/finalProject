module.exports = {
    getDateTime: (date) => {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return '' + day + '/' + month + '/' + year;
    }
}