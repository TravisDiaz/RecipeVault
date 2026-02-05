export interface Ingredient {
    name: string;
    quantity: string;
    _id?: string;
  }
  
  export interface Recipe {
    _id: string;
    title: string;
    difficulty: 'Easy' | 'Hard';
    ingredients: Ingredient[];
  }