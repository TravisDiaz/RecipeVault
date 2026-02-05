import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// TypeScript type document defined
export type RecipeDocument = HydratedDocument<Recipe>;

// Creation of Ingredients
@Schema({
  collection: 'recipes',
  timestamps: true,
})
export class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: string;
}

// Ingredient schema for MongoDB
const IngredientSchema = SchemaFactory.createForClass(Ingredient);

// Recipe creation
@Schema({ timestamps: true }) // timestamps: true -> auto add "createdAt" y "updatedAt"
export class Recipe {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: ['Easy', 'Hard'] }) // DB level restriction
  difficulty: string;

  // ingredient class array
  @Prop({ type: [IngredientSchema], default: [] })
  ingredients: Ingredient[];
}

// Export the final schema
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
