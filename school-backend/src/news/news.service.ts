import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";

import {NewsEntity} from "./news.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {NewsDto} from "./news.dto";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepository: Repository<NewsEntity>
    ) {}

    async showAll() {
        return await this.newsRepository.find();
    }

    async create(data: NewsDto) {
        const news = await this.newsRepository.create(data);
        await this.newsRepository.save(news);
        return news;
    }

    async read(id: string) {
        return await this.newsRepository.findOne({ where: { id } });
    }

    async update(id: string, data: Partial<NewsDto>) {
        await this.newsRepository.update({ id }, data);
        return await this.newsRepository.findOne({ id });
    }

    async destroy(id: string) {
        await this.newsRepository.delete({ id });
        return { deleted: true };
    }
}
