import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResumeCollection, ResumeDocument } from './resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(ResumeCollection.name)
    private resumeModel: Model<ResumeDocument>, // Modèle aligné avec ResumeDocument
  ) {}

  // Créer une nouvelle collection de résumés
  async createResumeCollection(
    name: string,
  ): Promise<ResumeDocument> {
    const newCollection = new this.resumeModel({ name, resumes: [] });
    return newCollection.save();
  }

  // Ajouter un résumé à une collection existante
  async addResumeToCollection(
    collectionId: string,
    resumeData: { category: string; resume: string },
  ): Promise<ResumeDocument> {
    return this.resumeModel
      .findByIdAndUpdate(
        collectionId,
        {
          $push: {
            resumes: resumeData,
          },
        },
        { new: true },
      )
      .exec();
  }

  // Récupérer une collection par son ID
  async getCollectionById(id: string): Promise<ResumeDocument | null> {
    return this.resumeModel.findById(id).exec();
  }

  // Récupérer toutes les collections
  async findAllCollections(): Promise<ResumeDocument[]> {
    return this.resumeModel.find().exec();
  }

  // Mettre à jour un résumé dans une collection
  async updateResumeInCollection(
    collectionId: string,
    resumeId: string,
    resumeUpdate: Partial<{ category: string; resume: string }>,
  ): Promise<ResumeDocument | null> {
    return this.resumeModel
      .findOneAndUpdate(
        { _id: collectionId, 'resumes._id': resumeId },
        {
          $set: {
            'resumes.$': { ...resumeUpdate, _id: resumeId },
          },
        },
        { new: true },
      )
      .exec();
  }

  // Supprimer un résumé d'une collection
  async deleteResumeFromCollection(
    collectionId: string,
    resumeId: string,
  ): Promise<ResumeDocument | null> {
    return this.resumeModel
      .findByIdAndUpdate(
        collectionId,
        {
          $pull: {
            resumes: { _id: resumeId },
          },
        },
        { new: true },
      )
      .exec();
  }

  // Récupérer tous les résumés d'une catégorie donnée dans une collection
  async findResumesByCategory(
    collectionId: string,
    category: string,
  ): Promise<ResumeDocument | null> {
    const collection = await this.resumeModel.findById(collectionId).exec();
    if (!collection) {
      return null;
    }
    return {
      ...collection.toObject(),
      resumes: collection.resumes.filter((resume) => resume.category === category),
    };
  }
}
