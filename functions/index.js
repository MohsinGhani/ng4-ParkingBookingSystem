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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { addMessage, makeUppercase, function3, function4, onConversation } from './lib/function_category1'
// export { addMessage, makeUppercase, function3, function4, onConversation }
var conversationFunction_1 = __webpack_require__(2);
exports.onConversation = conversationFunction_1.onConversation;
exports.apiAiResponse = conversationFunction_1.apiAiResponse;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var functions = __webpack_require__(0);
var index_1 = __webpack_require__(3);
var moment = __webpack_require__(5);
var request = __webpack_require__(6);
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
            //     this.reservedSlotsCDGK.push(snapshot.val())
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
});
function bookingSlot(request, response) {
    var date = request.body.result.parameters.date;
    var startTime = request.body.result.parameters.startTime;
    var endTime = request.body.result.parameters.endTime;
    if (!date) {
        response.send({
            'speech': "!date->Please tell me current or Future date for Parking in this format: YYYY-MM-DD"
        });
    }
    else {
        var day = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        var currentDate = year + "-" + (month + 1) + "-" + day;
        var isDateValid = moment(date).isSameOrAfter(currentDate) && moment(date, "YYYY MM DD").isValid() ? true : false;
        // console.log('115', isDateValid, currentDate, date)
        if (!isDateValid) {
            response.send({
                'speech': "!isDateValid->Please tell me current or Future date for Parking slot in this format: YYYY-MM-DD",
                "contextOut": [{ "name": "booking", "lifespan": 99 }]
            });
        }
    }
    if (!startTime) {
        response.send({
            'speech': "!startTime->Please tell me valid Start Time for Parking slot",
            "contextOut": [{ "name": "booking", "lifespan": 99 }]
        });
    }
    else {
        var isStartTimeValid = (startTime <= 12 && startTime > 0) ? true : false;
        if (!isStartTimeValid) {
            response.send({
                'speech': "!isStartTimeValid->Please tell me valid Start Time",
                "contextOut": [{ "name": "booking", "lifespan": 99 }]
            });
        }
    }
    if (!endTime) {
        response.send({
            'speech': "!endTime->Please tell me valid ending Time for Parking slot like 1 to 12",
            "contextOut": [{ "name": "booking", "lifespan": 99 }]
        });
    }
    else {
        var isEndTimeValid = (endTime <= 12 && endTime > 0) ? true : false;
        if (!isEndTimeValid) {
            response.send({
                'speech': "!isEndTimeValid->Please tell me valid ending Time for Parking slot like 1 to 12",
                "contextOut": [{ "name": "booking", "lifespan": 99 }]
            });
        }
    }
    // checkReservedSlots(date,startTime,endTime);
    // console.log('result', result)
    response.send({
        'speech': "Reserved slot number on this date -> " + checkReservedSlots(date, startTime, endTime)
    });
    // var validated = validation(date, startTime, endTime,response)
    // response.send(
    //     {
    //         'speech': `Parameters-> date: ${date}, start: ${startTime}, end: ${endTime}`
    //     }
    // )
    // if(!validated.isDateValid || !validated.isStartTimeValid || !validated.isEndTimeValid){
    //     let speech = '';
    //     if(!validated.isDateValid){
    //         speech = 'Please write current of future date'
    //     }
    //     else if(!validated.isStartTimeValid){
    //         speech = 'Please write valid start time -> 1 to 12'
    //     }
    //     else if(!validated.isStartTimeValid){
    //         speech = 'Please write valid end time -> 1 to 12'
    //     }
    //     response.send(
    //         {
    //             'speech': speech
    //         }
    //     )
    // }
    // else{
    //     response.send(
    //         {
    //             'speech': `Parameters-> date: ${validated.isDateValid}, start: ${validated.isStartTimeValid}, end: ${validated.isEndTimeValid}`
    //         }
    //     )
    // }
}
function checkReservedSlots(date, startTime, endTime) {
    // getting reserved slots from data base
    index_1.default.ref('/CDGKreservedSlotsList/').on('child_added', function (snapshot) {
        console.log('parking data', snapshot.val());
        if (moment(date).isSame(snapshot.val().date)) {
            // console.log('slot number --> ',snapshot.val().slotNumber)
            var currentReservedHours = [];
            var reservedHours = [];
            for (var i = startTime; i <= endTime; i++) {
                currentReservedHours.push(i);
            }
            for (var i = snapshot.val().startTime; i <= snapshot.val().endTime; i++) {
                reservedHours.push(i);
            }
            // console.log('reseved hours', reservedHours)
            // console.log('currentReservedHours', currentReservedHours)
            for (var index = 0; index < reservedHours.length; index++) {
                for (var index1 = 0; index1 < currentReservedHours.length; index1++) {
                    if (reservedHours[index] == currentReservedHours[index1]) {
                        console.log('final validation -> ', snapshot.val());
                    }
                }
            }
        }
    });
    return true;
}
function validation(date, startTime, endTime, response) {
    var day = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var currentDate = year + "-" + (month + 1) + "-" + day;
    // console.log('date', date)
    // console.log('current date', currentDate)
    // console.log('121: isValid', moment(date, "YYYY MM DD").isValid());
    // console.log('122: isBefore', moment(date).isBefore(currentDate))
    // console.log('123: isAfter',moment(date).isAfter(currentDate));
    // console.log('124: isSame', moment(date).isSame(currentDate));
    // console.log('125: isSameOrAfter', moment(date).isSameOrAfter(currentDate)); // usable for this project
    // console.log('126: isSameOrBefore', moment(date).isSameOrBefore(currentDate))
    var isDateValid = moment(date).isSameOrAfter(currentDate) && moment(date, "YYYY MM DD").isValid() ? true : false;
    var isStartTimeValid = (startTime <= 12 && startTime > 0) ? true : false;
    var isEndTimeValid = (endTime <= 12 && endTime > 0) ? true : false;
    if (!isDateValid || !isStartTimeValid || !isEndTimeValid) {
        var speech = '';
        if (!isDateValid) {
            speech = 'Please write current of future date';
        }
        else if (!isStartTimeValid) {
            speech = 'Please write valid start time -> 1 to 12';
        }
        else if (!isStartTimeValid) {
            speech = 'Please write valid end time -> 1 to 12';
        }
        response.send({
            'speech': speech
        });
    }
    return { isDateValid: isDateValid, isStartTimeValid: isStartTimeValid, isEndTimeValid: isEndTimeValid };
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var functions = __webpack_require__(0);
var admin = __webpack_require__(4);
var defaultApp = admin.initializeApp(functions.config().firebase);
var db = admin.database();
exports.default = db;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ })
/******/ ])));