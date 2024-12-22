import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/users.schema';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './jobs/jobs.module';
import { Job, JobSchema } from './jobs/jobs.schema';
import { JobController } from './jobs/jobs.controller';
import { JobService } from './jobs/jobs.service';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true}), 
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackathon_db'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    AuthModule,
  ],
  
  controllers: [UsersController, JobController],  // Ajouter le contrôleur ici
  providers: [UsersService, JobService],  
  
})
export class AppModule {}

// configmodule.root tkhalik tnajm testaaml les variables d'environnement
