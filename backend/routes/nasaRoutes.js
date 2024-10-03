import { Router } from "express";
const router = Router();
import { apod, nasaImageAndVideo} from "../services/nasaServices.js";


router.get("/apod", apod);
router.post("/gallery",nasaImageAndVideo );

export default router;