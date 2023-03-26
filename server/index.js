const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = express.Router();

const app = express();

app.use(cors());

const activitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  activity: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true }
});

const Activity = mongoose.model("Activity", activitySchema);
mongoose
  .connect("mongodb://127.0.0.1:27017/finalproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve activities" });
  }
});


app.post("/activities", async (req, res) => {
  try {
    console.log(req.body);
    const { date, activity, duration, description } = req.body;
    const newActivity = new Activity({ date, activity, duration, description });
    await newActivity.save();
    res.json(newActivity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add activity" });
  }
});

app.put("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, activity, duration, description } = req.body;
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { date, activity, duration, description },
      { new: true }
    );
    res.json(updatedActivity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update activity" });
  }
});

app.delete("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndRemove(id);
    res.json({ message: "Activity removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to remove activity" });
  }
});


const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
