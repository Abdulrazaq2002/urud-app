import postData from "../schema/post.schema.js";
import bcrypt from "bcryptjs";

export const getImg = async (req, res) => {
  try {
    const GetImg = await postData.find();
    res.send(GetImg);
  } catch (error) {
    res.status(400).json({ error: "Error at get-img controller" });
    console.log(error.message);
  }
};
export const getImgById = async (req, res) => {
  try {
    const GetImg = await postData.findById(req.params.id);
    res.send(GetImg);
  } catch (error) {
    res.status(400).json({ error: "Error at get-img controller" });
    console.log(error.message);
  }
};

export const postImg = async (req, res) => {
  try {
    const { user, user_id, description } = req.body;

    const newPost = await postData.create({
      image: req.file.filename,
      user: user,
      user_id: user_id,
      description: description,
    });
    res.json(newPost);
  } catch (error) {
    res.status(400).json({ error: "Error at post-img controller" });
    console.log(error.message);
  }
};

export const editPost = async (req, res) => {
  try {
    const { description, image } = req.body;
    const updatedPost = await postData.findByIdAndUpdate(
      req.params.id,
      { description: description, image: image },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: "Error at edit-post controller" });
    console.log(error.message);
  }
};
export const deletePost = async (req, res) => {
  try {
    const userPost = await postData.findById(req.params.id);
    if (!userPost) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    await postData.findByIdAndDelete(userPost);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(400).json({ error: "Error at delete-post controller" });
    console.log(error.message);
  }
};
