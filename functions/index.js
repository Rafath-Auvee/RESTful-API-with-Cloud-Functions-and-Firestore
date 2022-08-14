/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const serviceAccount = require("./st-cf-firebase-firebase-adminsdk-vmqja-802aceb8c0.json");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");

});

exports.app = functions.https.onRequest(app);
