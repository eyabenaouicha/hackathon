import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/users.schema';
import * as jwt from 'jsonwebtoken'; 
import { LoginDto } from './dto/login/login';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, 
    private jwtService: JwtService,  
  ) {}

async validateUser(loginDto: LoginDto): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      return null;  // L'utilisateur n'existe pas
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      return null;  // Mot de passe incorrect
    }
    return user;  // Retourne l'utilisateur avec le type UserDocument
  }
  

  async login(user: UserDocument): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultSecret', {
      expiresIn: '1h',
    });
    user.token = token;
  await user.save();  
    return { access_token: token };  // Retourne l'objet avec la clé 'access_token'
  }
  

}
