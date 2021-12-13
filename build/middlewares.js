"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoUpload = exports.avatarUpload = exports.publicOnlyMideelware = exports.protectorMiddleware = exports.localsMiddleware = void 0;

var _bcrypt = require("bcrypt");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  console.log(req.session.user);
  next();
};

exports.localsMiddleware = localsMiddleware;

var protectorMiddleware = function protectorMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Login First");
    return res.redirect("/login");
  }
};

exports.protectorMiddleware = protectorMiddleware;

var publicOnlyMideelware = function publicOnlyMideelware(req, res, next) {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

exports.publicOnlyMideelware = publicOnlyMideelware;
var avatarUpload = (0, _multer["default"])({
  dest: 'uploads/avatars/',
  limits: {
    fileSize: 30000000
  }
});
exports.avatarUpload = avatarUpload;
var videoUpload = (0, _multer["default"])({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000
  }
});
exports.videoUpload = videoUpload;