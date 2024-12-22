import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument, CompanyProfile } from './jobs.schema';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
  ) {}

  // Création d'un job
  async createJob(job: Job): Promise<Job> {
    const newJob = new this.jobModel(job);
    return newJob.save();
  }

  // Récupérer un job par ID
  async getJob(id: string): Promise<Job> {
    return this.jobModel.findById(id).exec();
  }

  // Récupérer tous les jobs
  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  // Mettre à jour un job
  async updateJob(id: string, jobUpdate: Partial<Job>): Promise<Job> {
    return this.jobModel.findByIdAndUpdate(id, jobUpdate, { new: true }).exec();
  }

  // Supprimer un job
  async deleteJob(id: string): Promise<Job> {
    return this.jobModel.findByIdAndDelete(id).exec();
  }

  // Ajouter un profil d'entreprise à un job
  async addCompanyProfile(jobId: string, companyProfile: CompanyProfile) {
    return this.jobModel.findByIdAndUpdate(
      jobId,
      { $set: { CompanyProfile: companyProfile } },
      { new: true },
    );
  }

  // Mettre à jour un profil d'entreprise dans un job
  async updateCompanyProfile(jobId: string, updatedProfile: CompanyProfile) {
    return this.jobModel.findByIdAndUpdate(
      jobId,
      { $set: { CompanyProfile: updatedProfile } },
      { new: true },
    ).exec();
  }

  // Supprimer le profil d'entreprise d'un job
  async removeCompanyProfile(jobId: string): Promise<Job> {
    return this.jobModel.findByIdAndUpdate(
      jobId,
      { $unset: { CompanyProfile: "" } },
      { new: true },
    ).exec();
  }

  // Recherche de jobs par critères
  async searchJobs(criteria: Partial<Job>): Promise<Job[]> {
    return this.jobModel.find(criteria).exec();
  }

  // Ajouter une compétence à un job
  async addSkill(jobId: string, skill: string) {
    return this.jobModel.findByIdAndUpdate(
      jobId,
      { $push: { skills: skill } },
      { new: true },
    ).exec();
  }

  // Supprimer une compétence d'un job
  async removeSkill(jobId: string, skill: string) {
    return this.jobModel.findByIdAndUpdate(
      jobId,
      { $pull: { skills: skill } },
      { new: true },
    ).exec();
  }
}
