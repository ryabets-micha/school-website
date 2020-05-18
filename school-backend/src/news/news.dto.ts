import {UserRo} from "../user/user.dto";

export interface NewsDto {
    title: string;
    body: string;
    author: string;
}

export class NewsRo {
    id?: string;
    created: Date;
    updated: Date;
    title: string;
    body: string;
    author: string;
    creator?: UserRo;
}
