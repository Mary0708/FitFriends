import { fillObject } from '@fit-friends/utils/util-core';
import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CommentsService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { DefaultQuery } from './query/default.query';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('comment')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create/:trainingId')
  public async create(@Param('trainingId') trainingId: number, @Body() dto: CommentDto) {
    const newComment = await this.commentsService.createComment(trainingId, dto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment by trainingId found'
  })
  @Get(':trainingId')
  public async showPostId(@Query() query: DefaultQuery, @Param('trainingId') trainingId: number) {
    const comments = await this.commentsService.getTrainingId(trainingId, query);
    return fillObject(CommentRdo, comments);
  }

  @Post('test')
  public async createTestData(@Body() test_data) {
    const dataArr = [];
    for (const key in test_data) {
      const training = await this.commentsService.createTestData(test_data[key]);
    dataArr.push(training);
  }
    return dataArr;
  }

}

