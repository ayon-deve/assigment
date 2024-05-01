import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from 'src/models/item.interface';

@Injectable()
export class UsersService {
    @InjectModel('users') private usersmodal: Model<IUsers>

    async saveCognitoUserToDB(userData: Object): Promise<any> {
        try {
          console.log('user data of signup ===', userData);
    
          const userRegistration = await this.usersmodal.create(userData);
    
          return Promise.resolve({
            status: HttpStatus.OK,
            message: 'Registration successful',
            results: userRegistration,
          });
        } catch (error) {
          console.log('error==================>', error);
          return Promise.reject({
            status: HttpStatus.BAD_REQUEST,
            message:
              error.errors.length > 0
                ? error.errors.map((val) => val.longMessage).join(' and ')
                : 'Registration limit exceed',
            results: error.message,
          });
        }
      }

}
