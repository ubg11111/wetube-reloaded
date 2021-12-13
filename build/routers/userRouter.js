"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _nodemon = require("nodemon");

var _userControllers = require("../controllers/userControllers");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/logout", _middlewares.protectorMiddleware, _userControllers.logout);
userRouter.route("/edit").all(_middlewares.protectorMiddleware).get(_userControllers.getEdit).post(_middlewares.avatarUpload.single("avatar"), _userControllers.postEdit); // all 사용하면 어떤 http method를 사용하든 미들웨어를 사용하겠다는 의미 //

userRouter.route("/change-password").all(_middlewares.protectorMiddleware).get(_userControllers.getChangePassword).post(_userControllers.postChangePassword);
userRouter.get("/github/start", _middlewares.publicOnlyMideelware, _userControllers.startGithubLogin);
userRouter.get("/github/finish", _middlewares.publicOnlyMideelware, _userControllers.finishGithubLogin);
userRouter.get("/:id", _userControllers.see);
var _default = userRouter;
exports["default"] = _default;