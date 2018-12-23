const DBService = require('./db.js')
const util = require('./util.js')

let $ = require("jquery");
const tomatoes = $('#tomatoes');
let $count = $("#summary .total");

let dbService = new DBService();
dbService
    .list(util.dayOf(new Date()))
    .then(docs => {
        docs.forEach(doc => tomatoes.append("<p class='tomato'>" + doc.desc + "</p>"));
        $count.text(docs.length);
    });

var music = $('#music').get(0); //use dom element not jquery element
var start = $('#start');
var stop = $('#stop');
var clock = $('#clock');
var t;
start.click(function () {
    console.log('start');
    music.play();
    count(25);
});
function count(time) {
    clock.text(time);
    if (time == 0) {
        music.pause();
        clearTimeout(t);
        tomatoes.append("<p class='tomato'>a tomato</p>");
        $count.text(tomatoes.find('p').length);
        const date = new Date();
        const tomato = {
            _id: date,//tomato add time
            day: util.dayOf(date),
            desc: "A tomato",
            duration: 25
        }
        dbService.add(tomato)
        return;
    }
    time -= 1;
    t = setTimeout(count, 60000, time);
}
stop.click(function () {
    console.log('stop');
    music.pause();
    clearTimeout(t);
});