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

  try {
    // Check if the email is already subscribed to the newsletter
    const results: any = await subscribersModel.getSubscribersByEmail(email);

    if (results && results.length > 0) {
      console.log(`Email ${email} is already subscribed to the newsletter.`);
      return res.status(409).send("Email is already subscribed.");
    }

    // Add subscriber to the database
    console.log(
      `Email ${email} is not subscribed. Proceeding with subscription...`,
    );

    await subscribersModel.addSubscriber(email);
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
  } catch (err: any) {
    console.error(`Server error: ${err.message}`);
    return res.status(500).send("Server error.");
  }
}

//unsubscribing from a newsletter
async function unsubscribeNewsletter(req: any, res: any): Promise<void> {
  const email = req.body.email;
  console.log(`Unsubscribing ${email} from the newsletter...`);

  if (!email || typeof email !== "string") {
    console.error("Invalid email address provided for unsubscription.");
    return res.status(400).send("Invalid email address.");
  }

  try {
    const results: any = await subscribersModel.getSubscribersByEmail(email);

    if (!results || results.length === 0) {
      console.log(`Email ${email} is not subscribed to the newsletter.`);
      return res.status(404).send("Email is not subscribed.");
    }
    console.log(
      `Email ${email} is currently subscribed. Proceeding with unsubscription...`,
    );
    await subscribersModel.removeSubscriber(email);
    console.log(`Successfully unsubscribed ${email} from the newsletter!`);
    res.status(200).send("Successfully unsubscribed from the newsletter.");
  } catch (err: any) {
    console.error(`Server error: ${err.message}`);
    return res.status(500).send("Server error.");
  }
}

async function getAllSubscribers(req: any, res: any) {
  try {
    const results = await subscribersModel.getAllSubscribers();
    res.status(200).send(results);
  } catch (err: any) {
    console.error(`Failed to get all subscribers: ${err.message}`);
    res.status(500).send("Server error.");
  }
}

export default {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
};
