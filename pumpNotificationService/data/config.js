/**
 * Created by untung on 12/12/14.
 */
exports.pumpServer = {
    host: "pump.netzme.id",
    port: 80,
    path: {
        login: "/main/login"
    }
}
exports.oauth = {
    request_token: "http://" + this.pumpServer.host + "/oauth/request_token",
    access_token: "http://" + this.pumpServer.host + "/oauth/access_token",
    authorize: "http://" + this.pumpServer.host + "/oauth/authorize"
}
exports.websocket = {
    host : "http://" + this.pumpServer.host + "/main/realtime/sockjs"
}
exports.mqttServer = {
    host: "54.169.189.66",
    port: 1883
}