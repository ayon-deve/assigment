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

  @Prop({default:1})
  status: number;
  @Prop({ default: () => moment().valueOf() })
  created_on: number;
  @Prop({ default: () => moment().valueOf() })
  updated_on: number;

//   @Prop()
//   isDeleted: number;
  @Prop()
  last_login_time: number;
//   @Prop()
//   user_type: string;
//   @Prop()
//   unique_identifier: string;
//   @Prop()
//   data_collection: Array<object>;
//   @Prop()
//   agent_code: string;
//   @Prop()
//   confirm_password: string;
//   @Prop()
//   address: string;
//   @Prop()
//   yourself: string;
//   @Prop({default:0, index:-1})
//   has_betoparedes_access:number;
//   @Prop({default: ()=> moment().valueOf() , index:-1})
//   last_cron_modified:number;
//   @Prop()
//   email_verified_at: number;
//   @Prop({ type: 'object' })
//   id_token_data: object;
//   @Prop({ type: 'object' })
//   refresh_token_data: object;
//   @Prop({ type: 'object' })
//   access_token_data: object;
//   @Prop({default:1})
//   direct_contract_send_access: number;
//   @Prop()
//   direct_access_given_by: string;
//   @Prop()
//   calendar_id: string;
//   @Prop({default:0})
//   is_rep_contract_signed: number;
//   @Prop({default:0})
//   is_w9_form_signed: number;
  
}
export const CognitoUserSchema = SchemaFactory.createForClass(CognitoUser);
