import { checkConversationsService } from "./checkConversationsService";
import OpenAI from "openai";
import { sendMessageService } from "./sendMessageService";
import util from "util";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const summarizeConversationsService = async () => {
  try {
    const formatTextToSummarize = await formatMessagesToSummarize();
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Resuma as seguintes mensagens: \n${formatTextToSummarize}`
        }
      ],
      max_tokens: 150
    });
    const summary =
      response.choices[0]?.message?.content ||
      "Não foi possível gerar um resumo.";
    const phone = process.env.WHATSAPP_GROUP_PHONE;
    if (!phone) {
      console.error("WhatsApp phone number not found");
      return "WhatsApp phone number not found";
    }
    const sendMessageTextResponse = await sendMessageService(phone, summary);

    if (!sendMessageTextResponse.success) {
      console.error(
        "Erro ao enviar a mensagem resumida:",
        sendMessageTextResponse.message
      );
    }
    return summary;

    // const audioFile = await convertTextToSpeech(summary);
  } catch (error) {
    console.error("Erro ao tentar resumir as mensagens:", error);
    return "Erro ao tentar resumir as mensagens.";
  }

  async function formatMessagesToSummarize() {
    const conversations = await checkConversationsService();
    if (!conversations) {
      return "Nenhuma conversa disponível para resumir.";
    }

    const formatTextToSummarize = conversations
      .map((conversation) => {
        if (
          conversation.messages &&
          typeof conversation.messages === "object" &&
          "content" in conversation.messages
        ) {
          const messagesObj = conversation.messages as { content: string };
          return `De ${conversation.senderName}: ${messagesObj.content}`;
        }
        return null;
      })
      .filter((message) => message !== null)
      .join("\n");

    if (!formatTextToSummarize) {
      return "Nenhuma mensagem disponível para resumir.";
    }
    return formatTextToSummarize;
  }

  // async function convertTextToSpeech(summary: string) {
  //   try {
  //     const apiUrl = "https://api.voicerss.org/";
  //     const apiKey = process.env.TEXT_TO_SPEECH_API_KEY;
  //     if (!apiKey) {
  //       throw new Error(
  //         "API key is missing. Please set VOICE_RSS_API_KEY in your environment variables."
  //       );
  //     }
  //     const params = new URLSearchParams({
  //       key: apiKey,
  //       src: summary,
  //       hl: "pt-br",
  //       v: "Linda",
  //       r: "0",
  //       c: "mp3",
  //       f: "48khz_16bit_stereo"
  //     });

  //     const response = await fetch(`${apiUrl}?${params.toString()}`);

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch audio: ${response.statusText}`);
  //     }

  //     const audioContent = await response.arrayBuffer();

  //     const outputPath = path.resolve(__dirname, "output.mp3");

  //     const writeFile = util.promisify(fs.writeFile);
  //     await writeFile(outputPath, Buffer.from(audioContent), "binary");

  //     return outputPath;

  //     console.log("Audio content successfully written to file: output.mp3");
  //   } catch (error) {
  //     console.error("Error during text-to-speech conversion: ", error);
  //   }
  // }
};
