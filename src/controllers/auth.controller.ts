import {StatusCodes} from "http-status-codes";
import {Request, Response, RequestHandler} from "express";
import {verifyPhoneNumber} from "../utils/VerifyPhoneNumber";
import {twilioService} from "../service/twilio.service";

export const sendSMS = async (req: Request<{}, {}, { phone: string, message: string }>, res: Response) => {
    const { phone, message } = req.body;

    if (!phone || !verifyPhoneNumber(phone) || !message) {
        return res.status(StatusCodes.BAD_REQUEST).send("Phone and message are required");
    }

    return res.status(StatusCodes.OK).send("SMS sent successfully!");
}

export const requestOTP :RequestHandler<{},{},{phone:string}> = async (req, res) => {
    const {phone} = req.body
    if (!phone || !verifyPhoneNumber(phone))
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid phone number"
        })
    else {
        const otp = await twilioService.sendOTP(phone);
        if (otp === false)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to send OTP"
            })
        else  // Success case
            res.status(StatusCodes.OK).json({
                message: ""
            })
    }
}

export const verifyOTP: RequestHandler<{}, {}, { phone: string; code: string }> = async (req, res) => {
    const {phone, code} = req.body;
    if (!phone || code.length !== 6) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid"});
    } else {
        const isVerified = await twilioService.verifyOTP(phone, code);
        if (!isVerified) {
            res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid OTP"});
        } else // Success case
        res.status(StatusCodes.OK).json({message: "Success"});
    }
};

