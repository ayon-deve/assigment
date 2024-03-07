import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { IUsers } from 'src/models/item.interface';

@Injectable()
export class WebScrapService {
    // @InjectModel('users') private usersmodal: Model<IUsers>


    async fetchData(url: string): Promise<any> {
        try {
          const response = await axios.get(url);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching data from ${url}: ${error.message}`);
        }
      }
}
