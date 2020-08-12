module.exports = {
    getDateTime: (date) => {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        year = year.length === 1 ? 0 + year : year;
        day = day.length === 1 ? 0 + day : day;
        return day + '/' + month + '/' + year;
    }
}