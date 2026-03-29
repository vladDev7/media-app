import {
  Controller,
  Delete,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { FileMimetypeValidator } from 'src/helpers/validators/file.mimetype.validatior';
import { FileSizeValidator } from 'src/helpers/validators/file.size.validator';
import { MediaService } from './media.service';
import { CurrentUser } from 'src/helpers/decorators/current-user.decorator';
import { UserInnerDto } from 'contracts';

@Controller('files')
export class MediaController {
  constructor(private mediaService: MediaService) {}
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  async uploadFile(
    @CurrentUser() user: UserInnerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileMimetypeValidator({}), new FileSizeValidator({})],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.mediaService.uploadFile(user.id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteFile(@Param('id') id: number) {
    return this.mediaService.deleteFile(id);
  }
}
