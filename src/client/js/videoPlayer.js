const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");


let volumeValue = 0.5;
video.volume = volumeValue;


// handlePlayClick 함수생성 조건문 paused(멈춤) 플레이 조정
const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute"
  volumeRange.value = video.muted ? 0 : volumeValue;
}

// 핸들볼륨체인지 이벤트값을 타겟으로 비디오 볼륨을 지정하여 이벤트로 활성화
// video.vloume = 0.5; 할당값을 기본으로 이벤트실행
const handleVolumeChange = (event) => {
  const { target: { value } } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
}

const handleLoadedMetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = Math.floor(video.currentTime);
  console.log(video.currentTime);
}

// 비디오재생 클릭 이벤트
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);