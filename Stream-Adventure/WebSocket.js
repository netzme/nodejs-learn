/**
 * Created by untung on 23/09/14.
 */
var websocket = require('websocket-stream');
var stream = websocket('ws://localhost:8000/');

stream.end('hello\n');