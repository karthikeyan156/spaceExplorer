import { Router } from "express";
const router = Router();
import { subscribe} from "../services/userServices.js";


router.post("/subscribe", subscribe);

export default router;