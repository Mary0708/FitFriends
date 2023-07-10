import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CertificateValidationPipe implements PipeTransform {
  constructor(
    private readonly configService: ConfigService,
  ) { }
  transform(file: Express.Multer.File) {
    const extensionFilter = this.configService.get<string>('file.certificateFilterExp');

    if (!file.originalname.match(new RegExp(extensionFilter))) {
      throw new HttpException('Not allowed file extension', HttpStatus.BAD_REQUEST,);
    }

    if (file.size > this.configService.get<number>('file.certificateSize')) {
      throw new HttpException('File size too large', HttpStatus.PAYLOAD_TOO_LARGE,);
    }

    return file;
  }
}
