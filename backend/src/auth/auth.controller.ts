import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, LogInDto } from './dto';
import { Public } from '../custom/PublicDecorator';

@Controller('auth')
export class AuthController {
	constructor(private authservice: AuthService) {}

	@Public()
	@Post('signIn')
	async signIn(@Body() signInInfos: SignInDto) {
		return this.authservice.signIn(signInInfos);
	}

	@Public()
	@Post('logIn')
	async logIn(@Body() logInInfos: LogInDto) {
		return this.authservice.logIn(logInInfos);
	}

	@Get('profile')
	async getProfile(@Request() req) {
		return req.user;
	}

	// TODO: Implement GetMe to check if token still available and call this function in the front to check if the user's token still available
}
