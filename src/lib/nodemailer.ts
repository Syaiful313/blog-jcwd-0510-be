import nodemailer from "nodemailer";
import { GMAIL_APP_PASSWORD, GMAIL_EMAIL } from "../config";

export const transporter = nodemailer.createTransport({
  host: "gmail.com",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});
