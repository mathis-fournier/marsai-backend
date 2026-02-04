import subscribersModel from "../models/subscribers.model";

// subscribing to a newsletter
function subscribeNewsletter(req: any, res: any): void {
  const email = req.body.email;
  console.log(`Subscribing ${email} to the newsletter...`);

  if (!email || typeof email !== "string") {
    console.error("Invalid email address provided for subscription.");
    return res.status(400).send("Invalid email address.");
  }

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
    console.log(
      `Email ${email} is not subscribed. Proceeding with subscription...`,
    );
    subscribersModel.addSubscriber(email, (err: any, results: any) => {
      if (err) {
        console.error(`Failed to subscribe ${email}: ${err.message}`);
        return res.status(500).send("Server error.");
      }
      console.log(`Subscription result: ${results}`);
      console.log(`Successfully subscribed ${email} to the newsletter!`);
      res.status(201).send("Successfully subscribed to the newsletter.");
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

export default { subscribeNewsletter, unsubscribeNewsletter };
