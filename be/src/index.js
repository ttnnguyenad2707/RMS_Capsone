import * as dotenv from 'dotenv'
dotenv.config();
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from 'passport';
import indexRouter from './routes/index.route.js';
import {v2 as cloudinary} from 'cloudinary';
import socketConnect from '../config/socketIO.js';
const { SERVER_PORT, MONGODB_URL, CLIENT_URL } = process.env;

const app = express();
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser())
app.use(json());
app.use(urlencoded({ extended: true }));
cloudinary.config({ 
    cloud_name: 'dtpujfoo8', 
    api_key: '697855136624351', 
    api_secret: 'gYkgLXmSaCiVhCM40clYpA_dFr8' 
  });
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "admin",
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

app.get(
    '/',
    (req, res) => {
        res.send("API is working")
    }
);

app.use(
    '/api/v1',
    indexRouter
);



const startServer = async () => {
    try {
        await connect(MONGODB_URL);
        console.log(">>> Connected to MongoDB");
        const server = app.listen(SERVER_PORT || 5000, () => {
            console.log(`>>> Listening on port ${SERVER_PORT || 5000}`);
        });
        socketConnect(server)
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

startServer();