import * as Mailjet from "node-mailjet";
import { promises as fs } from "fs";
import path from "path";
import Attachment from "../interfaces/services.interfaces";
import subscribersModel from "../models/subscribers.model";
import sendEmail from "../services/mailjet";

// subscribing to a newsletter
async function subscribeNewsletter(req: any, res: any): Promise<void> {
  const email = req.body.email;
  const attach: Attachment[] = [
    {
      filename: "Cat.jpg",
      path: path.resolve(__dirname, "../services", "welcome.jpg"),
    },
  ];
  const subject = "Welcome to our Newsletter!";
  const textBody = `Thank you for subscribing to our newsletter!\n\n
  Please enjoy your unsubscribing link.`;
  const htmlBody = `<h1>Thank you for subscribing to our newsletter!</h1>
  <h2>Please enjoy your unsubscribing link.</h2>
  <p><a href="https://soundcloud.com/salepropre/sets/sale-propre" alt="Free sound">CLIQUE ICI</a></p>`;

  if (!email || typeof email !== "string") {
    console.error("Invalid email address provided for subscription.");
    return res.status(400).send("Invalid email address.");
  }

  // Check if the email is already subscribed to the newsletter
  subscribersModel.getSubscribersByEmail(email, (err: any, results: any) => {
    if (err) {
      console.error(
        `Failed to check subscription for ${email}: ${err.message}`,
      );
      return res.status(500).send("Server error.");
    }
    if (results && results.length > 0) {
      console.log(`Email ${email} is already subscribed to the newsletter.`);
      return res.status(409).send("Email is already subscribed.");
    }

    // Add subscriber to the database
    console.log(
      `Email ${email} is not subscribed. Proceeding with subscription...`,
    );

    subscribersModel.addSubscriber(email, async (err: any, results: any) => {
      if (err) {
        console.error(`Failed to subscribe ${email}: ${err.message}`);
        return res.status(500).send("Server error during subscription.");
      }
      console.log(`Successfully subscribed ${email} to the newsletter!`);

      // Sending confirmation mail
      try {
        await sendEmail({
          to: email,
          subject: subject,
          textBody: textBody,
          htmlBody: htmlBody,
          attachments: attach,
        });
        console.log(`Successfully sent Welcome email to ${email}`);
        res
          .status(201)
          .send(
            "Successfully subscribed to the newsletter and welcome email sent.",
          );
      } catch (error) {
        console.error(`Failed to send Welcome email : ${error}`);
        // Inform the user they are subscribed but the email failed
        res
          .status(207)
          .send(
            "Successfully subscribed, but the welcome email could not be sent.",
          );
      }
    });
  });
}

//unsubscribing from a newsletter
function unsubscribeNewsletter(req: any, res: any): void {
  const email = req.body.email;
  console.log(`Unsubscribing ${email} from the newsletter...`);

  if (!email || typeof email !== "string") {
    console.error("Invalid email address provided for unsubscription.");
    return res.status(400).send("Invalid email address.");
  }

  subscribersModel.getSubscribersByEmail(email, (err: any, results: any) => {
    if (err) {
      console.error(
        `Failed to check subscription for ${email}: ${err.message}`,
      );
      return res.status(500).send("Server error.");
    }
    if (!results || results.length === 0) {
      console.log(`Email ${email} is not subscribed to the newsletter.`);
      return res.status(404).send("Email is not subscribed.");
    }
    console.log(
      `Email ${email} is currently subscribed. Proceeding with unsubscription...`,
    );
    subscribersModel.removeSubscriber(email, (err: any, results: any) => {
      if (err) {
        console.error(`Failed to unsubscribe ${email}: ${err.message}`);
        return res.status(500).send("Server error.");
      }
      console.log(`Unsubscription result: ${results}`);
      console.log(`Successfully unsubscribed ${email} from the newsletter!`);
      res.status(200).send("Successfully unsubscribed from the newsletter.");
    });
  });
}

function getAllSubscribers(req: any, res: any) {
  subscribersModel.getAllSubscribers((err: any, results: any) => {
    if (err) {
      console.error(`Failed to get all subscribers: ${err}`);
    }
    res.status(200).send(results);
  });
}

export default {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
};
