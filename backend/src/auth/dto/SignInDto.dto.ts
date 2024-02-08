import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
	@IsNotEmpty()
	@IsString()
	firstName: string

	@IsNotEmpty()
	@IsString()
	lastName: string

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(14)
	@Matches(/\d+/g, {
		message: "password must contains at least one number"
	})
	password: string
}
