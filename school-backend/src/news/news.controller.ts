import {Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards} from '@nestjs/common';
import {NewsService} from "./news.service";
import {NewsDto} from "./news.dto";
import {AuthGuard} from "../shared/auth.guard";
import {User} from "../user/user.decorator";

@Controller('api/news')
export class NewsController {
    private logger: Logger = new Logger('NewsController');

    constructor(private newsService: NewsService) {}

    private logData(opt: any) {
        opt.user && this.logger.log('USER: ' + JSON.stringify(opt.user));
        opt.data && this.logger.log('DATA: ' + JSON.stringify(opt.data));
        opt.id && this.logger.log('NEWS: ' + JSON.stringify(opt.id));
    }

    @Get()
    showAllNews() {
        this.logger.log('Show all news');
        return this.newsService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    creteNews(@Body() data: NewsDto, @User('id') user: string) {
        this.logData({ data, user});
        return this.newsService.create(data, user);
    }

    @Get(':id')
    readNews(@Param('id') id: string) {
        this.logData({ id });
        return this.newsService.read(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    updateNews(
        @Param('id') id: string,
        @Body() data: Partial<NewsDto>,
        @User('id') user: string
    ) {
        this.logData({ id, data, user });
        return this.newsService.update(id, user, data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyNews(@Param('id') id: string, @User('id') user: string) {
        this.logData({ id, user });
        return this.newsService.destroy(id, user);
    }
}
