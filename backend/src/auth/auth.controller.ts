import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authservice: AuthService) {}

	@Get("createUser")
	async createUser(@Body("email") email: string ) { // TODO: Replace with DTO
		return this.authservice.createUser(email, "");
	}
}
