import * as argon from "argon2";
import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from "./dto";

@Injectable()
export class AuthService {
	constructor(private userService: UserService,
				private prisma: PrismaService) {}

	async isStrongPassword(password: string) {
		if (password.length < 6)
			throw new NotAcceptableException("Password must be longer than 6 characters.");

		// TODO: Password policy
	}

	async createUser(userInfos: CreateUserDto) {
		const user = this.userService.getUserByMail(userInfos.email);
		if (user)
			throw new ConflictException("An account with the mail " + userInfos.email + " already exists.");

		
		
		console.log("userInfos ", userInfos);
		
		const hashedPassword = await argon.hash(userInfos.password);
		console.log("password: ", userInfos.password);
		console.log("hashed password: ", hashedPassword);
	}
}
