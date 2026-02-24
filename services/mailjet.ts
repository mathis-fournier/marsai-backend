import * as Mailjet from "node-mailjet";
import { promises as fs } from "fs";
import path from "path";
import Attachment from "../interfaces/services.interfaces";

// Initialize the Mailjet client
const mailjet = new Mailjet.Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC!,
  apiSecret: process.env.MJ_APIKEY_PRIVATE!,
});

/**
 * Sends an email using Mailjet.
 * @param to - The recipient's email address.
 * @param subject - The email subject.
 * @param textBody - The plain text body of the email.
 * @param htmlBody - The HTML body of the email.
 * @param attachments - Optional array of attachments.
 * @param fromEmail - The sender's email address.
 * @param fromName - The sender's name.
 */
async function sendEmail({
  to,
  subject,
  textBody,
  htmlBody,
  attachments,
  fromEmail = "gabriel.viallard-fortier@laplateforme.io",
  fromName = "MarsAI - LYON | GEM",
}: {
  to: string;
  subject: string;
  textBody: string;
  htmlBody: string;
  attachments: Attachment[];
  fromEmail?: string;
  fromName?: string;
}): Promise<any> {
  try {
    const attachmentData = await Promise.all(
      attachments.map(async (attachment) => {
        const content = await fs.readFile(attachment.path, {
          encoding: "base64",
        });
        return {
          ContentType: getMimeType(attachment.filename),
          Filename: attachment.filename,
          Base64Content: content,
        };
      }),
    );
    const requestData: Mailjet.SendEmailV3_1.Message = {
      From: {
        Email: fromEmail,
        Name: fromName,
      },
      To: [{ Email: to }],
      Subject: subject,
      TextPart: textBody,
      HTMLPart: htmlBody,
    };

    if (attachmentData.length > 0) {
      requestData.Attachments = attachmentData;
    }

    const request = mailjet
      .post("send", { version: "v3.1" })
      .request({ Messages: [requestData] });
    const result = await request;
    console.log("Email sent successfully:", result.body);
    return result.body;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}

const getMimeType = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
};

export default sendEmail;
