exports.formatDateDia = function(date) {
    var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "May0", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

exports.formatDateNormal = function(date) {
    var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "May0", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}