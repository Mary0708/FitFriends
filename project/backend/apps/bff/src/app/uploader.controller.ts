import { Controller,  Param,  Post,   Req,   UseFilters, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import FormData from 'form-data';
import { UserIdTrainingInterceptor } from './interceptors/userid-tarining.interceptor';
import { CoachIdInterceptor } from './interceptors/coachId.interceptor';
import { RoleCoachInterceptor } from './interceptors/role-coach.interceptor';

@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class UploaderController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async postAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/avatar/${req.body['userId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/user/background')
  @UseInterceptors(FileInterceptor('file'))
  public async postBackground(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/background/${req.body['userId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @UseInterceptors(RoleCoachInterceptor)
  @Post('/coach/certificate')
  @UseInterceptors(FileInterceptor('file'))
  public async postCertificate(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/certificate/${req.body['coachId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @Post('/image/training/:id')
  @UseInterceptors(UserIdTrainingInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  public async postImage(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {

    const formData = new FormData();
     formData.append('file', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/image/${id}`,
    formData,
    { headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @Post('/video/training/:id')
  @UseInterceptors(UserIdTrainingInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  public async postVideo(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {

    const formData = new FormData();
     formData.append('file', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/video/${id}`,
    formData,
    { headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return data;
  }

}
