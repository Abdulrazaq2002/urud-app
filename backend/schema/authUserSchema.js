import mongoose from "mongoose";

const UserDetails = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   confirmpassword: {
  //     type: String,
  //     required: true,
  //   },
  gender: {
    type: String,
    required: true,
  },
});

const UserData = mongoose.model("User", UserDetails);

export default UserData;
