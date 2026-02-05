import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from './shemas/recipe.shemas';

@Injectable()
export class RecipesService {
  // Dependencies injection ask NestJs to give the MongoDB model
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  // --- CREATE ---
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    // New instancie of model with checked data
    const createdRecipe = new this.recipeModel(createRecipeDto);
    // Save on Database
    return createdRecipe.save();
  }

  // --- READ ALL ---
  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }

  // --- READ ONE ---
  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id).exec();
    // 404 error if doesn't exist
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  // --- UPDATE ---
  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const updatedRecipe = await this.recipeModel
      .findByIdAndUpdate(id, updateRecipeDto, { new: true }) // { new: true } is vital makes Mongo returns the ALREADY modified object, not the old one
      .exec();

    if (!updatedRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return updatedRecipe;
  }

  // --- DELETE ---
  async remove(id: string): Promise<Recipe> {
    const deletedRecipe = await this.recipeModel.findByIdAndDelete(id).exec();

    if (!deletedRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return deletedRecipe;
  }
}
