import {IsNotEmpty} from "class-validator";
import {NewsEntity} from "../news/news.entity";

export class UserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class UserRo {
    id: string;
    username: string;
    created: Date;
    token?: string;
    news?: NewsEntity;
}
