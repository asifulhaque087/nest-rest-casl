import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
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
    private readonly UserModel: Model<PermissionDocument>,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    console.log('i am from all auth');
    return `This action returns all auth`;
  }

  async findAllPermissionsOfUser(user: User): Promise<any[]> {
    const permissions = [{ action: 'UPDATE', permissionObject: 'User' }];
    return permissions;
    return await this.UserModel.find(user);
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
