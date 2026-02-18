import { Request, Response } from "express";
import NewsletterModel from "../models/newsletter.model";
import sendEmail from "../services/mailjet";
import subscribersModel from "../models/subscribers.model";
import newsletterModel from "../models/newsletter.model";

/**
 * Ajoute une nouvelle newsletter à la base de données.
 * @param req - L'objet de requête Express contenant les données de la newsletter.
 * @param res - L'objet de réponse Express pour renvoyer la réponse au client.
 * @returns Une réponse JSON avec un message de succès et les données de la newsletter créée.
 */
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

/**
 * Récupère toutes les newsletters depuis la base de données.
 * @param req - L'objet de requête Express.
 * @param res - L'objet de réponse Express pour renvoyer la réponse au client.
 * @returns Une réponse JSON avec un message de succès et la liste des newsletters.
 */
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

/**
 * Envoie une newsletter spécifique (identifiée par son ID) à tous les abonnés.
 * Le processus suit ces étapes :
 * 1. Récupère la newsletter depuis la base de données.
 * 2. Récupère la liste de tous les abonnés.
 * 3. Pour chaque abonné, appelle le service d'envoi d'email avec les détails de la newsletter.
 * @param req - L'objet de requête Express contenant l'ID de la newsletter à envoyer.
 * @param res - L'objet de réponse Express pour renvoyer la réponse au client.
 * @returns Une réponse de succès ou d'erreur suite au processus d'envoi.
 */
// Send newsletter to all subscribers
export const sendNewsletterByIdToAllSubscribers = async (
  req: Request,
  res: Response,
) => {
  const newsletterId: string = req.body.newsletterId;
  let nl: any;

  try {
    // Récupère la newsletter avec l'ID spécifié depuis la base de données.
    newsletterModel.getNewsletterById(
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

    // Récupère tous les abonnés et obtient un tableau de leurs emails.
    subscribersModel.getAllSubscribers((err: Error, results: any) => {
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
      const subscribers = results;
      console.table(subscribers);

      // Pour chaque email, appelle le service d'envoi d'email.
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
