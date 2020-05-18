import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity('news')
export class NewsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @Column('text')
    title: string;

    @Column('text')
    body: string;

    @Column('text')
    author: string;

    @ManyToOne(type => UserEntity, creator => creator.news)
    creator: UserEntity;
}
