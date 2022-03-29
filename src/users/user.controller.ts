import {
  All,
  Body,
  Controller,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ValidationCustomPipe } from 'src/pipe/customPipe';
import { PostDataValidator } from 'src/pipe/postDataValidator';
import { ValidationPipe } from '@nestjs/common';
import { BlogsService } from '../blogs/blogs.service';
import { HttpExceptionFilter } from 'src/exception/http.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptors';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private blogservice: BlogsService) {}

  @Get()
  @UseInterceptors(LoggingInterceptor)
  getUsers(): object {
    return {
      id: 1,
      name: 'saswat',
      age: 32,
    };
  }

  @Post('adduser')
  addUser(@Body() record: any): any {
    console.log(record);
    return {
      record,
    };
  }

  @All('getuser')
  //    @UseGuards(AuthGuard)
  getUser(): object {
    return {
      id: 2,
      name: 'pallishree',
      age: 26,
    };
  }

  @Get('getlist/:id')
  //    getList(@Param('id', ParseIntPipe) id:number):string{
  //        return `param ${id}`
  //    }
  getList(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return `param id` + id;
  }

  //default value

  @Get('getPage')
  //    getList(@Param('id', ParseIntPipe) id:number):string{
  //        return `param ${id}`
  //    }
  getPage(@Query('page', new DefaultValuePipe(10)) page: number): string {
    return `page number` + page;
  }

  //get array
  @Get('getarray-list')
  //    getList(@Param('id', ParseIntPipe) id:number):string{
  //        return `param ${id}`
  //    }
  getArraylist(
    @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
    id: number[],
  ): any {
    return `array ids` + id;
  }

  //custom validation in pipe

  @Get('list/:id')
  @UsePipes(new ValidationCustomPipe())
  // @UseFilters(new HttpExceptionFilter())
  validate(@Param('id') id: number): string {
    if (id <= 10) {
      // throw new HttpException('custom error', HttpStatus.NOT_FOUND)
      // throw new HttpException({
      //     status:HttpStatus.NOT_ACCEPTABLE,
      //     error:"Custom Error"
      // },HttpStatus.NOT_ACCEPTABLE)

      throw new ForbiddenException();
    }
    return 'hello ' + id;
  }

  @Get('list')
  getQueryList(@Query() query: any): string {
    return 'hello ' + query.id;
  }

  @Post('add-blog')
  addBlog(@Body() record: any): string {
    this.blogservice.create(record);

    return 'data added';
  }

  @Get('find-blog')
  async findBlogs(): Promise<any> {
    return this.blogservice.find();
  }

  @Post('add')
  @UsePipes(new ValidationPipe())
  addData(@Body() createdata: PostDataValidator): any {
    return createdata;
  }

  //upload single photo
  @Post('upload-file')
  @UseInterceptors(FileInterceptor('photo'))
  uploadFile(@UploadedFile() profile: Express.Multer.File): object {
    console.log(profile);
    return {
      message: 'file uploaded',
    };
  }

  //multiple files
  @Post('upload-files')
  @UseInterceptors(FileInterceptor('photos'))
  uploadFiles(@UploadedFiles() profiles: Array<Express.Multer.File>): object {
    console.log(profiles);
    return {
      message: 'files uploaded',
    };
  }
}
