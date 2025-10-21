import { Request, Response } from "express";
import { LoginRequest, SignupRequest } from "../types/index.js";
export declare const showLogin: (req: Request, res: Response) => void;
export declare const showSignup: (req: Request, res: Response) => void;
export declare const login: (req: Request<{}, {}, LoginRequest>, res: Response) => Promise<void>;
export declare const signup: (req: Request<{}, {}, SignupRequest>, res: Response) => Promise<void>;
