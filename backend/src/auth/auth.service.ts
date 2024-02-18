import * as argon from "argon2";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { SignInDto, LogInDto } from "./dto";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(private userService: UserService,
				private prisma: PrismaService,
				private jwtService: JwtService) {}

	async signIn(userInfos: SignInDto): Promise<User> {
		const isUserExists = await this.userService.getUserByMail(userInfos.email);
		if (isUserExists !== null)
			throw new HttpException(
				"Un compte sous l'email " + userInfos.email + " existe déjà",
				HttpStatus.FOUND
			);
		
		const hashedPassword = await argon.hash(userInfos.password);
		const newUser = await this.prisma.user.create({
			data: {
				firstName: userInfos.firstName,
				lastName: userInfos.lastName,
				email: userInfos.email,
				password: hashedPassword
			}
		});
		if (newUser !== null)
			return newUser;

		throw new HttpException("Internal server error.", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	async logIn(logInInfos: LogInDto): Promise<{ access_token: string }> {
		const user = await this.userService.getUserByMail(logInInfos.email);
		if (user === null)
			throw new HttpException("Incorrect identifiers", HttpStatus.NOT_FOUND);
		else
			if (!await argon.verify(user.password, logInInfos.password))
				throw new HttpException("Incorrect identifiers", HttpStatus.UNAUTHORIZED);

		const payload = { sub: user.id, email: user.email };
		return { access_token: await this.jwtService.signAsync(payload) };
	}
}
