import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from 'src/auth/dto/create-role-dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { Role, RoleDocument } from 'src/auth/entities/role.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly RoleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {

    let pId = new mongoose.Types.ObjectId(createRoleDto.permission)

    let newRole = new this.RoleModel()

    newRole.name = createRoleDto.name
    newRole.permissions.push(pId)

    newRole = await newRole.save()
    return newRole 
  }

  findAll() {
    return this.RoleModel.find().populate("permissions")
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
