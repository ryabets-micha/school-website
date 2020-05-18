import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {UserRo} from "./user.dto";
import {NewsEntity} from "../news/news.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Column('text')
    password: string;

    @OneToMany(type => NewsEntity, news => news.creator)
    news: NewsEntity;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = true): UserRo {
        const { id, created, username, token } = this;
        const responseObject: UserRo = { id, created, username };

        if (showToken) responseObject.token = token;
        if (this.news) responseObject.news = this.news;

        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
    }
}
