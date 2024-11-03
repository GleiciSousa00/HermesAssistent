import { Request, Response } from "express";
import { receiveMessageService } from "./services/receiveMessageService";
import { sendMessageService } from "./services/sendMessageService";
import { listGroupsService } from "./services/listGroupsService";
import { checkConversationsService } from "./services/checkConversationsService";
import { summarizeConversationsService } from "./services/summarizeConversationsService";
const handleController = async (
  serviceFunction: Function,
  req: Request,
  res: Response,
  serviceArgs: any[] = []
) => {
  try {
    const response = await serviceFunction(...serviceArgs);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const listGroupsController = async (req: Request, res: Response) => {
  await handleController(listGroupsService, req, res);
};

const receiveMessageController = async (req: Request, res: Response) => {
  const data = req.body;
  await handleController(receiveMessageService, req, res, [data]);
};

const sendMessageController = async (req: Request, res: Response) => {
  const { phone, message } = req.body;
  await handleController(sendMessageService, req, res, [phone, message]);
};

const summarizeConversationsController = async (
  req: Request,
  res: Response
) => {
  await handleController(summarizeConversationsService, req, res);
};

const checkConversationsController = async () => {
  // const checkConversationsController = async (req: Request, res: Response) => {
  //   await handleController(checkConversationsService, req, res);
  const conversations = await checkConversationsService();

  if (conversations.length > 0) {
    console.log("Conversas encontradas:", conversations);
  } else {
    console.log("Nenhuma conversa encontrada.");
  }
};

export {
  summarizeConversationsController,
  checkConversationsController,
  listGroupsController,
  receiveMessageController,
  sendMessageController
};
