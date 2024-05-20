import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });

    if (existingUser)
      throw new BadRequestException(
        'User with given username already exists.',
        {
          description: 'Some error description',
        },
      );
    const user: User = new User();

    const encryptedPassword = await this.hashPassword(createUserDto.password);

    user.username = createUserDto.username;
    user.firstName = createUserDto.firstName ?? user.firstName;
    user.lastName = createUserDto.lastName ?? user.lastName;
    user.password = encryptedPassword;
    user.role = createUserDto.role;

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User with given id cannot be found');
    }

    if (updateUserDto.password) {
      const encryptedPassword = await this.hashPassword(updateUserDto.password);
      user.password = encryptedPassword;
    }

    user.username = updateUserDto.username ?? user.username;
    user.firstName = updateUserDto.firstName ?? user.firstName;
    user.lastName = updateUserDto.lastName ?? user.lastName;
    user.role = updateUserDto.role ?? user.role;

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  private hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async verifyUser(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }
}
