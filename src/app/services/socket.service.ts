import { Injectable } from '@angular/core';

@Injectable()
export class SocketService {

    private socket: any;

    constructor() {
        console.log('opening websocket connection');

        const s = new WebSocket('ws://localhost:4200/sock/');

        s.addEventListener('error', function (m) { console.log('error'); });
        s.addEventListener('open', function (m) { console.log('websocket connection open'); });
        s.addEventListener('message', function (m) { console.log(m.data); });
    }

}
