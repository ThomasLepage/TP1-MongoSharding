import { Document } from "mongoose";
export interface IUser extends Document {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
}
export interface IAnswer {
    message: string;
    author: string;
    creationDate: Date;
}
export interface IPost extends Document {
    post_id: number;
    message: string;
    author: string;
    answers: IAnswer[];
    creationDate: Date;
}
export interface LoginRequest {
    email: string;
}
export interface CreatePostRequest {
    authorId: number;
    message: string;
}
export interface CreateAnswerRequest {
    authorId: number;
    messageId: number;
    answer: string;
}
