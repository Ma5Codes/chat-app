
import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // Receiver's ID from the route
    const senderId = req.user._id; // Sender's ID from authentication middleware

    // Validate input
    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }

    // Ensure IDs are valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    // Convert IDs to ObjectId
    const senderObjectId = mongoose.Types.ObjectId(senderId);
    const receiverObjectId = mongoose.Types.ObjectId(receiverId);

    // Find or create the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderObjectId, receiverObjectId],
        message: [], // Ensure the messages array is initialized
      });
    }

    // Create the new message
    const newMessage = new Message({
      senderId: senderObjectId,
      receiverId: receiverObjectId,
      message,
    });

    // Add the message to the conversation
    conversation.message.push(newMessage._id);

    // Save both the conversation and the message
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // ID of the user to chat with
    const senderId = req.user._id; // ID of the sender (authenticated user)

    // Validate IDs
    if (!senderId || !userToChatId) {
      return res.status(400).json({ error: "Invalid sender or chat user ID" });
    }

    // Find the conversation between the two users
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message"); // Populate messages in the conversation

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Return all messages in the conversation
    res.status(200).json(conversation.message);
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
