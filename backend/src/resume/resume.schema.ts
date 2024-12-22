import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Définition du type ResumeDocument, qui est un ResumeEntry étendu avec un Document de Mongoose
export type ResumeDocument = ResumeEntry & Document;

// Sous-schéma pour une entrée de résumé
@Schema({ _id: false }) // Désactive le champ `_id` pour les sous-documents ResumeEntry
export class ResumeEntry {
  @Prop({ required: true })
  _id: MongooseSchema.Types.ObjectId; // Identifiant unique

  @Prop({ required: true })
  Category: string; // Catégorie, par exemple, "Data Science"

  @Prop({ required: true })
  Resume: string; // Contenu du résumé
}

export const ResumeEntrySchema = SchemaFactory.createForClass(ResumeEntry);

// Schéma principal pour gérer une collection ou un utilisateur avec des résumés
@Schema({ versionKey: false }) // Supprime le champ `__v` du document principal
export class ResumeCollection {
  @Prop({ required: true })
  name: string; // Nom de l'utilisateur ou de la collection

  @Prop({ type: [ResumeEntrySchema], default: [] }) // Définit les résumés comme un tableau de sous-documents ResumeEntry
  resumes: ResumeEntry[];
}

export const ResumeCollectionSchema = SchemaFactory.createForClass(ResumeCollection);
