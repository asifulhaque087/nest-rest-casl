import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthController,
  PermissionController,
  RoleController,
  UserController,
} from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './entities/user.entity';
import { PermissionsGuard } from './permissions.guard';
import { CaslAbilityFactory } from './casl-ability.factory';
import { UserService } from 'user.service';
import * as bcrypt from 'bcryptjs';
import { RoleService } from 'role.service';
import { PermissionService } from 'permission.service';
import { Role, RoleSchema } from './entities/role.entity';
import { Permission, PermissionSchema } from './entities/permission.entity';

@Module({
  controllers: [
    AuthController,
    UserController,
    RoleController,
    PermissionController,
  ],
  providers: [
    CaslAbilityFactory,
    PermissionsGuard,
    AuthService,
    UserService,
    RoleService,
    PermissionService,
  ],
  // imports: [
  //   MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  // ],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          // pre middleware
          schema.pre<UserDocument>('save', async function (next) {
            if (!this.isModified('password')) {
              next();
            }
            this.password = await bcrypt.hash(this.password, 12);
            next();
          });

          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
    // MongooseModule.forFeature([
    //   { name: Permission.name, schema: PermissionSchema },
    // ]),
  ],
  exports: [CaslAbilityFactory, PermissionsGuard],
})
export class AuthModule {}
