import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthController,
  PermissionController,
  RoleController,
  UserController,
} from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PermissionsGuard } from './permissions.guard';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  controllers: [
    AuthController,
    UserController,
    RoleController,
    PermissionController,
  ],
  providers: [CaslAbilityFactory, PermissionsGuard, AuthService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [CaslAbilityFactory, PermissionsGuard],
})
export class AuthModule {}
