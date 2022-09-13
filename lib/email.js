import "dotenv/config";
import nodemailer from "nodemailer";
const mailer = nodemailer.createTransport({
  service: "SendPulse", // no need to set host or port etc.
  auth: {
    pass: process.env.EMAIL_PASSWORD,
    user: process.env.EMAIL_ADDRESS,
  },
});

export const sendMail = (email, username, video) => {
  return new Promise(async (resolve, reject) => {
    const audioFile = await textToSpeech(username);
    mailer.sendMail(
      {
        from: "VERIFIED SENDPLUSE EMAIL SENDER",
        to: email,
        subject: `Welcome ${username} to our platform`,
        html: `<!DOCTYPE html> 
                  <html> 
                  <body> 
                  
                  <video width="400" controls>
                    <source src="${video.streamUrl}" type="video/mp4">
                    <a href="${video.streamUrl}">
                    <img src="${video.thumbnailUrl}" />
                    </a>
                  </video>
                  
                  <p>
                 Welcome to our platform. We're happy to have you here
                  </p>
                  
                  </body> 
                  </html>`,
      },
      function (error) {
        if (error) {
          consol.log(error);
          reject(error);
        }
        resolve("done");
      }
    );
  });
};
