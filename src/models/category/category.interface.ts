

export interface Icategory extends Document {
    readonly category_name:string,
    readonly category_description:string,
    readonly status:number,
    readonly priority:number,
    readonly created_on:number,
    readonly updated_on:number,
    readonly created_by:string,
    readonly website_id:Array<string>
}