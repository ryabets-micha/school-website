import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {NewsService} from "./news.service";
import {NewsDto} from "./news.dto";

@Controller('api/news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @Get()
    showAllNews() {
        return this.newsService.showAll();
    }

    @Post()
    creteNews(@Body() data: NewsDto) {
        return this.newsService.create(data);
    }

    @Get(':id')
    readNews(@Param('id') id: string) {
        return this.newsService.read(id);
    }

    @Put(':id')
    updateNews(@Param('id') id: string, @Body() data: Partial<NewsDto>) {
        return this.newsService.update(id, data);
    }

    @Delete(':id')
    destroyNews(@Param('id') id: string) {
        return this.newsService.destroy(id);
    }
}
