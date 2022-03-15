import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles?: Types.ObjectId[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  getSignedJwtToken() {
    let user: Partial<UserDocument>
    user = this
    return jwt.sign({_id: user._id}, "MRIDUL" ,{expiresIn:"5h"})
  };

  matchPassword (password:string) {
    return bcrypt.compare(password, this.password)
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
