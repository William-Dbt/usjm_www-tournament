import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [UserModule, AuthModule, PrismaModule],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	],
})
export class AppModule {}
