const passport = require('passport');
const config = require('../config/default.json');
const users = require('../models/users.model');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    // User.findById(id, (err, user) => {
    //     done(err, user);
    // });
    done(null, user);
});
passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
    async function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        return cb(null, profile);
    }
));

const FacebookStrategy = require('passport-facebook');
passport.use(new FacebookStrategy({
        clientID: "2639994236273058",
        clientSecret: "7ec2bf32325321ebc59a2701db3781d1",
        callbackURL: "http://localhost:3000/facebook/callback"
    },
    function(accessToken, profile, done) {
        process.nextTick(() => {
            return done(null, profile);
        });
    }
));