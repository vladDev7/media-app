import { FileValidator } from '@nestjs/common';
import { AllowedMimetypes } from 'src/helpers/memtypes';

export class FileMimetypeValidator extends FileValidator<Record<string, never>, Express.Multer.File> {
  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (!file) {
      return false;
    }

    if (AllowedMimetypes[file.mimetype]) return true;

    return false;
  }
  buildErrorMessage(file?: Express.Multer.File): string {
    const mimetype = file?.mimetype ?? 'unknown';
    return `Unexpected file mimetype: ${mimetype}`;
  }
}
