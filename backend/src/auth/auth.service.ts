import * as argon from "argon2";
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(private userService: UserService,
				private prisma: PrismaService) {}

	async createUser(inputMail: string, inputPassword: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: inputMail
			}
		});
		if (user)
			throw new ConflictException("An account with the mail " + inputMail + " already exists.");
	}
}
