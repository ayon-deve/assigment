import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as moment from "moment"
@Schema({ collection: 'users' })
export class Users {
    @Prop()
    name: string;
    @Prop()
    firstname: string;
    @Prop()
    lastname: string;  
}

export const UsersSchema = SchemaFactory.createForClass(Users);






















