const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const indexRouter = require("@routers");
const apiRouter = require("@routers/api");
const webhookRouter = require("@routers/webhook");

const {handleNotFoundPage, handleError} = require("@middlewares/error");
const {logs} = require("@configs/constants");

const allowedDomains = ["http://localhost:3000", process.env.FRONTEND_URL];

const app = express();

const FRONTEND_BUILD_PATH = path.join(__dirname, "../../frontend/build");
app.use(express.static(FRONTEND_BUILD_PATH));

app.use(morgan(logs));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use(
    cors({
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: "*",
        credentials: true,
        origin: function (origin, callback) {
            // bypass the requests with no origin (like curl requests, mobile apps, etc )
            if (!origin) return callback(null, true);

            if (allowedDomains.indexOf(origin) === -1) {
                var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        exposedHeaders: ["set-cookie"],
    })
);

// Router
app.use("/", indexRouter);
app.use("/api/", apiRouter);
app.use("/webhook/", webhookRouter);

app.use(handleNotFoundPage);
app.use(handleError);

module.exports = app;
