import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { SignInDto, LogInDto } from "./dto";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./types/jwtPayload.type";

@Injectable()
export class AuthService {
	constructor(private userService: UserService,
				private prisma: PrismaService,
				private jwtService: JwtService) {}

	async signIn(userInfos: SignInDto): Promise<User> {
		const isUserExists = await this.userService.getUserByMail(userInfos.email);
		if (isUserExists !== null)
			throw new HttpException(
				"Un compte avec l'email " + userInfos.email + " existe déjà",
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
		else {
			if (!await argon.verify(user.password, logInInfos.password))
				throw new HttpException("Incorrect identifiers", HttpStatus.UNAUTHORIZED);
		}

		const payload = { sub: user.id, email: user.email };
		const accessToken = await this.jwtService.signAsync(payload);

		await this.prisma.user.update({
			where: { id: user.id },
			data: { accessToken: accessToken }
		});
		return { access_token: accessToken };
	}

	// GetMe ----------------------------
	validateAccessToken(payload: JwtPayload) {
		const currentTime = Math.floor(Date.now() / 1000);
		if (payload && payload.exp >= currentTime)
			return payload;

		return null;
	}

	async verifyToken(authorizationHeader: string): Promise<JwtPayload> {
		// Remove "Baerer " string
		const token = authorizationHeader.substring(7);
		try {
			const decodedToken = jwt.verify(
				token,
				process.env.AT_SECRET
			) as JwtPayload;
			return this.validateAccessToken(decodedToken);
		}
		catch {
			console.log("Error getEmailFromToken: Can't find user");
			return null;
		}
	}

	async getMe(authorizationHeader: string): Promise<User | null> {
		if (!authorizationHeader)
			return null;

		try {
			const userPayload = await this.verifyToken(authorizationHeader);
			if (!userPayload)
				return null;

			return (await this.prisma.user.findUnique({
				where: { email: userPayload.email }
			}));
		}
		catch {
			console.log("Error GetMe: Can't find user");
			return null;
		}
	}
}
