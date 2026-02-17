import { Request, Response } from "express";
import NewsletterModel from "../models/newsletter.model";
import sendEmail from "../services/mailjet";
import subscribersModel from "../models/subscribers.model";
import newsletterModel from "../models/newsletter.model";

// ADD A NEWSLETTER TO THE DATABASE
export const addNewsletter = async (req: Request, res: Response) => {
  try {
    NewsletterModel.addNewsletter(
      {
        object: req.body.object,
        content: req.body.content,
      },
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .send("Server error during newsletter creation.");
        }
        res.status(201).json({ message: "Newsletter created", data: result });
      },
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error during newsletter creation.");
  }
};

// GET ALL NEWSLETTERS
export const getAllNewsletters = async (req: Request, res: Response) => {
  try {
    NewsletterModel.getAllNewsletters((err: Error, result: any) => {
      if (err) {
        return res.status(500).send("Server error during newsletter creation.");
      }
      res.status(201).json({ message: "Newsletter created", data: result });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error during newsletter creation.");
  }
};

// Send newsletter to all subscribers

export const sendNewsletterByIdToAllSubscribers = async (
  req: Request,
  res: Response,
) => {
  const newsletterId: string = req.body.newsletterId;
  let nl: any;

  // Call the function to get The selected newsletter
  try {
    await newsletterModel.getNewsletterById(
      newsletterId,
      (err: Error, result: any) => {
        if (err) {
          console.error("Failed to get newsletter with ID: " + newsletterId);
          return res
            .status(400)
            .send(
              `Error: ${err} \n` +
                "Impossible to get newsletter with ID: " +
                newsletterId,
            );
        }
        console.log("newsletter successfully loaded:");
        nl = result[0];
        console.log(nl);
      },
    );

    // If there is no subscriber, then `emails` will be an empty array.

    // Call the function to get all subscribers and retrieve an array of emails.
    await subscribersModel.getAllSubscribers((err: Error, results: any) => {
      if (err) {
        console.error(`Failed to get all subscribers: ${err}`);
        return res
          .status(500)
          .send(
            `Error: ${err} \n` +
              "Impossible to get newsletter with ID: " +
              newsletterId,
          );
      }
      console.log("subscribers successfully loaded:");
      console.log(nl);
      const subscribers = results;
      // For each email call SendEmail service.
      console.log(subscribers);
      for (let i = 0; i < subscribers.length; i++) {
        sendEmail({
          to: subscribers[i].email,
          subject: nl ? nl.object : null,
          textBody: nl ? nl.content : null,
          htmlBody: nl ? nl.content : null,
          attachments: [],
        });
        console.log("The email should have been sent: " + subscribers[i].email);
      }
    });

    console.log("All Emails have been sent");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send("Server error during newsletter sending process");
  }
};

export default {
  addNewsletter,
  getAllNewsletters,
  sendNewsletterByIdToAllSubscribers,
};
