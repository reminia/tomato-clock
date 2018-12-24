let DBService = require('./db.js')
let util = require('./util.js')
let TimerService = require('./timer.js')

let $ = require("jquery");
let $tomatoes = $('#tomatoes');
let $count = $("#summary .total");

let tomatoImg = '<img src="tomato.ico" class="tomato"></img>'
let dbService = new DBService();
dbService
    .list(util.dayOf(new Date()))
    .then(docs => {
        docs.forEach(doc => $tomatoes.append(tomatoImg));
        $count.text(docs.length);
    });

let music = $('#music').get(0); //use dom element not jquery element
let $start = $('#start');
let $pause = $('#pause');
let $clock = $('#clock');
let timer = new TimerService($clock, 25, endCallback);

$start.click(function () {
    console.log('start');
    music.play();
    timer.start();
});

$pause.click(function () {
    console.log('pause');
    music.pause();
    timer.pause();
});

function endCallback(timer) {
    music.pause();
    $tomatoes.append(tomatoImg);
    $count.text($tomatoes.find('img').length);
    const date = new Date();
    const tomato = {
        _id: date,//tomato add time
        day: util.dayOf(date),
        desc: "A tomato",
        duration: 25
    };
    dbService.add(tomato);
}