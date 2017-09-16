import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import db from '../db/index';
const request = require('request');

let bookedSlots = [];

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
                //     this.bookedSlots.push(snapshot.val())
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
    // console.log('parameters', requestt.body.result.parameters)
    response.send(
        {
            'speech': 'Parameters: ' + JSON.stringify(requestt.body.result.parameters)
        }
    )
});

// tslint:disable-next-line:no-shadowed-variable
function bookingSlot(request, response) {
    const date = request.body.result.parameters.date;
    const time = request.body.result.parameters.time;
    const hours = request.body.result.parameters.hours;
    validation(date, time, hours)
}

function validation(date, time, reservedHours) {

}
