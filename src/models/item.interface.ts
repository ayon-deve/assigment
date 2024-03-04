import { read } from 'fs';
import { Document } from 'mongoose';
export interface ILeads extends Document {
    readonly name: string;
    readonly firstname: string;
    readonly lastname: string;
}













