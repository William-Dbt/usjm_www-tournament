import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { env } from 'process';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: env.AT_SECRET,
			signOptions: { expiresIn: '7d' },
		})
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
