import { FileValidator } from '@nestjs/common';
import { MAX_FILE_SIZE_BYTES } from '../constants';

export class FileSizeValidator extends FileValidator<Record<string, never>, Express.Multer.File> {
  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (!file) return false;

    if (file.size > MAX_FILE_SIZE_BYTES) return false;

    return true;
  }
  buildErrorMessage(file?: Express.Multer.File): string {
    return `Maximum file size is ${MAX_FILE_SIZE_BYTES}. Current file size is ${file?.size ?? 'unknown'}`;
  }
}
