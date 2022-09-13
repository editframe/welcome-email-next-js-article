import "dotenv/config";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

export const textToSpeech = (username) => {
  return new Promise((resolve, reject) => {
    /* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. SPDX-License-Identifier: Apache-2.0
    ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
    which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
    https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/polly-examples.html.
    Purpose:
    polly.ts demonstrates how to convert text to speech using Amazon Polly,
    and automatically upload an audio file of the speech to an
    Amazon Simple Storage Service (Amazon S3) bucket.
    Inputs (replace in code):
    - BUCKET_NAME
    - IDENTITY_POOL_ID
    Running the code:
    node polly_synthesize_to_s3.js
    */
    // snippet-start:[Polly.JavaScript.general-examples.synthesizetos3_V3]
    // Example Node.js AWS Polly Script that saves an mp3 file to S3

    const Polly = new AWS.Polly({
      signatureVersion: "v4",
      region: "us-east-1",
    });


    let pollyparams = {
      Text: `<speak>Hello ${username}, <break time="0.5s"/> Welcome to the Editframe platform <break time="0.4s"/>  <amazon:breath duration="medium" volume="x-loud"/> We're happy to have you here. <break time="2s"/>   <amazon:effect name="whispered"><prosody rate="slow">we really are.</prosody></amazon:effect></speak>`,
      TextType: "ssml",
      OutputFormat: "mp3",
      VoiceId: "Amy",
    };
    Polly.synthesizeSpeech(pollyparams, (err, data) => {
      if (err) {
        reject(err.message);
        console.log(err.message);
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          fs.writeFile(`./${username}.mp3`, data.AudioStream, function (err) {
            if (err) {
              reject(err.message);
              return console.log(err);
            }
            console.log("The file was saved!");
            resolve(path.resolve(`./${username}.mp3`));
          });
        }
      }
    });
  });
};
