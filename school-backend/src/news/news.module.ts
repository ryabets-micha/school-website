import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsEntity } from "./news.entity";
import {UserEntity} from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, UserEntity])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
