import { CommentLength, CommentRating } from "@fit-friends/utils/util-types";
import { ApiProperty } from "@nestjs/swagger";
import { Max, MaxLength, Min, MinLength } from "class-validator";

export class CommentDto {

  @ApiProperty({
    description: 'Text comment'
  })
  @MinLength(CommentLength.MinLength)
  @MaxLength(CommentLength.MaxLength)
  public message: string;

  @ApiProperty({
    description: 'Rating training'
  })
  @Min(CommentRating.MinRating)
  @Max(CommentRating.MaxRating)
  public ratingTraining: number;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
