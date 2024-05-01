import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/models/item.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'users', schema: UsersSchema },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
