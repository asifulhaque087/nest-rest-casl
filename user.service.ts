import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { User, UserDocument } from 'src/auth/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserModel.findOne({email:createUserDto.email})

    if (user){
      throw new BadRequestException("User already exists")
    }

    createUserDto["createdAt"] = new Date()

    let newUser = new this.UserModel(createUserDto)
    newUser = await newUser.save()

    const token = newUser.getSignedJwtToken()

    return token;

  }

  async login(loginUserDto: LoginUserDto){

    const user = await this.UserModel.findOne({email:loginUserDto.email})

    if (!user){
      throw new NotFoundException("User not found")
    }

    const match = await user.matchPassword(loginUserDto.password)

    console.log("user is ",user)
    if (!match){
      throw new BadRequestException("Wrong Credentials")
    }

    const token = user.getSignedJwtToken()
    return token;

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
