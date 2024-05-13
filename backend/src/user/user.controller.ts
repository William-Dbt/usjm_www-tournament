import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('usersList')
	async getUsersList(@Body() body: any, @Req() req: any) {
		console.log("body", body);
		return (await this.userService.getUsersList(18));
	}

	@Post('machin')
	async machin(@Body() body: any, @Req() req: any) {
		console.log("body", body);
	}
}
