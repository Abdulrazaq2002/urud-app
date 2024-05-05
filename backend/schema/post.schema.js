import mongoose from "mongoose";

const postData = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  user_id: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Datapost", postData);
