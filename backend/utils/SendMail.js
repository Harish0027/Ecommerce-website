const sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD, // ✅ correct key is `pass`, not `password`
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("SendMail Error:", err);;
    throw err;
  }
};
