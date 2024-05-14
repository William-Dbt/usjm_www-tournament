import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('usersList')
	async getUsersList(@Body('exceptId') exceptId: number) {
		return (await this.userService.getUsersList(exceptId));
	}
}
