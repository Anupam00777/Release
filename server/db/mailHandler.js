const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ email, subject, text = null, html = null }) => {
  const msg = {
    to: email, // Change to your recipient
    from: process.env.RELEASE_MAIL, // Change to your verified sender
    subject: subject,
    text: text,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent to ", email);
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { sendEmail };
