import { classToPlain } from 'class-transformer';
import { IsInt, IsString,  } from 'class-validator';


export class PostDataValidator{
    @IsString()
    name:string
   
    @IsInt()
    id:number

    @IsString()
    email:string
}