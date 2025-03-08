import { Router } from "express";
import { requestOTP, verifyOTP } from "../controllers/auth.controller";

const router = Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);

// Protected routes (Add your protected routes here)

// Export the router properly
export {router as authRouter}
