import {  IsString , IsEmail, IsOptional} from "class-validator";
export class LoginUserDto {

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    phone: string

    @IsString()
    password: string
}