import { Request, Response } from 'express';
import { LoginRequest } from '../types/index.js';
export declare const showLogin: (req: Request, res: Response) => void;
export declare const login: (req: Request<{}, {}, LoginRequest>, res: Response) => Promise<void>;
