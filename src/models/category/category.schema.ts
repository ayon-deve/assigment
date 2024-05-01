import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import *as moment from "moment";


@Schema({collection:'category'})
export class category{
    @Prop({required:true,index:-1})
    category_name:string;

    @Prop({required:true,index:-1})
    category_description:string;

    @Prop({required:true,default:1})
    status:number;

    @Prop({required:true,index:-1})
    priority:number;

    @Prop({default:()=>moment().valueOf(),index:-1})
    created_on:number;

    @Prop({default:()=>moment().valueOf(),index:-1})
    updated_on:number;

}

export const categorySchema = SchemaFactory.createForClass(category)