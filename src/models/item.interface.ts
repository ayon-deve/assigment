import { read } from 'fs';
import { Document } from 'mongoose';
export interface IUsers extends Document {
    readonly name: string;
    readonly firstname: string;
    readonly lastname: string;
}













