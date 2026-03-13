import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

export class SchemaValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    try {
      const parsedData = this.schema.parse(value);
      return parsedData;
    } catch (_error) {
      throw new BadRequestException('ValidationFailed'); // TODO: create enum for error messages
    }
  }
}
