"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = require("../controllers/userControllers.js");

var _videoControllers = require("../controllers/videoControllers.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _videoControllers.home);
rootRouter.route("/join").all(_middlewares.publicOnlyMideelware).get(_userControllers.getjoin).post(_userControllers.postjoin);
rootRouter.route("/login").all(_middlewares.publicOnlyMideelware).get(_userControllers.getLogin).post(_userControllers.postLogin);
rootRouter.get("/search", _videoControllers.search);
var _default = rootRouter;
exports["default"] = _default;