import { Router } from "express";
const router = Router();
import { getMarsRoverImages, getMarsWeather} from "../services/marsServices.js";


router.get("/weather", getMarsWeather);
router.get("/rover", getMarsRoverImages);

export default router;