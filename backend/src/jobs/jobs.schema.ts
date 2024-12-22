import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Définition du type JobDocument
export type JobDocument = Job & Document;

@Schema({ _id: false }) // Désactive le champ `_id` pour les sous-documents CompanyProfile
export class CompanyProfile {
  @Prop({ required: true })
  Sector: string;

  @Prop({ required: true })
  Industry: string;

  @Prop({ required: true })
  City: string;

  @Prop({ required: true })
  State: string;

  @Prop({ required: true })
  Zip: string;

  @Prop({ required: true })
  Website: string;

  @Prop({ required: true })
  Ticker: string;

  @Prop({ required: true })
  CEO: string;
}

export const CompanyProfileSchema = SchemaFactory.createForClass(CompanyProfile);

@Schema({ versionKey: false }) // Supprime le champ `__v` du document Job
export class Job {
  @Prop({ required: true })
  JobId: string;

  @Prop({ required: true })
  Experience: string;

  @Prop({ required: true })
  Qualifications: string;

  @Prop({ required: true })
  SalaryRange: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  Country: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  WorkType: string;

  @Prop({ required: true })
  CompanySize: number;

  @Prop({ required: true })
  JobPostingDate: Date;

  @Prop({ required: true })
  Preference: string;

  @Prop({ required: true })
  ContactPerson: string;

  @Prop({ required: true })
  Contact: string;

  @Prop({ required: true })
  JobTitle: string;

  @Prop({ required: true })
  Role: string;

  @Prop({ required: true })
  JobPortal: string;

  @Prop({ required: true })
  JobDescription: string;

  @Prop()
  Benefits: string;

  @Prop()
  skills: string;

  @Prop()
  Responsibilities: string;

  @Prop({ required: true })
  Company: string;

  @Prop({ type: CompanyProfileSchema }) // Définit CompanyProfile comme un sous-document
  CompanyProfile: CompanyProfile;
}

export const JobSchema = SchemaFactory.createForClass(Job);
