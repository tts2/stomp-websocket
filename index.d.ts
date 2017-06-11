// Type definitions for stompjs 2.3
// Project: https://github.com/jmesnil/stomp-websocket
// Definitions by: Jimi Charalampidis <https://github.com/jimic>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

export const VERSIONS: {
    V1_0: string,
    V1_1: string,
    V1_2: string,
    supportedVersions: () => Array<string>
};

export class Client {

    connected: boolean;
    counter: number;
    heartbeat: {
        incoming: number,
        outgoing: number
    };

    reconnect_delay: number;

    maxWebSocketFrameSize: number;
    subscriptions: {};
    ws: WebSocket;

    debug(...args: string[]): any;

    connect(headers: Headers, connectCallback: (frame?: Frame) => any, errorCallback?: (error: string) => any): any;
    connect(login: string, passcode: string, connectCallback: (frame?: Frame) => any, errorCallback?: (error: string) => any, host?: string): any;
    disconnect(disconnectCallback: () => any, headers?: Headers): any;

    send(destination: string, headers?: Headers, body?: string): any;
    subscribe(destination: string, callback?: (message: Message) => any, headers?: Headers): StompSubscription;
    onreceive: (message: Message) => void;
    onreceipt: (frame: Frame) => void;
    unsubscribe(): any;

    begin(transaction: string): any;
    commit(transaction: string): any;
    abort(transaction: string): any;

    ack(messageID: string, subscription: string, headers?: Headers): any;
    nack(messageID: string, subscription: string, headers?: Headers): any;
}

export interface StompSubscription {
    unsubscribe(headers?: Headers): void;
}

export class Headers { [key: string]: string }

export class Message extends Frame {
    ack(headers?: Headers): any;
    nack(headers?: Headers): any;
}

export class Frame {
    constructor(command: string, headers?: Headers, body?: string);

    command: string;
    headers: Headers;
    body: string;

    toString(): string;
    sizeOfUTF8(s: string): number;
    unmarshall(datas: any): any;
    marshall(command: string, headers?: Headers, body?: string): any;
}

export function client(url: string, protocols?: string | Array<string>): Client;
export function over(ws: WebSocket | (() => WebSocket)): Client;
export function overTCP(host: string, port: number): Client;
export function overWS(url: string): Client;
export function setInterval(interval: number, f: (...args: any[]) => void): NodeJS.Timer;
export function clearInterval(id: NodeJS.Timer): void;
