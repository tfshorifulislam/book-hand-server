import nodemailer from "nodemailer";
const mailUser = process.env.MAIL_USER;
const mailPassword = process.env.MAIL_PASSWORD;
if (!mailUser || !mailPassword) {
    throw new Error("Mail credentials are not configured");
}
export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: false,
    auth: {
        user: mailUser,
        pass: mailPassword,
    },
});
