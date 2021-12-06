const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i"); // 첫번째 "i" 쿼리를 가져옴
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const textarea = document.querySelector("#commentForm");

let controlsTimeout = null;
let constrolsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;




// 포맷타임변수에 세컨드 어규먼트를 적용 new Date 이벤트를 각초에 * 1000ms 적용하여 초를 문자식으로 변환 substr을 통해 노출할 필요 문자열을 잘라 가져옴
const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5)


// handlePlayClick 함수생성 조건문 paused(멈춤) 플레이 조정
const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

// 핸들볼륨체인지 이벤트값을 타겟으로 비디오 볼륨을 지정하여 이벤트로 활성화
// video.vloume = 0.5; 할당값을 기본으로 이벤트실행

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
}

const handleTimelineChange = (event) => {
  const { target: { value }, } = event;
  video.currentTime = value;
}

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (constrolsMovementTimeout) {
    clearTimeout(constrolsMovementTimeout);
    constrolsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  constrolsMovementTimeout = setTimeout(hideControls, 3000)
}

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};


// switch 조건문을 사용하여 각 케이스마다 이벤트키입력 처리
const handleKeyPress = (event) => {
  switch (event.keyCode) {
    case 32:
      handlePlayClick();
      event.preventDefault();
      break;
    case 77 || 109: // 77(M) or 109(m) 둘중 하나라도 트루이면 작동
      handleMuteClick();
      break;
    case 70 || 102:
      handleFullScreen();
      break;
    case 37:
      video.currentTime -= 5;
      break;
    case 39:
      video.currentTime += 5;
      break;
  }
  handleMouseMove(); // 버튼을 입력할때 shohwing Class 추가
};

// video.puased 비디오가 멈춤이 true이면 handelPlayClick 적용
// false일때 else문 적용
const handleMouseClick = () => {
  if (video.paused) {
    handlePlayClick();
  } else {
    handlePlayClick();
  }
}

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};


// 비디오재생 클릭 이벤트
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
//코드 챌린지 스페이스바를 누르면 플레이 재생. 한번더 누르면 일시정지
// document 외부 이벤트를 연결 keypress(누르고만 있을 때) keydown은 전체키 적용
document.addEventListener("keydown", handleKeyPress);
// 비디오 화면을 클릭 할때 플레이재생. 한번더 누르면 일시정지
video.addEventListener("click", handleMouseClick);


