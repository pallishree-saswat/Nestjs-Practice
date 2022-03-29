import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class  ValidationCustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
      if(value == "10"){
          throw new BadRequestException('Invalid')
      }
    return value;
  }
}