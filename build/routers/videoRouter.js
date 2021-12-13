"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoControllers = require("../controllers/videoControllers.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.route("/:id([0-9a-f]{24})").get(_videoControllers.watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.protectorMiddleware).get(_videoControllers.getEdit).post(_videoControllers.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(_middlewares.protectorMiddleware).get(_videoControllers.deleteVideo);
videoRouter.route("/upload").all(_middlewares.protectorMiddleware).get(_videoControllers.getUpload).post(_middlewares.videoUpload.fields([{
  name: "video"
}, {
  name: "thumb"
}]), _videoControllers.postUpload);
var _default = videoRouter;
exports["default"] = _default;