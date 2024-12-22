import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './jobs.controller';
import { JobService } from './jobs.service';
import { Job, JobSchema } from './jobs.schema';
// import { JobsModule } from './jobs.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
