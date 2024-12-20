import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/users.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true}), 
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackathon_db'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  
  controllers: [UsersController],  // Ajouter le contrôleur ici
  providers: [UsersService],  
  
})
export class AppModule {}

// configmodule.root tkhalik tnajm testaaml les variables d'environnement
