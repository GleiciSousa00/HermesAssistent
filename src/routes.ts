import { Router } from "express";
import {
  checkConversationsController,
  listGroupsController,
  receiveMessageController,
  sendMessageController,
  summarizeConversationsController
} from "./controllers";
import bodyParser from "body-parser";

const router = Router();

router.use(bodyParser.json());

router.get("/list-groups", listGroupsController);
router.post("/receive-message", receiveMessageController);
router.post("/send-message", sendMessageController);
router.post("/check-conversations", checkConversationsController);
router.get("/summarize-messages", summarizeConversationsController);

export default router;
