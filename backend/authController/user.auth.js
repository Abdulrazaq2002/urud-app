import UserData from "../schema/authUserSchema.js";
import bcrypt from "bcryptjs";
import generateWebToken from "../utils/generateToken.js";
//get user data
export const getSignin = async (req, res) => {
  try {
    const GetUser = await UserData.find();
    res.send(GetUser);
  } catch (error) {
    console.log(error.message);
  }
};

//semd user data in mongodb
export const postSignin = async (req, res) => {
  try {
    const { username, fullname, password, confirmpassword, gender } = req.body;

    if (password != confirmpassword) {
      return res.status(400).json({ error: "Error Password Did't Match" });
    }

    const user = await UserData.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Error User Already Exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const getData = new UserData({
      fullname,
      username,
      password: hashPassword,
      //   confirmpassword: hashPassword,
      gender,
    });

    const userData = await getData.save();
    generateWebToken(userData._id, res);
    res.status(201).json({
      _id: userData._id,
      fullname: userData.fullname,
      username: userData.username,
      password: userData.password,
      //   confirmpassword: userData.confirmpassword,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const postlogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserData.findOne({ username });
    const isPasswordcorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordcorrect) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      password: user.password,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const postLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out SuccessFully" });
  } catch (error) {
    console.log("Error in logged out controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const acDelete = async (req, res) => {
  try {
    const userId = await UserData.findById(req.params.id);
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserData.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account delete successfully" });
  } catch (error) {
    console.log("Error in deleting controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { fullname, username, password, gender } = req.body;

    const user = await UserData.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the username is being updated
    if (username && username !== user.username) {
      // Check if the provided password matches the user's password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Enter password correctly" });
      }
    }

    // Update user fields
    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.gender = gender || user.gender;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: "Error While Updating Profile",
      error: error.message,
    });
  }
};
