import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(private userService: UserService,
				private prisma: PrismaService) {}

	async signIn(inputMail: string, inputPassword: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: inputMail
			}
		});
		if (!user)
			throw new NotFoundException("Email not found");

		// if (!await argon.verify(user.password, inputPassword))
			// throw new ConflictException("Incorrect password");
	}
}
