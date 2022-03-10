import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';
export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
interface CaslPermission {
  action: PermissionAction;
  // In our database, Invoice, Project... are called "object"
  // but in CASL they are called "subject"
  subject: string;
}
@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}
  async createForUser(user: User): Promise<AppAbility> {
    const dbPermissions: Permission[] =
      await this.authService.findAllPermissionsOfUser(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
      action: PermissionAction[p.action],
      subject: p.permissionObject,
    }));
    console.log('from casle permission ', caslPermissions);
    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
