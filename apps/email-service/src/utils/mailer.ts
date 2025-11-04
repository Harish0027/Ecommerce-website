import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "sutarharish143@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendMail = async ({
  email,
  subject,
  text,
}: {
  email: string;
  subject: string;
  text: string;
}) => {
  try {
    const res = await transporter.sendMail({
      from: `"Harish Sutar" <sutarharish143@gmail.com>`, // use proper email format
      to: email,
      subject,
      text,
    });

    console.log("MESSAGE SENT:", res.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;
