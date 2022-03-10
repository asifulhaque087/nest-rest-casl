import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  permissionObject: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
