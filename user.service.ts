import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { User, UserDocument } from 'src/auth/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { Role, RoleDocument } from 'src/auth/entities/role.entity';
import { Permission, PermissionDocument} from 'src/auth/entities/permission.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,

    @InjectModel(Role.name) private readonly RoleModel: Model<RoleDocument>,

    @InjectModel(Permission.name)
    private readonly PermissionModel: Model<PermissionDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {

    // const user = await this.UserModel.findOne({email:createUserDto.email})

    const user = this.UserModel.findOne({email: createUserDto.email}).populate({
      path: "roles",
      populate: {
        path:"permissions"
      }
    })

    if (user){
      throw new BadRequestException("User already exists")
    }


    let newUser = new this.UserModel()
    newUser.name = createUserDto.name
    newUser.email = createUserDto.email
    newUser.password = createUserDto.password
    newUser.createdAt = new Date()
    newUser.roles.push(new mongoose.Types.ObjectId(createUserDto.role))

    newUser = await newUser.save()

    const token = newUser.getSignedJwtToken()

    return token;

  }


  // async login(loginUserDto: LoginUserDto){

  //   const user = await this.UserModel.findOne({email:loginUserDto.email})

  //   if (!user){
  //     throw new NotFoundException("User not found")
  //   }

  //   const match = await user.matchPassword(loginUserDto.password)

  //   if (!match){
  //     throw new BadRequestException("Wrong Credentials")
  //   }

  //   const token = user.getSignedJwtToken()
  //   return token;

  // }

  async login(loginUserDto: LoginUserDto){

    const user = await this.UserModel.findOne({email: loginUserDto.email}).populate({
      path: "roles",
      populate: {
        path:"permissions"
      }
    })

    if (!user){
      throw new NotFoundException("User not found")
    }

    const match = await user.matchPassword(loginUserDto.password)

    if (!match){
      throw new BadRequestException("Wrong Credentials")
    }

    const token = user.getSignedJwtToken()
    user["token"] = token
    return user;

    
    // this.RoleModel.find()


    // let checkUser:UserDocument[]  = await this.UserModel.aggregate([
    // { 
    //     $match:{email:"userone@gmail.com"}
    // },
    // {
    //     $lookup: {
    //       from: "roles",
    //       localField: "roles",
    //       foreignField: "_id",
    //       as: "roles",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$roles",
    //       preserveNullAndEmptyArrays: true
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "permissions",
    //       localField: "roles.permissions",
    //       foreignField: "_id",
    //       as: "roles.permissions",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id : "$_id",
    //       name: { $first: "$name" },
    //       email: { $first: "$email" },
    //       password: { $first: "$password" },
    //       roles: { $push: "$roles" }
    //     }
    //   }
    // ])


    // if (!user.length){

    // if (!checkUser.length){
    //   throw new NotFoundException("User not found")
    // }

    // let tempId = checkUser[0]._id

    // let user = plainToClass(User, checkUser[0]);

    // await user.matchPassword(loginUserDto.password)


    // const match = await user.matchPassword(loginUserDto.password)

    // if (!match){
    //   throw new BadRequestException("Wrong Credentials")
    // }

    // const token = user.getSignedJwtToken()
    // user["_id"] = tempId
    // user["token"] = token
    // return user

  }

  async findAll() {
    // return this.UserModel.find()


    return this.UserModel.find().populate({
      path: "roles",
      populate: {
        path:"permissions"
      }
    })
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
