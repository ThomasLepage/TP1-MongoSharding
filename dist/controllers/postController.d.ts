import { Request, Response } from "express";
import { CreatePostRequest, CreateAnswerRequest, CreateReplyRequest } from "../types/index.js";
export declare const getAllPosts: (req: Request, res: Response) => Promise<void>;
export declare const createPost: (req: Request<{}, {}, CreatePostRequest>, res: Response) => Promise<void>;
export declare const createAnswer: (req: Request<{}, {}, CreateAnswerRequest>, res: Response) => Promise<void>;
export declare const createReply: (req: Request<{}, {}, CreateReplyRequest>, res: Response) => Promise<void>;
export declare const listMessages: (req: Request, res: Response) => Promise<void>;
