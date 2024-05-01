import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment'
@Schema({ collection: 'users', versionKey: false })
export class CognitoUser {

  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  password: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  zip: string;

  @Prop({ default: 1 })
  status: number;
  @Prop({ default: () => moment().valueOf() })
  created_on: number;
  @Prop({ default: () => moment().valueOf() })
  updated_on: number;

  @Prop()
  last_login_time: number;
  @Prop({ type: {} })
  image: object;


}
export const CognitoUserSchema = SchemaFactory.createForClass(CognitoUser);
