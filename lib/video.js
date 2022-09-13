import "dotenv/config";
import { Editframe } from "@editframe/editframe-js";
import path from "path";
export const generateWelcomeVideo = (audioFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const editframe = new Editframe({
        clientId: process.env.EDITFRAME_CLIENT_ID,
        token: process.env.EDITFRAME_TOKEN,
      });
      const composition = await editframe.videos.new({
        backgroundColor: "#000",
        dimensions: {
          height: 1080,
          width: 1920,
        },
        duration: 10,
      });

      await composition.addVideo(path.resolve("./welcome.mp4"), {
        size: { format: "fit" },
        timeline: {
          start: 0,
        },
        trim: {
          end: 5,
        },
      });
      await composition.addVideo(path.resolve("./happy.mp4"), {
        size: { format: "fit" },
        timeline: {
          start: 5,
        },
      });
      await composition.addAudio(
        // file
        audioFile
      );
      const video = await composition.encodeSync();
      resolve(video);
    } catch (err) {
      reject(err);
    }
  });
};
