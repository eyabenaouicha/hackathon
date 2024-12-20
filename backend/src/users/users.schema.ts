import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Définition du type UserDocument, qui est un User étendu avec un Document de Mongoose
export type UserDocument = User & Document;


@Schema({ _id: false }) // Désactive le champ `_id` pour les sous-documents Article
export class Article {
  @Prop({ required: true })
  article_name: string;

  @Prop({ required: true })
  article_price: number;

  @Prop()
  article_description: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

@Schema({ versionKey: false }) // Supprime le champ `__v` du document User
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;
  
  @Prop({ required: true })
  password: string;

  @Prop()
  role: string;

  @Prop({ type: [ArticleSchema], default: [] }) // Définit article comme un tableau de sous-documents Article
  article: Article[];

  @Prop({ type: String, default: null })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


