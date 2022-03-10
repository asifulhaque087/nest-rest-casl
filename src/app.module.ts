import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest-att-auth'), UserModule, RoleModule, PermissionModule],

  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-att-auth'),
    AuthModule,
  ],

  // imports: [],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
