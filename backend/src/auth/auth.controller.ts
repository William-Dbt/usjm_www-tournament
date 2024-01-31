import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authservice: AuthService) {}

	@Get("signin")
	async signIn(@Body("email") email: string ) {
		return this.authservice.signIn(email, "");
	}
}
