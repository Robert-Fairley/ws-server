import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import { I, T } from './interfaces';
import {
    nameField,
    parseMessage,
    botMessage,
    userMessage
} from './chat-helpers';
import { GreetingsBot, StatusBot } from './built-ins';

const app    = express();
const server = http.createServer(app);
const wss    = new WebSocket.Server({ server });

wss.on('connection', (ws: any) => {

    ws.isAlive = true;

    ws.pong('pong', () => {
        ws.isAlive = true;
    });

    ws.on('message', (incoming: string) => {
        const nameRegex = /^{{.*?}}/;

        if (nameRegex.test(incoming)) {
            let message: I.ParsedMessage = parseMessage(incoming);

            wss.clients.forEach(client => {
                client.send( userMessage(message) );
            });   
        }
    });

    ws.send( botMessage({ bot: GreetingsBot, message: 'Hello!'}) );

    setTimeout(() => {
        wss.clients.forEach((ws: any) => {
            ws.send( botMessage({ bot: StatusBot, message: `You've idle for too long. Disconnecting.`}) );
        });
    }, 9800);
});

setInterval(() => {
    wss.clients.forEach((ws:any) => {
        if (!ws.isAlive) return ws.terminate();

        ws.isAlive = false;
        ws.ping(null, false, true);
    });
}, 10000);

server.listen(8999, () => {
    console.log(`Server started on port ${server.address().port}`);
})
