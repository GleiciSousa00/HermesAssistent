-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "chatName" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "participantPhone" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "moment" TIMESTAMP(3) NOT NULL,
    "connectedPhone" TEXT NOT NULL,
    "isGroup" BOOLEAN NOT NULL,
    "forwarded" BOOLEAN NOT NULL,
    "fromMe" BOOLEAN NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);
