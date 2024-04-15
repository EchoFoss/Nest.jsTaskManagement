import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: UsersRepository,
  ) {}

  // Sign up
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.repository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.repository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // username duplicado
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
