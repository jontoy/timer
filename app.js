const duration = document.querySelector('#duration');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const circle = document.querySelector('circle');
const P = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', P);

let offset;
let maxTime;
const myTimer = new Timer(duration, start, pause, {
    onStart(maxDuration) {
        maxTime = maxDuration;
    },
    onTick(timeRemaining) {
        offset = P * (timeRemaining / maxTime - 1);
        circle.setAttribute('stroke-dashoffset', offset);
    },
    onComplete() {

        circle.setAttribute('stroke-dashoffset', P);
    }

});
