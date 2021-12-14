"use strict";

require("regenerator-runtime");

require("dotenv/config");

require("./db");

require("./models/Video");

require("./models/User");

require("./models/Comment");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 3000;

var handleInSever = function handleInSever() {
  return console.log("\u2705\uB2F9\uC2E0\uC740 ".concat(PORT, "\uD3EC\uD2B8 \uC11C\uBC84\uC5D0 \uC811\uC18D\uD558\uC168\uC2B5\uB2C8\uB2E4."));
};

_server["default"].listen(PORT, handleInSever);

