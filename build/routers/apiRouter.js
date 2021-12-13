"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoControllers = require("../controllers/videoControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", _videoControllers.registerview);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", _videoControllers.createComment);
apiRouter["delete"]("/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})", _videoControllers.deleteComment);
var _default = apiRouter;
exports["default"] = _default;