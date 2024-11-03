import { AxiosRequestConfig } from "axios";
import querystring from "querystring";
import dotenv from "dotenv";

dotenv.config();

export function ZApiRequestOptions(
  url: string,
  method: string = "POST",
  data?: Record<string, any>,
  qs?: Record<string, any>
): AxiosRequestConfig {
  const clientToken = process.env.ZAPI_SECURITY_TOKEN;

  if (!clientToken) {
    throw new Error(
      "ZAPI_SECURITY_TOKEN não está definido nas variáveis de ambiente."
    );
  }
  const urlComplete = qs ? `${url}?${querystring.stringify(qs)}` : url;

  console.log(urlComplete, "urlComplete");

  const config: AxiosRequestConfig = {
    method,
    url: urlComplete,
    headers: {
      "Content-Type": "application/json",
      "client-token": clientToken
    },
    data: method !== "GET" ? data : undefined
  };

  return config;
}
