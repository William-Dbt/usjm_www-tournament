import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogInDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
