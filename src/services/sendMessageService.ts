import axios from "axios";
import { ZApiRequestOptions } from "../utils/ZApiRequestOptions";
require("dotenv").config();

export async function sendMessageService(phone: string, message: string) {
  if (!phone || !message) {
    throw new Error("Phone and type are required");
  }
  try {
    const data = { phone, message };

    const url = `${process.env.ZAPI_API_BASE_URL}/send-text`;

    const options = ZApiRequestOptions(url, "POST", data);

    const response = await axios.request(options);

    const responseData = response.data;
    console.log("responseData", responseData);
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Erro no envio da mensagem:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
