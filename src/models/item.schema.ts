import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as moment from "moment"
@Schema({ collection: 'leads' })
export class Leads {
    @Prop({ index: -1 })
    name: string;
    @Prop({ required: true, index: -1 })
    firstname: string;
    @Prop({ required: true, index: -1 })
    lastname: string;  
}

export const LeadsSchema = SchemaFactory.createForClass(Leads);






















