import {Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe} from '@nestjs/common';

import {UserService} from "./user.service";
import {UserDto} from "./user.dto";

@Controller()
export class UserController {
    private logger: Logger = new Logger('UserController');

    constructor(private userService: UserService) {}

    @Get('api/users')
    showAllUsers() {
        this.logger.log('Show all users');
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDto) {
        this.logger.log('LOGIN: ' + JSON.stringify(data));
        return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe)
    register(@Body() data: UserDto) {
        this.logger.log('REGISTER: ' + JSON.stringify(data));
        return this.userService.register(data);
    }
}
