import { Injectable } from '@nestjs/common';


interface Blog{
    name:string,
    title:string,
    page:number
}

@Injectable()
export class BlogsService {


    private readonly blogs:Blog[]=[];

    create(data:Blog){
        this.blogs.push(data)
    }

    find():any[]{
        return this.blogs;
    }
}
