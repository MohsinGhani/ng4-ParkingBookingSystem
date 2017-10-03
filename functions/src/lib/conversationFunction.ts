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
                        // console.log('user msg & bot reply', data.text, response.result.fulfillment.speech)
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
        case 'bookingDate':
            bookingSlotDate(requestt, response);
            break;

        case 'start-end-time':
            bookingStartTime(requestt, response);
            break;

        case 'endTime':
            bookingEndTime(requestt, response);
            break;

        case 'slot-number':
            slotBook(requestt, response);
            break;

        default:
            response.send(
                { 'speech': 'Unknown Action: ' + request.action }
            )

    }
});


function bookingSlotDate(request, response) {
    const date = request.body.result.parameters.date;
    const sessionId = request.body.sessionId;

    if (!date) {
        response.send(
            {
                'speech': "Please tell me current or Future date for Parking in this format: YYYY-MM-DD"
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
                    'speech': "Please tell me Valid current or Future date for Parking slot in this format: YYYY-MM-DD",
                    "followupEvent": {
                        "name": "bookingDate"
                    }
                }
            )
        }
        else {
            db.ref(`/helper/${sessionId}/date`).set(date).then(() => {
                response.send(
                    {
                        'speech': "Please tell me valid Start Time for Parking slot",
                        "followupEvent": {
                            "name": "start-end-time"
                        }
                    }
                )
            })

        }
    }
}

function bookingStartTime(request, response) {
    const startTime = request.body.result.parameters.startTime;
    const sessionId = request.body.sessionId;
    if (!startTime) {
        response.send(
            {
                'speech': "Please tell me valid Start Time for Parking slot",
                "contextOut": [{ "name": "booking", "lifespan": 2 }]

            }
        )
    }
    else {
        let isStartTimeValid = (startTime <= 12 && startTime > 0) ? true : false;
        if (!isStartTimeValid) {
            response.send(
                {
                    'speech': "Please tell me valid Start Time between 1 to 12",
                    "followupEvent": {
                        "name": "start-end-time",
                    }
                }
            )
        }
        else {
            db.ref(`/helper/${sessionId}/startTime`).set(JSON.stringify(startTime)).then(() => {
                bookingEndTime(request, response)
            })
        }
    }
}

function bookingEndTime(request, response) {
    const endTime = request.body.result.parameters.endTime;
    const startTime = request.body.result.parameters.startTime;
    const sessionId = request.body.sessionId;

    let date;
    db.ref('/helper/' + sessionId).once('value').then((snapshot) => {
        date = snapshot.val().date;
    }).then(() => {
        if (!endTime) {
            response.send(
                {
                    'speech': "Please tell me valid ending Time for Parking slot like 1 to 12",
                }
            )
        }
        else {
            let isEndTimeValid = (endTime <= 12 && endTime > 0) ? true : false;
            if (!isEndTimeValid) {
                response.send(
                    {
                        'speech': "Please tell me valid ending Time for Parking slot like 1 to 12",
                        "followupEvent": {
                            "name": "start-end-time",
                        }
                    }
                )
            }
            else {
                if (date != undefined) {
                    // checkReservedSlots(date, startTime, endTime,response)
                    let reservedSlots = checkReservedSlots(date, startTime, endTime)
                    let uniqueReservedSlots = reservedSlots.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    })
                    response.send(
                        {
                            // 'speech': `You can Reserve one slot between 1 to 100 except these ${JSON.stringify(uniqueReservedSlots)}`
                            'speech': `You can Reserve one slot between 1 to 100 except these ${JSON.stringify(uniqueReservedSlots)}`,
                            "followupEvent": {
                                "name": "slot-number",
                                "data": {
                                    "reserved-slots": JSON.stringify(uniqueReservedSlots)
                                }
                            }
                        }
                    )
                }
                else {
                    response.send(
                        {
                            'speech': `sorry date is undefine kindly repead this procedure again`
                        }
                    )
                }
            }
        }
    })
}



function checkReservedSlots(date, startTime, endTime) {
    // console.log('date, start time, end time', date, startTime, endTime)
    let reservedSlots: any = []
    // getting reserved slots from database
    db.ref('/CDGKreservedSlotsList/').on('child_added', (snapshot) => {
        // console.log('parking data', snapshot.val())
        // console.log('date->',date)
        // console.log('db date->',snapshot.val().date)
        if (moment(date).isSame(snapshot.val().date)) {
            // console.log('date are matche->slot number-> ',snapshot.val().slotNumber)
            let currentReservedHours = []
            let reservedHours = []
            for (let i = parseInt(startTime); i <= parseInt(endTime); i++) {
                currentReservedHours.push(i)
            }
            for (let i = snapshot.val().startTime; i <= snapshot.val().endTime; i++) {
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
    })
    // console.log('reservedSlots in function', reservedSlots)
    return reservedSlots;

}