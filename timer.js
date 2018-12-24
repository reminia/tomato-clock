const util = require('./util.js')

class TimerService {
    constructor($dom, minutes = 25, endCallback) {
        this.$dom = $dom
        this.minutes = minutes
        this.endCallback = endCallback;
        const Timer = require('easytimer.js').Timer;
        this.clock = new Timer();
        this.stopped = false;
        this.paused = false;
        $dom.text(util.format(minutes, "00"));
    }
    start() {
        if (this.paused) {
            this.clock.start();
        } else {
            this.clock.start({
                startValues: { minutes: this.minutes, seconds: 0 },
                targetValues: { minutes: 0, seconds: 0 },
                countdown: true,
                precision: "seconds",
                callback: (timer) => {
                    let time = timer.getTimeValues();
                    let value = util.format(time.minutes, time.seconds)
                    this.$dom.text(value);
                }
            });
            this.clock.addEventListener("targetAchieved", timer => {
                this.endCallback(timer);
                this.paused = false;
                this.stopped = true;
            });
        }
    }
    stop() {
        this.clock.stop();
        this.stopped = true;
    }
    pause() {
        this.clock.pause();
        this.paused = true;
    }
    reset() {
        this.clock.reset();
    }
}
module.exports = TimerService;