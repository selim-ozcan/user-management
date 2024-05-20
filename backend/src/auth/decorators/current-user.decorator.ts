import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (value, context: ExecutionContext): User => {
    return context.switchToHttp().getRequest().user;
  },
);
