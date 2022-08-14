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

const db = admin.firestore();

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db.collection("userdetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });

      return res.status(200).send({ status: "Success", msg: "Data Saved" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

app.get("/api/userDetail/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      let userDetail = await reqDoc.get();
      let response = userDetail.data();

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

app.get("/api/userDetails", (req, res) => {
  (async () => {
    try {
      let query = db.collection("userdetails");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            name: doc.data().name,
            mobile: doc.data().mobile,
            address: doc.data().address,
          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

app.put("/api/update/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });
      return res.status(200).send({ status: "Success", msg: "Data Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});


app.delete("/api/delete/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      await reqDoc.delete();
      return res.status(200).send({ status: "Success", msg: "Data Removed" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

exports.app = functions.https.onRequest(app);
