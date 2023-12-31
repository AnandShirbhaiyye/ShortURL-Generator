import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UrlShorts from "./models/UrlShorts.js";

const app = express();
app.use(express.json());

dotenv.config();

async function connectMongoDB() {
  const conn = await mongoose.connect(process.env.MONGODB_URL);
  if (conn) {
    console.log("Connected to MongoDB");
  }
}
connectMongoDB();

app.get("/shorturls", async (req, res) => {
  const shortUrls = await UrlShorts.find();

  res.json({
    success: true,
    message: "all shortsUrls fetched successfully",
    data: shortUrls,
  });
});

app.post("/shortUrls", async (req, res) => {
  const { full } = req.body;

  const newTask = new UrlShorts({
    full,
  });

  const savedfull = await newTask.save();

  res.json({
    success: true,
    message: "shortsUrls saved successfully",
    data: savedfull,
  });
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await UrlShorts.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
 await shortUrl.save();

  // res.redirect(shortUrl.full);
  res.json({ full: shortUrl.full, clicks: shortUrl.clicks });
});

app.put("/updateurl", async (req, res) => {
  await UrlShorts.updateOne(
    { _id: req.body.id },

    {
      $set: req.body,
    }
  );

  res.json({
    success: true,
    message: "ShortUrl successfully updated...",
  });
});

app.post("/url/delete", async(req, res)=>{
  const { urlId } = req.body;

  const delRes = await UrlShorts.deleteOne({
    _id:  urlId,
  });

  const deleted = delRes?.deletedCount > 0 ; 

  res.json({
    success: deleted,
    message: deleted ? "URL Successfully Deleted" : "Something went wrong",
  });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
