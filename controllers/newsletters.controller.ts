import { Request, Response } from "express";
import NewsletterModel from "../models/newsletter.model";
import sendEmail from "../services/mailjet";
import subscribersModel from "../models/subscribers.model";

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

export const sendNewsletterByIdToAllSubscribers = async (
  req: Request,
  res: Response,
  callback: (err: Error, results: any) => void,
) => {
  try {
    // Call the function to get all subscribers and retrieve an array of emails.
    let response;
    await new Promise((resolve, reject) => {
      subscribersModel.getAllSubscribers((err: Error, results: any) => {
        if (err) {
          console.error(`Failed to get all subscribers: ${err}`);
          return resolve(null);
        }
        response = results;
        resolve;
      });
    });
    // If there is no subscriber, then `emails` will be an empty array.
    const emails = response ? response : [];
    console.log(emails);

    if (emails.length) {
      // For each email call SendEmail service.
      //   for (let i = 0; i < emails.length; i++) {
      //     sendEmail({
      //       to: emails[i].email,
      //       subject: "Newsletter",
      //       content: req.body.content,
      //     });
      //   }
    } else {
      return res.status(404).send("No subscribers found.");
    }
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
