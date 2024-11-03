import { PrismaClient } from "@prisma/client";
import { subDays, setHours, setMinutes, format, setSeconds } from "date-fns";

const prisma = new PrismaClient();

export const checkConversationsService = async () => {
  try {
    const now = new Date();
    const start = setSeconds(setMinutes(setHours(subDays(now, 1), 21), 0), 0);
    const end = setSeconds(setMinutes(setHours(now, 21), 0), 0);

    console.log(
      "Buscando conversas entre:",
      format(start, "yyyy-MM-dd HH:mm:ss"),
      "e",
      format(end, "yyyy-MM-dd HH:mm:ss")
    );

    const conversations = await prisma.conversation.findMany({
      where: {
        phone: process.env.WHATSAPP_GROUP_PHONE
        // moment: {
        //   gte: start,
        //   lt: end
        // }
      },
      orderBy: {
        id: "asc"
      }
    });

    return conversations;
  } catch (error) {
    console.error("Erro ao buscar conversas:", error);
    return [];
  }
};
