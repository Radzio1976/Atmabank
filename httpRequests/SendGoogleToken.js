const speakeasy = require('speakeasy');

module.exports = function sendGoogleToken(req, res) {
    const data = req.body;

    let verified = speakeasy.totp.verify({
        secret: data.ascii,
        encoding: 'ascii',
        token: data.googleToken
    })
    
    if (verified) {
        res.send({ info: "Token google prawidłowy", isAuthSecondStep: true });
    } else {
        res.send({ info: "Token google nieprawidłowy", isAuthSecondStep: false });
    }
};