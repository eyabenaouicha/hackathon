import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { JobService } from './jobs.service';
import { Job, CompanyProfile } from './jobs.schema';

@Controller('/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // Récupérer tous les jobs
  @Get()
  async findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  // Récupérer un job spécifique par ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Job> {
    return this.jobService.getJob(id);
  }

  // Créer un nouveau job
  @Post()
  async create(@Body() job: Job): Promise<Job> {
    return this.jobService.createJob(job);
  }

  // Mettre à jour un job
  @Patch(':id')
  async updateJob(@Param('id') id: string, @Body() jobUpdate: Partial<Job>): Promise<Job> {
    return this.jobService.updateJob(id, jobUpdate);
  }

  // Supprimer un job
  @Delete(':id')
  async deleteJob(@Param('id') id: string): Promise<Job> {
    return this.jobService.deleteJob(id);
  }

  // Ajouter un profil d'entreprise à un job
  @Post(':id/company-profile')
  async addCompanyProfile(
    @Param('id') jobId: string,
    @Body() companyProfile: CompanyProfile,
  ): Promise<Job> {
    return this.jobService.addCompanyProfile(jobId, companyProfile);
  }

  // Mettre à jour un profil d'entreprise dans un job
  @Patch(':id/company-profile')
  async updateCompanyProfile(
    @Param('id') jobId: string,
    @Body() updatedProfile: CompanyProfile,
  ): Promise<Job> {
    return this.jobService.updateCompanyProfile(jobId, updatedProfile);
  }

  // Supprimer un profil d'entreprise d'un job
  @Delete(':id/company-profile')
  async removeCompanyProfile(@Param('id') jobId: string): Promise<Job> {
    return this.jobService.removeCompanyProfile(jobId);
  }

  // Ajouter une compétence à un job
  @Post(':id/skills')
  async addSkill(@Param('id') jobId: string, @Body() skill: { name: string }): Promise<Job> {
    return this.jobService.addSkill(jobId, skill.name);
  }

  // Supprimer une compétence d'un job
  @Delete(':id/skills')
  async removeSkill(@Param('id') jobId: string, @Body() skill: { name: string }): Promise<Job> {
    return this.jobService.removeSkill(jobId, skill.name);
  }

  // Recherche de jobs par critères
  @Post('/search')
  async searchJobs(@Body() criteria: Partial<Job>): Promise<Job[]> {
    return this.jobService.searchJobs(criteria);
  }
}
