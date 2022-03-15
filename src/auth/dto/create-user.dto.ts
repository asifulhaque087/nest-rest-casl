import {  IsString , IsEmail, IsOptional} from "class-validator";
export class CreateUserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    role: string

    @IsString()
    password: string

    @IsOptional()
    @IsString()
    createdAt: Date

    @IsOptional()
    @IsString()
    updatedAt: Date
}
