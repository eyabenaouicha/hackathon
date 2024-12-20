import { Controller, Get, Post, Body, HttpException, HttpStatus, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Article } from './users.schema';


@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Retrieve all users
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    
    // Retrieve a specific user by ID
    @Get(':id')
    async findOneUser(@Param('id') id: string): Promise<User> {
        return this.usersService.GetUser(id);
    }

    // Create a new user
    @Post()
    create(@Body() user: User) {
        return this.usersService.createUser(user);
    }

    // Update a user or their articles
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userUpdate: Partial<User & { articleIndex?: number; article?: Article }>
    ): Promise<User> {
        // Check if the update is for an article
        if (userUpdate.articleIndex !== undefined && userUpdate.article) {
            return this.usersService.updateArticle(
                id,
                userUpdate.articleIndex,
                userUpdate.article
            );
        }
        // Otherwise, update the user
        return this.usersService.updateUser(id, userUpdate);
    }

    // Delete a user by ID
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser(id);
    }

    // Add an article to a specific user
    @Post(':id/articles')
    async addArticle(
        @Param('id') userId: string,
        @Body() article: Article
    ): Promise<User> {
        return this.usersService.addArticle(userId, article);
    }

    // Update an article of a specific user
    @Patch(':id/articles/:index')
    async updateArticle(
        @Param('id') userId: string,
        @Param('index') articleIndex: number,
        @Body() updatedArticle: Article
    ): Promise<User> {
        return this.usersService.updateArticle(userId, articleIndex, updatedArticle);
    }

    // Remove an article from a specific user
    @Delete(':id/articles/:index')
    async removeArticle(
      @Param('id') userId: string,
      @Param('index') index: string, // Note : `index` est initialement une chaîne
    ): Promise<User> {
      const articleIndex = parseInt(index, 10); // Convertit l'index en entier
      if (isNaN(articleIndex)) {
        throw new Error('Invalid article index'); // Vérifie si l'index est un entier valide
      }
      return this.usersService.removeArticle(userId, articleIndex);
    }
    
    

    
}
