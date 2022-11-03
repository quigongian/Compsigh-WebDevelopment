import nodemailer, { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { google } from "googleapis";
import { envVars } from "../util/env-vars";
import { HttpError } from "../util/HttpError";
import { HttpStatus } from "../util/HttpStatus";

async function createTransport(): Promise<
    Transporter<SMTPTransport.SentMessageInfo>
> {
    const oauth2Client = new google.auth.OAuth2(
        envVars.CLIENT_ID,
        envVars.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
        refresh_token: envVars.REFRESH_TOKEN,
    });
    const accessTokenResponse = await oauth2Client.getAccessToken();
    if (!accessTokenResponse || !accessTokenResponse.token) {
        throw new HttpError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Error getting access token"
        );
    }
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: envVars.APP_EMAIL_ADDRESS,
            accessToken: accessTokenResponse.token,
            clientId: envVars.CLIENT_ID,
            clientSecret: envVars.CLIENT_SECRET,
            refreshToken: envVars.REFRESH_TOKEN,
        },
    });
}

async function sendEmail(mailOptions: Mail.Options): Promise<void> {
    // const transport = await createTransport();
    console.log("Sending email...");
    console.log(mailOptions);
    // await transport.sendMail(mailOptions);
    // transport.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.error(error);
    //         throw new HttpError(
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //             "Error sending email"
    //         );
    //     } else {
    //         console.log("Email sent: " + info.response);
    //     }
    // });
}

async function sendVerificationEmail(
    email: string,
    code: string
): Promise<void> {
    await sendEmail({
        from: envVars.APP_EMAIL_ADDRESS,
        to: email,
        subject: `${envVars.APP_NAME} email verification`,
        html: `<p>Your email verification code is: <b>${code}</b>.It will expire in <b>1 hour</b>.</p>`,
    });
}

async function sendPasswordResetEmail(
    email: string,
    code: string
): Promise<void> {
    await sendEmail({
        from: envVars.APP_EMAIL_ADDRESS,
        to: email,
        subject: `${envVars.APP_NAME} password reset code`,
        html: `<p>Your password code is: <b>${code}</b>.It will expire in <b>1 hour</b>.</p>`,
    });
}

async function sendCheckInReminderEmail(
    email: string,
    firstName: string,
    daysSinceLastCheckIn: number
): Promise<void> {
    await sendEmail({
        from: envVars.APP_EMAIL_ADDRESS,
        to: email,
        subject: `${envVars.APP_NAME} check in reminder`,
        html: `<p>Hi ${firstName}, you have missed the last ${daysSinceLastCheckIn} check ins. It's time to check in!</p>`,
    });
}

async function sendVerifyEmailReminderEmail(
    email: string,
    firstName: string,
    accountExpirationDate: Date
): Promise<void> {
    await sendEmail({
        from: envVars.APP_EMAIL_ADDRESS,
        to: email,
        subject: `${envVars.APP_NAME} verify email reminder`,
        html: `<p>Hi ${firstName}, please verify your email before ${accountExpirationDate.toDateString()}, to activate your account.</p>`,
    });
}

export const emailService = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendCheckInReminderEmail,
    sendVerifyEmailReminderEmail,
};
