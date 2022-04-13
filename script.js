let video = document.getElementById("video")
let playPause = document.getElementById('playPause')
let currentTime = document.getElementById('currentTime')
let totalTime = document.getElementById('totalTime')
let minus10 = document.getElementById('minus10')
let plus10 = document.getElementById('plus10')
let mute = document.getElementById('mute')
let volumeRocker = document.getElementById('volumeRocker')
let fullScreen = document.getElementById('fullScreen')
let progressBar = document.getElementById('progressBar')
let bar = document.getElementById('bar')
let container = document.getElementsByClassName('container')[0]

function playP(){
    if(video.paused) {
      video.play()
      playPause.src = "imagens/pause.png"
    } else {
      video.pause()
      playPause.src = "imagens/play.png"
    }
  }
  
  video.addEventListener('click', playP)

playPause.addEventListener('click', playP)


  minus10.addEventListener('click', function(){
      video.currentTime -= 10
  })


  plus10.addEventListener('click', function(){
      video.currentTime +=10
  })

  function full() {
  (video.requestFullscreen) 
    video.requestFullscreen();
  } 

  fullScreen.addEventListener('click', full)
  
  video.addEventListener('dblclick', full)

// separação de como ira mostrar os números na tela

function convertHMS(value) {
  const sec = parseInt(value, 10);
  let hours   = Math.floor(sec / 3600); 
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = sec - (hours * 3600) - (minutes * 60);
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  if(hours == 0) {
    return minutes+':'+seconds;
  } else {
    return hours+':'+minutes+':'+seconds;
  }
}
video.addEventListener('loadeddata',function() {
  let dur = convertHMS(video.duration)
  volumeRocker.value = video.volume * 100
  currentTime.innerHTML = convertHMS(video.currentTime)
  totalTime.innerHTML = dur
  getVideoDimensions()
})
volumeRocker.addEventListener('input', function(){
  video.volume = (volumeRocker.value / 100)
  if(video.volume > 0.5) {
    mute.src = "./imagens/volumeUp.png"  
  } else if (video.volume == 0){
    mute.src = "./imagens/mute.png"  
  } else {
    mute.src = "./imagens/volumeDown.png"  
  }
})

mute.addEventListener('click', function(){
  if(video.muted) {
    video.muted = false
    if(video.volume > 0.5) {
      mute.src = "./imagens/volumeUp.png"  
    } else {
      mute.src = "./imagens/volumeDown.png"  
    }
  } else {
    video.muted = true
    mute.src = "./imagens/mute.png"
  }
})

//Para o primeiro número começar a ser responsivo de acordo com o tempo do video

function calcWidth () {
  let total = video.duration
  let actual = video.currentTime
  let width = ((actual) / total) * 100
  return width
}

video.addEventListener('timeupdate', function(){
  currentTime.innerHTML = convertHMS(video.currentTime)
  progressBar.value = calcWidth()*10
  bar.style.width = `${calcWidth()}%`
})


progressBar.addEventListener('input', function(){
  let actual = progressBar.value/10
  video.currentTime = video.duration * (actual/100)
})


