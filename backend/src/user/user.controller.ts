import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('usersList')
	async getUsersList(@Body() exceptId: number) {
		console.log("exceptId", exceptId);
		return this.userService.getUsersList(exceptId);
	}
}
