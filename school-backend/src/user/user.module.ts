import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserEntity} from "./user.entity";
import {NewsEntity} from "../news/news.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, NewsEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
