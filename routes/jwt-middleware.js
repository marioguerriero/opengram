import expressJwt from 'express-jwt';
import config from "./../config";

export default expressJwt({
    secret: config.secret,
    getToken: function(req) {
        return req.body.token || req.query.token || req.headers['x-access-token'];
    }
});
