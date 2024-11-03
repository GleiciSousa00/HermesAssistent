import { PrismaClient } from "@prisma/client";

let responseData: any[] = [];
const prisma = new PrismaClient();
export const receiveMessageService = async (data: any) => {
  if (data && data.phone === "120363183165356657-group") {
    responseData.push(data);
    try {
      if (data && data.text && data.text.message) {
        await prisma.conversation.create({
          data: {
            phone: data.phone,
            chatName: data.chatName || "Unknown Chat",
            messageId: data.messageId || "Unknown Message",
            senderName: data.senderName || "Unknown",
            participantPhone: data.participantPhone || "Unknown",
            messages: {
              content: data.text.message,
              timestamp: new Date(data.moment || Date.now())
            },
            moment: new Date(),
            connectedPhone: data.connectedPhone || "Unknown",
            isGroup: data.isGroup || false,
            forwarded: data.forwarded || false,
            fromMe: data.fromMe || false
          }
        });
      }
    } catch (error) {
      console.error("Error saving to databas:", error);
    }
  } else {
    console.log("No data was received.");
  }
  return [...responseData];
};
