import Link from 'next/link';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-5 lg:p-8 flex flex-col justify-between h-full">
      {/* CABECERA */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl lg:text-3xl font-bold text-gray-800">{recipe.title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs lg:text-sm font-bold uppercase tracking-wide 
            ${
              recipe.difficulty === 'Easy'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* INGREDIENTES (Grid Responsivo: 1 col móvil, 2 tablet, 4 escritorio) */}
        <div>
          <h4 className="text-xs lg:text-sm font-bold text-gray-500 uppercase mb-3 tracking-wider">
            Ingredients ({recipe.ingredients.length})
          </h4>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {recipe.ingredients.map((ing, index) => (
              <li 
                key={ing._id || index} 
                className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-sm text-gray-700 flex flex-col justify-center items-center text-center"
              >
                <span className="font-semibold block text-gray-900">{ing.name}</span>
                <span className="text-xs text-gray-500">{ing.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="mt-auto flex gap-4 pt-6 border-t border-gray-100">
        <Link 
          href={`/edit/${recipe._id}`}
          className="flex-1 py-3 text-center text-sm lg:text-base font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          Edit 
        </Link>
        
        <button
          onClick={() => onDelete(recipe._id)}
          className="flex-1 py-3 text-sm lg:text-base font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          Delete 
        </button>
      </div>
    </div>
  );
}