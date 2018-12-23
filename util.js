function dayOf(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return [year, month, day].join("-")
}

function format(mins, secs) {
    return mins + " : " + secs;
}
module.exports.dayOf = dayOf;
module.exports.format = format;