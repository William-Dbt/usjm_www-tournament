import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUserById(userId: number): Promise<User | null> {
		return (await this.prisma.user.findUnique({
			where: { id: Number(userId) }
		}));
	}

	async getUserByMail(userMail: string): Promise<User | null> {
		return (await this.prisma.user.findUnique({
			where: { email: userMail }
		}));
	}
}
