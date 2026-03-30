import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const user = req.user;

    const token = chatClient.createToken(user.clerkId);

    res.status(200).json({
      token,
      userId: user.clerkId,
      userName: user.name,
      userImage: user.image,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}