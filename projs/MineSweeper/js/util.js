console.log('i am util');

//WORKS BETTER THAN MINE

function getTime() {
    gState.secsPassed++;
    var mins = 0;
    var secs = 0;
    var hours = '00'
    secs = pad(gState.secsPassed % 60);
    mins = pad(parseInt(gState.secsPassed / 60));
    if (mins > 60) {
        hours = pad(parseInt(mins / 60));
        mins = pad(mins % 60);
    }
    var elTime = document.querySelector('.time');
    elTime.innerHTML = hours + ':' + mins + ':' + secs;

}

function pad(val) {
    //CR: not a good func name. maybe use numToStr?
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


// function getTime() {

//     gState.secsPassed++;

//     var hours = Math.floor(gState.secsPassed / 3600);
//     var mins = Math.floor((gState.secsPassed - hours * 3600) / 60);
//     var secs = Math.floor(gState.secsPassed - (hours * 3600 + mins / 60));

//     if (secs <= 9) secs = '0' + secs;
//     if (hours <= 9) hours = '0' + hours;
//     if (mins <= 9) mins = '0' + mins;
//     if (secs >= 60) secs = secs % 60;
//     var elTime = document.querySelector('.time');
//     elTime.innerHTML = hours + ':' + mins + ':' + secs;
// }



