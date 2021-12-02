import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");


// 전역변수인 let 생성하여 각 함수내에서 사용하게 끔 생성
let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
}

const downloadFile = (fileUrl, fileName) => {
  // 영상 저장 (MP4)
  const a = document.createElement("a");
  // a 링크는 videoFile 변수에 접근한 URL 파일을 정보를 가져옴
  a.href = fileUrl;
  // 다운로드 파일 이름 설정
  a.download = fileName;
  // 링크를 바디에 추가 바디에 존재하지 않는 링크는 클릭이 불가하여 추가함
  document.body.appendChild(a);
  a.click();
}

const handleDownload = async () => {

  actionBtn.removeEventListener("click", handleDownload);

  actionBtn.innerText = "Transcoding...";

  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true, corePath: "/static/ffmpeg-core.js" });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", files.input, "-r", "60", files.output,);

  await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb,);

  const mp4File = ffmpeg.FS("readFile", files.output,);

  const thumbFile = ffmpeg.FS("readFile", files.thumb,)

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });


  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob)

  // 영상 다운로드
  downloadFile(mp4Url, "MyRecording.mp4",);

  // 이미지 다운로드
  downloadFile(thumbUrl, "MyThumbnail.jpg",);


  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output,);
  ffmpeg.FS("unlink", files.thumb,);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);

};

const handleStart = () => {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);
  // recorder vailable 생성 함수내 생성된 변수는 함수내에서만 사용할 수 있음.
  // 외부 사용을 위해 let 외부변수로 생성하여 각 함수에서도 public(공유) 함.
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    // envent.data 리코딩 파일을 URL로 변환하여 URL을 전달 파일접근
    // 해당 URL은 브라우저 메모리상에 저장되어 있고 그것에 접근하는것
    videoFile = URL.createObjectURL(event.data);
    console.log(videoFile);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};


const init = async () => {
  // mediaDevices 카메라 오디오에 접근하는 액세스
  // getUserMedia 메소드를 사용하여 오디오,비디오 사용제어 가능
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
    video: {
      width: 1024,
      height: 576,
    },
  });
  // stream을 위해 srcObject를 연결하여 비디오재생 따라서 실시간 스트리밍됨
  video.srcObject = stream;
  video.play();
};

init();

actionBtn.addEventListener("click", handleStart);