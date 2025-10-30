import { Request, Response } from "express";
import { SignupRequest, UpdateProfileRequest } from "../types/index.js";
export declare const showLogin: (req: Request, res: Response) => void;
export declare const showSignup: (req: Request, res: Response) => void;
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const signup: (req: Request<{}, {}, SignupRequest>, res: Response) => Promise<void>;
export declare const showProfile: (req: Request, res: Response) => Promise<void>;
export declare const updateProfile: (req: Request<{}, {}, UpdateProfileRequest>, res: Response) => Promise<void>;
