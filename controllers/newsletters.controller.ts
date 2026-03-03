import { Request, Response } from "express";
import NewsletterModel from "../models/newsletter.model";
import sendEmail from "../services/mailjet";
import subscribersModel from "../models/subscribers.model";

// ADD A NEWSLETTER TO THE DATABASE
export const addNewsletter = async (req: Request, res: Response) => {
  try {
    const result = await NewsletterModel.addNewsletter({
      object: req.body.object,
      content: req.body.content,
    });
    res.status(201).json({ message: "Newsletter created", data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error during newsletter creation.");
  }
};

// GET ALL NEWSLETTERS
export const getAllNewsletters = async (req: Request, res: Response) => {
  try {
    const result = await NewsletterModel.getAllNewsletters();
    res.status(200).json({ message: "Newsletters retrieved", data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error during newsletters retrieval.");
  }
};

// Send newsletter to all subscribers
export const sendNewsletterByIdToAllSubscribers = async (
  req: Request,
  res: Response,
) => {
  const newsletterId: string = req.body.newsletterId;

  try {
    // Récupère la newsletter avec l'ID spécifié depuis la base de données.
    const newsletterResults: any = await NewsletterModel.getNewsletterById(newsletterId);
    
    if (!newsletterResults || newsletterResults.length === 0) {
      console.error("Failed to find newsletter with ID: " + newsletterId);
      return res.status(404).send("Newsletter not found with ID: " + newsletterId);
    }

    console.log("newsletter successfully loaded:");
    const nl = newsletterResults[0];
    console.log(nl);

    // Récupère tous les abonnés
    const subscribers: any = await subscribersModel.getAllSubscribers();
    console.log("subscribers successfully loaded:");
    console.table(subscribers);

    // Pour chaque email, appelle le service d'envoi d'email.
    const sendPromises = subscribers.map((subscriber: any) => {
      return sendEmail({
        to: subscriber.email,
        subject: nl.object,
        textBody: nl.content,
        htmlBody: nl.content,
        attachments: [],
      }).then(() => {
        console.log("The email should have been sent: " + subscriber.email);
      }).catch((err) => {
        console.error("Failed to send email to: " + subscriber.email, err);
      });
    });

    await Promise.all(sendPromises);

    console.log("All Emails process finished");
    res.status(200).json({ message: "Newsletter sending process finished" });
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
