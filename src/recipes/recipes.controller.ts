import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes') // principal route: http://localhost:3000/recipes
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  // --- POST (Create) ---
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    // @Body(): Extracts the JSON sent by the user and validates it with the DTO
    return this.recipesService.create(createRecipeDto);
  }

  // --- GET ALL (Read all) ---
  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  // --- GET ONE (Read one) ---
  @Get(':id') // :id is a dinamyc param
  findOne(@Param('id') id: string) {
    // @Param('id'): Extract the "123" from the URL
    return this.recipesService.findOne(id);
  }

  // --- PATCH (Partially update) ---
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    // receive ID by URL and new Data by Body
    return this.recipesService.update(id, updateRecipeDto);
  }

  // --- DELETE  ---
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
