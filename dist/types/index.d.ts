import { Document } from "mongoose";
export interface IUser extends Document {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar: string;
}
export interface IReply {
    message: string;
    author: string;
    creationDate: Date;
}
export interface IAnswer {
    message: string;
    author: string;
    creationDate: Date;
    replies: IReply[];
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
export interface SignupRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar: string;
}
export interface UpdateProfileRequest {
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    avatar: string;
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
export interface CreateReplyRequest {
    authorId: number;
    messageId: number;
    answerIndex: number;
    reply: string;
}
