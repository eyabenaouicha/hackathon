import { Injectable } from '@nestjs/common';
import { Article, User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
      ) {}
    
      async createUser(user: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10); 
        const newUser = new this.userModel({ ...user, password: hashedPassword, token: null });
        return newUser.save();
      }
      async GetUser( id: string): Promise<User> {
        return this.userModel.findById(id).exec();
      }
     
      async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }
      
      async updateUser(id: string, userUpdate: Partial<User>): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userUpdate, { new: true }).exec();
      }
      

      async deleteUser(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
      }

      async addArticle(userId: string, article: Article) {
        return this.userModel.findByIdAndUpdate(
            userId,
            { $push: { article } },
            { new: true }
        );
    }

    async updateArticle(userId: string, articleIndex: number, updatedArticle: Article) {
      const user = await this.userModel.findById(userId);
      if (!user || !user.article[articleIndex]) {
          throw new Error('Article not found');
      }
      user.article[articleIndex] = updatedArticle;
      return user.save();
  }
  
async removeArticle(userId: string, articleIndex: number): Promise<User> {
  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (articleIndex < 0 || articleIndex >= user.article.length) {
    throw new Error('Article not found at the given index');
  }

  user.article.splice(articleIndex, 1); // Supprime l'article à l'index donné
  return user.save(); // Sauvegarde les modifications
}

async validateUser(email: string, password: string): Promise<User | null> {
  const user = await this.userModel.findOne({ email }).exec();
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
}
async generateToken(user: UserDocument): Promise<string> { 
  const payload = { id: user._id, role: user.role }; 
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultSecret', {
    expiresIn: '1h',
  });

  user.token = token;
  await user.save(); 
  return token;
}

// async removeToken(userId: string): Promise<void> {
//   const user = await this.userModel.findById(userId);
//   if (user) {
//     user.token = null;  
//     await user.save(); 
//   }
// }
 // Méthode pour supprimer le token de l'utilisateur
 async removeToken(userId: string): Promise<void> {
  await this.userModel.updateOne({ _id: userId }, { $set: { token: null } });
}
}




