(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { addMessage, makeUppercase, function3, function4, onConversation } from './lib/function_category1'
// export { addMessage, makeUppercase, function3, function4, onConversation }
var conversationFunction_1 = __webpack_require__(3);
exports.onConversation = conversationFunction_1.onConversation;
exports.apiAiResponse = conversationFunction_1.apiAiResponse;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var functions = __webpack_require__(0);
var index_1 = __webpack_require__(4);
var request = __webpack_require__(5);
var bookedSlots = [];
exports.onConversation = functions.database.ref('/conversation/{uid}/{pushId}')
    .onWrite(function (event) {
    var data = event.data.val();
    if (data != null) {
        if (data.name !== 'Bot') {
            // console.log("uid", event.params.uid)
            // console.log("messages", data.text)
            // console.log("messages", event.params.pushId)
            var options = {
                url: 'https://api.api.ai/api/query?v=20150910&query=' + data.text + '&lang=en&sessionId=' +
                    event.params.uid + '&timezone=2017-03-24T21:10:33+0500',
                headers: {
                    'Authorization': 'Bearer 63bef7d0e4464fe7bc918fc9a4e1c827'
                }
            };
            // getting reserved slots from data base
            // db.ref('/CDGKreservedSlotsList/').on('child_added', (snapshot) => {
            //     // console.log('parking data', snapshot.val())
            //     this.bookedSlots.push(snapshot.val())
            // });
            // sendMessageInDatabase(data, event)
            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // botReply.message = JSON.parse(body.result.fulfillment.speech);
                    response = JSON.parse(body);
                    console.log('user msg & bot reply', data.text, response.result.fulfillment.speech);
                    var time = new Date().getTime();
                    index_1.default.ref('/conversation/' + event.params.uid + '/').push({
                        name: 'Bot',
                        imageUrl: '../assets/images/bot.jpg',
                        text: response.result.fulfillment.speech,
                        timestamp: time
                    });
                }
            });
        }
    }
});
function sendMessageInDatabase(data, event) {
    var options = {
        // tslint:disable-next-line:max-line-length
        url: 'https://api.api.ai/api/query?v=20150910&query=' + data.text + '&lang=en&sessionId=' + event.params.uid + '&timezone=2017-03-24T21:10:33+0500',
        headers: {
            'Authorization': 'Bearer 63bef7d0e4464fe7bc918fc9a4e1c827'
        }
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            response = JSON.parse(body);
            console.log('user msg & bot reply', data.text, response.result.fulfillment.speech);
            var time = new Date().getTime();
            index_1.default.ref('/conversation/' + event.params.uid + '/').push({
                name: 'Bot',
                imageUrl: '../assets/images/bot.jpg',
                text: response.result.fulfillment.speech,
                timestamp: time
            });
        }
    });
}
// check the action of api.ai
exports.apiAiResponse = functions.https.onRequest(function (requestt, response) {
    switch (requestt.body.result.action) {
        case 'booking':
            bookingSlot(requestt, response);
            break;
        default:
            response.send({ 'speech': 'Unknown Action: ' + request.action });
    }
    // console.log('parameters', requestt.body.result.parameters)
    response.send({
        'speech': 'Parameters: ' + JSON.stringify(requestt.body.result.parameters)
    });
});
// tslint:disable-next-line:no-shadowed-variable
function bookingSlot(request, response) {
    var date = request.body.result.parameters.date;
    var time = request.body.result.parameters.time;
    var hours = request.body.result.parameters.hours;
    validation(date, time, hours);
}
function validation(date, time, reservedHours) {
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var functions = __webpack_require__(0);
var admin = __webpack_require__(1);
var defaultApp = admin.initializeApp(functions.config().firebase);
var db = admin.database();
exports.default = db;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ })
/******/ ])));