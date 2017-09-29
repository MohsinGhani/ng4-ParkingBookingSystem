import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import db from '../db/index';
import * as moment from 'moment';

const request = require('request');

export let onConversation = functions.database.ref('/conversation/{uid}/{pushId}')
    .onWrite(event => {
        const data: any = event.data.val();

        if (data != null) {
            if (data.name !== 'Bot') {
                // console.log("uid", event.params.uid)
                // console.log("messages", data.text)
                // console.log("messages", event.params.pushId)
                const options = {
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
                        response = JSON.parse(body)
                        console.log('user msg & bot reply', data.text, response.result.fulfillment.speech)
                        const time = new Date().getTime()
                        db.ref('/conversation/' + event.params.uid + '/').push({
                            name: 'Bot',
                            imageUrl: '../assets/images/bot.jpg',
                            text: response.result.fulfillment.speech,
                            timestamp: time
                        })
                    }
                });
            }
        }
    });

function sendMessageInDatabase(data, event) {
    const options = {
        // tslint:disable-next-line:max-line-length
        url: 'https://api.api.ai/api/query?v=20150910&query=' + data.text + '&lang=en&sessionId=' + event.params.uid + '&timezone=2017-03-24T21:10:33+0500',
        headers: {
            'Authorization': 'Bearer 63bef7d0e4464fe7bc918fc9a4e1c827'
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            response = JSON.parse(body)
            console.log('user msg & bot reply', data.text, response.result.fulfillment.speech)
            const time = new Date().getTime()
            db.ref('/conversation/' + event.params.uid + '/').push({
                name: 'Bot',
                imageUrl: '../assets/images/bot.jpg',
                text: response.result.fulfillment.speech,
                timestamp: time
            })
        }
    });
}

// check the action of api.ai
export const apiAiResponse = functions.https.onRequest((requestt, response) => {
    switch (requestt.body.result.action) {
        case 'booking':
            bookingSlot(requestt, response);
            break;

        default:
            response.send(
                { 'speech': 'Unknown Action: ' + request.action }
            )

    }
});


function bookingSlot(request, response) {
    const date = request.body.result.parameters.date;
    let startTime = request.body.result.parameters.startTime;
    const endTime = request.body.result.parameters.endTime;



    if (!date) {
        response.send(
            {
                'speech': "!date->Please tell me current or Future date for Parking in this format: YYYY-MM-DD",
                "contextOut": [{ "name": "booking", "lifespan": 2 }]
            }
        )
    }
    else {
        let day = new Date().getDate()
        let month = new Date().getMonth();
        let year = new Date().getFullYear()
        let currentDate = `${year}-${month + 1}-${day}`
        let isDateValid = moment(date).isSameOrAfter(currentDate) && moment(date, "YYYY MM DD").isValid() ? true : false;
        // console.log('115', isDateValid, currentDate, date)
        if (!isDateValid) {
            response.send(
                {
                    'speech': "!isDateValid->Please tell me current or Future date for Parking slot in this format: YYYY-MM-DD",
                    "contextOut": [{ "name": "booking", "lifespan": 2 }]
                }
            )
        }
    }

    if (!startTime) {
        response.send(
            {
                'speech': "!startTime->Please tell me valid Start Time for Parking slot",
                "contextOut": [{ "name": "booking", "lifespan": 2 }]

            }
        )
    }
    else {
        let isStartTimeValid = (startTime <= 12 && startTime > 0) ? true : false;
        if (!isStartTimeValid) {
            response.send(
                {
                    'speech': "!isStartTimeValid->Please tell me valid Start Time",
                    "followupEvent": {
                        "name": "booking",
                        "data": {
                           "date": "today",
                           "startTime":"5"
                        }
                     }
                }
            )
        }
    }

    if (!endTime) {
        response.send(
            {
                'speech': "!endTime->Please tell me valid ending Time for Parking slot like 1 to 12",
                "contextOut": [{ "name": "booking", "lifespan": 2 }]
            }
        )
    }
    else {
        let isEndTimeValid = (endTime <= 12 && endTime > 0) ? true : false;
        if (!isEndTimeValid) {
            response.send(
                {
                    'speech': "!isEndTimeValid->Please tell me valid ending Time for Parking slot like 1 to 12",
                    "contextOut": [{ "name": "booking", "lifespan": 2 }]
                }
            )
        }
    }

    // checkReservedSlots(date,startTime,endTime);
    // console.log('result', result)
    let reservedSlots = checkReservedSlots(date,startTime,endTime)
    var uniqueReservedSlots = reservedSlots.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      })
    response.send(
        {
            'speech': `You can Reserve one slot between 1 to 100 except these ${JSON.stringify(uniqueReservedSlots)}`
        }
    )
}

function checkReservedSlots(date,startTime,endTime) {
    // console.log('start and end time',startTime,endTime)
    // getting reserved slots from data base
    let reservedSlots = [];
    db.ref('/CDGKreservedSlotsList/').on('child_added', (snapshot) => {
        // console.log('parking data', snapshot.val())
        // console.log('date->',date)
        // console.log('db date->',snapshot.val().date)
        if(moment(date).isSame(snapshot.val().date)){
            // console.log('date are matche->slot number-> ',snapshot.val().slotNumber)
            let currentReservedHours = []
            let reservedHours = []
            for(let i = parseInt(startTime); i<=parseInt(endTime); i++){
                currentReservedHours.push(i)
            }
            for(let i = snapshot.val().startTime; i<=snapshot.val().endTime; i++){
                reservedHours.push(i)
            }
            // console.log('reseved hours', reservedHours)
            // console.log('currentReservedHours', currentReservedHours)
            for (let index = 0; index < reservedHours.length; index++) {
                for (let index1 = 0; index1 < currentReservedHours.length; index1++) {
                  if (reservedHours[index] === currentReservedHours[index1]) {
                      reservedSlots.push(snapshot.val().slotNumber)
                  }
                }
              }
            currentReservedHours = []
            reservedHours = []
        }
    });
    console.log('reservedSlots in function',reservedSlots)
    return reservedSlots;
}

// function validation(date, startTime, endTime, response) {
//     let day = new Date().getDate()
//     let month = new Date().getMonth();
//     let year = new Date().getFullYear()
//     let currentDate = `${year}-${month + 1}-${day}`
//     // console.log('date', date)
//     // console.log('current date', currentDate)
//     // console.log('121: isValid', moment(date, "YYYY MM DD").isValid());
//     // console.log('122: isBefore', moment(date).isBefore(currentDate))
//     // console.log('123: isAfter',moment(date).isAfter(currentDate));
//     // console.log('124: isSame', moment(date).isSame(currentDate));
//     // console.log('125: isSameOrAfter', moment(date).isSameOrAfter(currentDate)); // usable for this project
//     // console.log('126: isSameOrBefore', moment(date).isSameOrBefore(currentDate))
//     let isDateValid = moment(date).isSameOrAfter(currentDate) && moment(date, "YYYY MM DD").isValid() ? true : false;
//     let isStartTimeValid = (startTime <= 12 && startTime > 0) ? true : false;
//     let isEndTimeValid = (endTime <= 12 && endTime > 0) ? true : false;
//     if (!isDateValid || !isStartTimeValid || !isEndTimeValid) {
//         let speech = '';
//         if (!isDateValid) {
//             speech = 'Please write current of future date'
//         }
//         else if (!isStartTimeValid) {
//             speech = 'Please write valid start time -> 1 to 12'
//         }
//         else if (!isStartTimeValid) {
//             speech = 'Please write valid end time -> 1 to 12'
//         }

//         response.send(
//             {
//                 'speech': speech
//             }
//         )
//     }
//     return { isDateValid: isDateValid, isStartTimeValid: isStartTimeValid, isEndTimeValid: isEndTimeValid }
// }
