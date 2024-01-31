import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authservice: AuthService) {}

	@Get("createUser")
	async createUser(@Body() userInfos: CreateUserDto ) {
		return this.authservice.createUser(userInfos);
	}
}
