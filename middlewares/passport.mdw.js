const passport = require('passport');
const config = require('../config/default.json');
const users = require('../models/users.model');

//login with google
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
    async function(accessToken, refreshToken, profile, cb) {
        profile = profile._json;
        delete profile.given_name;
        delete profile.family_name;
        delete profile.email_verified;
        profile.accID = profile.sub;
        delete profile.sub;
        profile.fullname = profile.name;
        delete profile.name;
        profile.avatar = profile.picture;
        delete profile.picture;
        delete profile.locale;
        console.log(profile);
        const user = await users.single(profile.accID);
        if (user[0]) {

        } else {
            let time = new Date();
            time.setDate(time.getDate() + 7);
            profile.time_up = time;
            profile.type = 4;
            users.add(profile);
        }
        return cb(null, profile);
    }
));

const FacebookStrategy = require('passport-facebook');
passport.use(new FacebookStrategy({
        clientID: config.facebook.facebook_key,
        clientSecret: config.facebook.facebook_secret,
        callbackURL: config.facebook.callback_url
    },
    async function(accessToken, refreshToken, profile, done) {
        profile = profile._json;
        profile.fullname = profile.name;
        delete profile.name;
        profile.accID = profile.id;
        delete profile.id;
        const user = await users.single(profile.accID);
        if (user[0]) {

        } else {
            let time = new Date();
            time.setDate(time.getDate() + 7);
            profile.time_up = time;
            profile.type = 4;
            users.add(profile);
        }
        return done(null, profile);
    }
));