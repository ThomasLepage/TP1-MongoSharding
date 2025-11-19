import { Request, Response } from "express";
import { CreateGroupRequest } from "../types/index.js";
export declare const createGroup: (req: Request<{}, {}, CreateGroupRequest>, res: Response) => Promise<void>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const showGroups: (req: Request, res: Response) => Promise<void>;
