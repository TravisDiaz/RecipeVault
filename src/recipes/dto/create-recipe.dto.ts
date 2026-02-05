import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';

// Definition of how an ingredient has to be
class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;
}

// Complete recipe definition
export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty({ message: 'The title cannot be empty' })
  title: string;

  @IsEnum(['Easy', 'Hard'], {
    message: 'Difficulty must be either Easy or Hard',
  })
  difficulty: 'Easy' | 'Hard';

  @IsArray()
  @ValidateNested({ each: true }) // Validation of each element
  @Type(() => CreateIngredientDto) // Transform JSON to Ingredient class
  ingredients: CreateIngredientDto[];
}
