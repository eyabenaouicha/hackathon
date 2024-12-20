import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login/login';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';
// import { UseGuards } from '@nestjs/common';
import { UserDocument } from '../users/users.schema'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.schema';
import { UsersService } from 'src/users/users.service';
import { request, Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        // private readonly userService: UsersService, 
        // @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
      ) {}
      @Post('login')
      async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(loginDto);
    
        if (!user) {
          throw new Error('Invalid credentials');  
        }
        return this.authService.login(user);  
      }

      // @Post('logout')
      //   @UseGuards(AuthGuard('jwt'))  // Utilisation du guard JWT pour protéger cette route
      //   async logout(@request() req): Promise<{ message: string }> {
      //       const user = req.user;  // L'utilisateur validé par le guard JWT

      //       // Appel de la méthode pour supprimer le token de l'utilisateur
      //       await this.userService.removeToken(user._id);

      //       return { message: 'Successfully logged out' };
      //   }

}

