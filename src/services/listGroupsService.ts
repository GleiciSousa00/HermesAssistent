import axios from "axios";
import { ZApiRequestOptions } from "../utils/ZApiRequestOptions";
import dotenv from "dotenv";

dotenv.config();

interface QueryString {
  page?: string;
  pageSize?: string;
}

export async function listGroupsService(
  qs: QueryString = { page: "1", pageSize: "2" }
) {
  try {
    const url = `${process.env.ZAPI_API_BASE_URL}/chats`;

    console.log("listGroupsService", url);
    console.log("Client Token:", process.env.ZA);

    const options = ZApiRequestOptions(url, "GET", undefined, qs);

    const response = await axios.request(options);

    const data = response.data;

    return { success: true, data };
  } catch (error) {
    console.error("Erro ao carregar grupo:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
