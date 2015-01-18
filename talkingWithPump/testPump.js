/**
 * Created by Destri on 1/12/15.
 */
var OAuth = require("oauth"),
    FormData = require("form-data"),
    SockJS = require("sockjs-client"),
    URL = require("url")


var clientId = '8CTXSd0nkB0tFFpqrgtgwA';
var clientSecret = 'Zr2f1zwiBV05U1GZE4rfwXIid2xeroDShqJxRkPz1i4';

var auth = new OAuth.OAuth(
    "http://localhost:50001/oauth/request_token",
    "http://localhost:50001/oauth/access_token",
    "8CTXSd0nkB0tFFpqrgtgwA",
    "Zr2f1zwiBV05U1GZE4rfwXIid2xeroDShqJxRkPz1i4",
    "1.0.A",
    "oob",
    "HMAC-SHA1"
);

function testCreateUser() {
    //hanya butuh client id + secret
    console.log('test');



    var formData = new FormData();
    var createUserUrl = "http://localhost:50001/api/users";
    formData.append("nickname", "test10");
    formData.append("password", "Test123**");
    formData.submit({
            host: "localhost",
            port: "50001",
            path: "/api/users",
            headers: {
                'Authorization': auth.authHeader(createUserUrl, null, null, 'POST'),
                'Cache-Control': 'no-cache'
            }
        },
        function(err, res){
            console.log('err :');
            console.log(err);
            console.log('result :');
            res.on("data", function(data) {
                console.log(data.toString());
            });

        });


}

function testOauthLogin() {


    auth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        console.log("req requestToken");
        console.log( error );
        console.log('req token ' + oauth_token);
        console.log('req token secret ' + oauth_token_secret);

        //verifier ambil dari /oauth/authorize, how ?
        auth.getOAuthAccessToken(oauth_token, oauth_token_secret, 'verifier ?',
        function(obj, oauth_access_token, oauth_access_token_secret, results){
            console.log("req accessToken");
            console.log("obj " + obj);
            console.log("oauth_access_token " + oauth_access_token);
            console.log("oauth_access_token_secret " + oauth_access_token_secret);
            console.log("results " + results);


        }, "oob");
    });




}


function testLoginWithWebInterface() {
    var form = new FormData(),
        fullLoginUrl = "http://localhost:50001/main/login";
    form.append('nickname', 'test01');
    form.append('password', 'Test123*');
    form.submit({
        host: "localhost",
        port: "50001",
        path: "/main/login",
        headers: {
            'Authorization': auth.authHeader(fullLoginUrl, null, null, 'POST'),
            'Cache-Control': 'no-cache'
        }
    }, function(err, res) {
        console.log(err);
        if (!err) {
            res.on('data', function (obj) {
                //kkalau success, return json data, kalau error, return HTML. karena bukan endpoint rest, tapi web interface buat login.
                console.log(obj.toString())
            })
        }
/*
 {"updated":"2015-01-15T08:13:31Z","published":"2015-01-15T08:13:31Z","profile":{"preferredUsername":"test01","url":"http://localhost:50001/test01","displayName":"test01","links":{"self":{"href":"http://localhost:50001/api/user/test01/profile"},"activity-inbox":{"href":"http://localhost:50001/api/user/test01/inbox"},"activity-outbox":{"href":"http://localhost:50001/api/user/test01/feed"}},"objectType":"person","followers":{"url":"http://localhost:50001/api/user/test01/followers","totalItems":2},"following":{"url":"http://localhost:50001/api/user/test01/following","totalItems":1},"favorites":{"url":"http://localhost:50001/api/user/test01/favorites","totalItems":0},"lists":{"url":"http://localhost:50001/api/user/test01/lists/person","totalItems":5},"updated":"2015-01-15T08:13:31Z","id":"http://localhost:50001/api/user/test01/profile"},
    "nickname":"test01","token":"xD4WRqdipNjDveYENJXlNw","secret":"zveKtsW4qpSp3X-NYvJJIieiT84bl2FEkmL5-ZC6xis"}

 */
    });

}

function testWebSocket(){
    var userLogin = 'test01';
    var token = 'xD4WRqdipNjDveYENJXlNw';
    var secret = 'zveKtsW4qpSp3X-NYvJJIieiT84bl2FEkmL5-ZC6xis';

    var command = [
        {cmd: "follow", 'url': "http://localhost:50001/api/user/test01/inbox/major"},
        {cmd: "follow", 'url': "http://localhost:50001/api/user/test01/inbox/minor"},
        {cmd: "follow", 'url': "http://localhost:50001/api/user/test01/inbox/direct/major"},
        {cmd: "follow", 'url': "http://localhost:50001/api/user/test01/inbox/direct/minor"},
    ];

    var sockClient = new SockJS('http://localhost:50001/main/realtime/sockjs');
    sockClient.onopen = function(){
        for (var i=0; i<command.length; i++ ) {
            sockClient.send(JSON.stringify(command[i]));
        }
    }
    sockClient.onmessage = function(msg){
        console.log('msg : ' + msg);
        var incoming = JSON.parse(msg.data);
        console.log(incoming)
        if (incoming.cmd === 'challenge') {
            replyChallenge(sockClient, incoming, token, secret);
        } else if ((incoming.cmd === 'update')) {
            console.log('update ' + incoming.activity);
        }

        //handleIncommingMessage(sockClient, msg);
    }

}

var replyChallenge = function(sockClient, incoming, token, secret){
    var message = {'action': incoming.url, 'method': incoming.method, 'parameters': []};
    message.parameters.push(['oauth_version', '1.0A']);
    message.parameters.push(['oauth_consumer_key', clientId]);
    message.parameters.push(['oauth_token', token]);
    var authEcho = new OAuth.OAuthEcho(
        incoming.url,
        incoming.url,
        clientId,
        clientSecret,
        "1.0A",
        'HMAC-SHA1',
        null,
        null
    );
    var signedUrl = URL.parse(authEcho.signUrl(incoming.url, token, secret, incoming.method), true).query;
    message.parameters.push(['oauth_nonce', signedUrl.oauth_nonce]);
    message.parameters.push(['oauth_signature_method', signedUrl.oauth_signature_method]);
    message.parameters.push(['oauth_timestamp', signedUrl.oauth_timestamp]);
    message.parameters.push(['oauth_signature', signedUrl.oauth_signature]);
    sockClient.send(JSON.stringify({cmd: 'rise', 'message': message}));
}


testWebSocket();
//testLoginWithWebInterface()
//testOauthLogin();
//testCreateUser();