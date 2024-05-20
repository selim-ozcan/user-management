import { OmitType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword(
    { minLength: 4 },
    {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one special character and one number',
    },
  )
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'First name should not be empty.' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name should not be empty.' })
  lastName: string;

  @IsString()
  @IsOptional()
  role: Role;
}
