let video = document.querySelector('video')

let playBtn = document.querySelector('.playBtn')

let liveBtn = document.querySelector('.liveBtn')



document.body.click()



let vid_duration = 0
video.onloadedmetadata = function(e) {
    var dimensions = [video.videoWidth, video.videoHeight];
    // alert(dimensions);
    streamer()
    vid_duration = video.duration




}




console.log();
video.onclick = () => console.log("woza");



let vid_status = fetch('http://localhost:3000/started').then(res => {
    res = res.json()
    return res
}).then(res => {
    // console.log(res);
    return res
})


function startLive() {
    let date = new Date()
    let startTime = date.getTime()
    console.log("Start Time: " + startTime);
    let updStatus = {
        started: startTime,
        playing: true

    }


    fetch('http://localhost:3000/stream', {
        method: 'POST',
        body: JSON.stringify(updStatus),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    console.log(updStatus);
}




async function streamer() {
    let date = new Date
    let streamerTime = date.getTime()
    let data = await vid_status
    let { started, playing } = data
    console.log(video.duration);

    console.log(data);
    if (!started) {
        liveBtn.style = 'display:none'
        playBtn.addEventListener('click', startLive)
    } else {
        liveBtn.style = 'display:block'
        let eludedTime = (streamerTime - started) / 1000 + 0.5
        console.log(eludedTime);
        video.currentTime = eludedTime
        video.muted = false
        video.play()
    }



}


liveBtn.addEventListener('click', () => {
    streamer()
    video.play()
        // console.log(Woza);
})

playBtn.addEventListener('click', () => {

    let paused = video.paused
    console.log(paused);
    if (paused) {

        video.play()
        playBtn.innerText = 'pause'

    } else {

        video.pause()
        playBtn.innerText = 'play'

    }

})