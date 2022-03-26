import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from 'src/auth/dto/create-permission-dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import {
  Permission,
  PermissionDocument,
} from 'src/auth/entities/permission.entity';
import { Role, RoleDocument } from 'src/auth/entities/role.entity';
import { User, UserDocument } from 'src/auth/entities/user.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly PermissionModel: Model<PermissionDocument>,
    @InjectModel(Role.name) private readonly RoleModel: Model<RoleDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    let newPermission = new this.PermissionModel(createPermissionDto)
    newPermission = await newPermission.save()
    return  newPermission

  }

  async findAll() {
    const permissions = await this.PermissionModel.aggregate([
        {
          $lookup: {
            from: "roles",
            localField: "_id",
            foreignField: "permissions",
            as: "roles",
          },
        },
      ])
    return permissions
  }

  async findAllPermissionsOfUser(user: User): Promise<any[]> {
    const permissions = [{ action: 'UPDATE', subject: 'User' }];
    return permissions;
    return await this.PermissionModel.find(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
