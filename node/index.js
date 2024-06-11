// server.js

import express from "express";
import webpush from "web-push";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:test@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

app.post("/subscribe", (req, res) => {
  console.log(req.body);
  console.log(subscriptions);
  const subscription = req.body;
  subscriptions.push(subscription);

  res.status(201).json({ status: "success" });
});

app.post("/send-notification", (req, res) => {
  const notificationPayload = {
    title: "New Notification",
    body: "This is a new notification",
    icon: "https://some-image-url.jpg",
    data: {
      url: "https://example.com",
    },
  };

  Promise.all(
    subscriptions.map((subscription) =>
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  )
    .then(() =>
      res.status(200).json({ message: "Notification sent successfully." })
    )
    .catch((err) => {
      console.error("Error sending notification");
      res.sendStatus(500);
    });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
