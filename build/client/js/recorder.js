"use strict";

var _ffmpeg = require("@ffmpeg/ffmpeg");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var actionBtn = document.getElementById("actionBtn");
var video = document.getElementById("preview"); // 전역변수인 let 생성하여 각 함수내에서 사용하게 끔 생성

var stream;
var recorder;
var videoFile;
var files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg"
};

var downloadFile = function downloadFile(fileUrl, fileName) {
  // 영상 저장 (MP4)
  var a = document.createElement("a"); // a 링크는 videoFile 변수에 접근한 URL 파일을 정보를 가져옴

  a.href = fileUrl; // 다운로드 파일 이름 설정

  a.download = fileName; // 링크를 바디에 추가 바디에 존재하지 않는 링크는 클릭이 불가하여 추가함

  document.body.appendChild(a);
  a.click();
};

var handleDownload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var ffmpeg, mp4File, thumbFile, mp4Blob, thumbBlob, mp4Url, thumbUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actionBtn.removeEventListener("click", handleDownload);
            actionBtn.innerText = "Transcoding...";
            actionBtn.disabled = true;
            ffmpeg = (0, _ffmpeg.createFFmpeg)({
              log: true,
              corePath: "/static/ffmpeg-core.js"
            });
            _context.next = 6;
            return ffmpeg.load();

          case 6:
            _context.t0 = ffmpeg;
            _context.next = 9;
            return (0, _ffmpeg.fetchFile)(videoFile);

          case 9:
            _context.t1 = _context.sent;

            _context.t0.FS.call(_context.t0, "writeFile", "recording.webm", _context.t1);

            _context.next = 13;
            return ffmpeg.run("-i", files.input, "-r", "60", files.output);

          case 13:
            _context.next = 15;
            return ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb);

          case 15:
            mp4File = ffmpeg.FS("readFile", files.output);
            thumbFile = ffmpeg.FS("readFile", files.thumb);
            mp4Blob = new Blob([mp4File.buffer], {
              type: "video/mp4"
            });
            thumbBlob = new Blob([thumbFile.buffer], {
              type: "image/jpg"
            });
            mp4Url = URL.createObjectURL(mp4Blob);
            thumbUrl = URL.createObjectURL(thumbBlob); // 영상 다운로드

            downloadFile(mp4Url, "MyRecording.mp4"); // 이미지 다운로드

            downloadFile(thumbUrl, "MyThumbnail.jpg");
            ffmpeg.FS("unlink", files.input);
            ffmpeg.FS("unlink", files.output);
            ffmpeg.FS("unlink", files.thumb);
            URL.revokeObjectURL(mp4Url);
            URL.revokeObjectURL(thumbUrl);
            URL.revokeObjectURL(videoFile);
            actionBtn.disabled = false;
            actionBtn.innerText = "Record Again";
            actionBtn.addEventListener("click", handleStart);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleDownload() {
    return _ref.apply(this, arguments);
  };
}();

var handleStart = function handleStart() {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart); // recorder vailable 생성 함수내 생성된 변수는 함수내에서만 사용할 수 있음.
  // 외부 사용을 위해 let 외부변수로 생성하여 각 함수에서도 public(공유) 함.

  recorder = new MediaRecorder(stream, {
    mimeType: "video/webm"
  });

  recorder.ondataavailable = function (event) {
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
  setTimeout(function () {
    recorder.stop();
  }, 5000);
};

var init = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return navigator.mediaDevices.getUserMedia(_defineProperty({
              audio: false,
              video: true
            }, "video", {
              width: 1024,
              height: 576
            }));

          case 2:
            stream = _context2.sent;
            // stream을 위해 srcObject를 연결하여 비디오재생 따라서 실시간 스트리밍됨
            video.srcObject = stream;
            video.play();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function init() {
    return _ref2.apply(this, arguments);
  };
}();

init();
actionBtn.addEventListener("click", handleStart);