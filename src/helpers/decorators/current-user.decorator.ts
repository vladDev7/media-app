import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInnerDto } from 'contracts';

interface RequestWithUser extends Request {
  user: UserInnerDto;
}

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): UserInnerDto => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();

  return request.user;
});
