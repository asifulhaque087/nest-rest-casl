import {  IsOptional, IsString } from "class-validator";
export class CreatePermissionDto {

    @IsString()
    action : string
    
    @IsString()
    permissionObject : string

}
