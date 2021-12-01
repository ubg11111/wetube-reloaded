const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");


// 전역변수인 let 생성하여 각 함수내에서 사용하게 끔 생성
let stream;
let recorder;
let videoFile;


const handleDownload = () => {
  const a = document.createElement("a");
  // a 링크는 videoFile 변수에 접근한 URL 파일을 정보를 가져옴
  a.href = videoFile;
  // 다운로드 파일 이름 설정
  a.download = "MyRecording.webm";
  // 링크를 바디에 추가 바디에 존재하지 않는 링크는 클릭이 불가하여 추가함
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  // "Stop Recording 클릭시 Download Recroding 변경"
  startBtn.innerText = "Download Recording"
  // 예전 EventListener 제거 
  startBtn.removeEventListener("click", handleStop);
  // 새로운 EventListener 추가
  startBtn.addEventListener("click", handleDownload);
  // 그리고 버튼 클릭시 영상은 리코딩되고 녹화는 멈춤
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  // handleStart 함수에 새로운 버튼 Add 이벤트를 넣음 (stop)
  startBtn.addEventListener("click", handleStop);
  // recorder vailable 생성 함수내 생성된 변수는 함수내에서만 사용할 수 있음.
  // 외부 사용을 위해 let 외부변수로 생성하여 각 함수에서도 public(공유) 함.
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    // envent.data 리코딩 파일을 URL로 변환하여 URL을 전달 파일접근
    // 해당 URL은 브라우저 메모리상에 저장되어 있고 그것에 접근하는것
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};


const init = async () => {
  // mediaDevices 카메라 오디오에 접근하는 액세스
  // getUserMedia 메소드를 사용하여 오디오,비디오 사용제어 가능
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  // stream을 위해 srcObject를 연결하여 비디오재생 따라서 실시간 스트리밍됨
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);