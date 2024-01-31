import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUserById(userId: number): Promise<User | undefined> {
		return (await this.prisma.user.findFirst({
			where: { id: Number(userId) }
		}));
	}
}
