"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById("videoContainer");
var videoId = videoContainer.dataset.id;
var videoComments = document.querySelector(".video__comments ul");
var form = document.getElementById("commentForm");

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var textarea, text, response, _yield$response$json, newCommentId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            textarea = form.querySelector("textarea");
            text = textarea.value;

            if (!(text === "")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            _context.next = 7;
            return fetch("/api/videos/".concat(videoId, "/comment"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text: text
              })
            });

          case 7:
            response = _context.sent;

            if (!(response.status === 201)) {
              _context.next = 15;
              break;
            }

            textarea.value = "";
            _context.next = 12;
            return response.json();

          case 12:
            _yield$response$json = _context.sent;
            newCommentId = _yield$response$json.newCommentId;
            addComment(text, newCommentId);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

var addComment = function addComment(text, newCommentId) {
  var newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = newCommentId;
  var icon = document.createElement("i");
  icon.className = "fas fa-comment";
  var span = document.createElement("span");
  span.innerText = " ".concat(text);
  var span2 = document.createElement("span");
  span2.className = "deleteBtn";
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

var handleDeleteComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var li, commentId, _yield$fetch, status;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(event.target.className !== "deleteBtn")) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            li = event.target.closest("li");
            commentId = li.dataset.id;
            _context2.next = 6;
            return fetch("/api/videos/".concat(videoId, "/comment/").concat(commentId), {
              method: "DELETE"
            });

          case 6:
            _yield$fetch = _context2.sent;
            status = _yield$fetch.status;

            if (status === 200) {
              videoComments.removeChild(li);
            } else {
              alert("Could not remove the comment.");
            }

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDeleteComment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

videoComments.addEventListener("click", handleDeleteComment);

if (form) {
  form.addEventListener("submit", handleSubmit);
}