import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";

import {NewsEntity} from "./news.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {NewsDto, NewsRo} from "./news.dto";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepository: Repository<NewsEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    private toResponseObject(news: NewsEntity): NewsRo {
        return { ...news, creator: news.creator.toResponseObject(false) };
    }

    private ensureOwnership(news: NewsEntity, userId: string) {
        if (news.creator.id !== userId) {
            throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
        }
    }

    async showAll(): Promise<NewsRo[]> {
        const news = await this.newsRepository.find({
            relations: ['creator'],
            order: { created: 'DESC' }
        });
        return news.map(news => this.toResponseObject(news));
    }

    async create(data: NewsDto, userId: string): Promise<NewsRo> {
        const creator = await this.userRepository.findOne({ where: { id: userId } });
        const news = await this.newsRepository.create({ ...data, creator });
        await this.newsRepository.save(news);
        return this.toResponseObject(news);
    }

    async read(id: string): Promise<NewsRo> {
        const news = await this.newsRepository.findOne({ where: { id }, relations: ['creator'] });

        if (!news) throw new HttpException('News not found', HttpStatus.NOT_FOUND);
        return this.toResponseObject(news);
    }

    async update(id: string, userId: string, data: Partial<NewsDto>): Promise<NewsRo> {
        let news = await this.newsRepository.findOne({ where: { id }, relations: ['creator'] });

        if (!news) throw new HttpException('News not found', HttpStatus.NOT_FOUND);
        this.ensureOwnership(news, userId);

        await this.newsRepository.update({ id }, data);
        news = await this.newsRepository.findOne({ where: { id }, relations: ['creator'] });
        return this.toResponseObject(news);
    }

    async destroy(id: string, userId: string) {
        const news = await this.newsRepository.findOne({ where: { id }, relations: ['creator'] });

        if (!news) throw new HttpException('News not found', HttpStatus.NOT_FOUND);
        this.ensureOwnership(news, userId);

        await this.newsRepository.delete({ id });
        return this.toResponseObject(news);
    }
}
