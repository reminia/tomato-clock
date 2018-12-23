function dayOf(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return [year, month, day].join("-")
}

module.exports.dayOf=dayOf