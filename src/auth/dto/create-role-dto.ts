import {  IsOptional, IsString } from "class-validator";
export class CreateRoleDto {

    @IsString()
    name: string
    
    @IsOptional()
    @IsString()
    permission: string

    @IsOptional()
    @IsString()
    createdAt: Date

    @IsOptional()
    @IsString()
    updatedAt: Date

}
