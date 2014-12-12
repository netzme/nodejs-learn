/**
 * Created by untung on 12/12/14.
 */
var SockJS = require("sockjs-client"),
    OAuth = require("oauth"),
    FormData = require("form-data"),
    HTTP = require("http"),
    URL = require("url"),
    Step = require("step");

var data = require("./data/data"),
    config = require("./data/config");

var auth = new OAuth.OAuth(
    config.oauth.request_token,
    config.oauth.access_token,
    data.client.client_id,
    data.client.client_secret,
    '1.0A',
    config.oauth.authorize,
    'HMAC-SHA1'
);

var userToken = {};

Step(
    function submitLoginAdmin() {
        var form = new FormData(),
            fullLoginUrl = "http://" + config.pumpServer.host + config.pumpServer.path.login;
        form.append('nickname', data.admin.nickname);
        form.append('password', data.admin.password);
        form.submit({
            host: config.pumpServer.host,
            port: config.pumpServer.port,
            path: config.pumpServer.path.login,
            headers: {
                'Authorization': auth.authHeader(fullLoginUrl, null, null, 'POST'),
                'Cache-Control': 'no-cache'
            }
        }, this);
    },
    function respondLogin(err, res) {
        if (err) {
            throw err;
        } else {
            res.on('data', this);
        }
    },
    function startWebSocket(data){
        var userLogin = JSON.parse(data.toString()),
            links = userLogin.profile.links;
        userToken.token = userLogin.token;
        userToken.secret = userLogin.secret;

        var command = [
            {cmd: "follow", 'url': 'http://' + config.pumpServer.host + "/api/user/" + userLogin.nickname + "/inbox/major"},
            {cmd: "follow", 'url': 'http://' + config.pumpServer.host + "/api/user/" + userLogin.nickname + "/inbox/minor"},
            {cmd: "follow", 'url': 'http://' + config.pumpServer.host + "/api/user/" + userLogin.nickname + "/inbox/direct/major"},
            {cmd: "follow", 'url': 'http://' + config.pumpServer.host + "/api/user/" + userLogin.nickname + "/inbox/direct/minor"},
        ];
        var sockClient = new SockJS(config.websocket.host);
        sockClient.onopen = function(){
            for (var i=0; i<command.length; i++ ) {
                sockClient.send(JSON.stringify(command[i]));
            }
        }
        sockClient.onmessage = function(msg){
            handleIncommingMessage(sockClient, msg);
        }
    }
);

var handleIncommingMessage = function(sockClient, message) {
    var incomming = JSON.parse(message.data);
    if (incomming.cmd === 'challenge') {
        replyChallenge(sockClient, incomming);
    } else if ((incomming.cmd === 'update')) {
        console.log(incomming.activity);
    }
}

var replyChallenge = function(sockClient, incoming){
    var message = {'action': incoming.url, 'method': incoming.method, 'parameters': []};
    message.parameters.push(['oauth_version', '1.0A']);
    message.parameters.push(['oauth_consumer_key', data.client.client_id]);
    message.parameters.push(['oauth_token', userToken.token]);
    var authEcho = new OAuth.OAuthEcho(
        incoming.url,
        incoming.url,
        data.client.client_id,
        data.client.client_secret,
        "1.0A",
        'HMAC-SHA1',
        null,
        null
    );
    var signedUrl = URL.parse(authEcho.signUrl(incoming.url, userToken.token, userToken.secret, incoming.method), true).query;
    message.parameters.push(['oauth_nonce', signedUrl.oauth_nonce]);
    message.parameters.push(['oauth_signature_method', signedUrl.oauth_signature_method]);
    message.parameters.push(['oauth_timestamp', signedUrl.oauth_timestamp]);
    message.parameters.push(['oauth_signature', signedUrl.oauth_signature]);
    sockClient.send(JSON.stringify({cmd: 'rise', 'message': message}));
}