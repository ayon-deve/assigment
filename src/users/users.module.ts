import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CognitoUserSchema } from 'src/models/users/users.schema';
import { categorySchema } from 'src/models/category/category.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'users', schema: CognitoUserSchema },
      { name: 'category', schema: categorySchema },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
