'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function CreateRecipe() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // form states
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Hard'>('Easy');
  
  // list one empty ingredient
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);



  // add empty line
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  // delete an specific line
  const handleRemoveIngredient = (index: number) => {
    const list = [...ingredients];
    list.splice(index, 1); // remove one element from the 'index' position
    setIngredients(list);
  };

  const handleIngredientChange = (index: number, field: 'name' | 'quantity', value: string) => {
    const list = [...ingredients];
    if (field === 'name' || field === 'quantity') {
      // Both 'name' and 'quantity' exist on ingredient objects.
      list[index] = { ...list[index], [field]: value };
      setIngredients(list);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/recipes', {
        title,
        difficulty,
        ingredients,
      });

      router.push('/');
    } catch (error) {
      alert('Error creating recipe. Check the console.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🍳 Create New Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Spaghetti Carbonara"
            />
          </div>

          {/* DIFICULTY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Hard')}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
            
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item (e.g. Eggs)"
                  required
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
                />
                <input
                  type="text"
                  placeholder="Qty (e.g. 2)"
                  required
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  className="w-24 p-2 border border-gray-300 rounded-lg outline-none"
                />
                
                
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddIngredient}
              className="mt-2 text-sm text-blue-600 font-semibold hover:underline"
            >
              + Add Ingredient
            </button>
          </div>

          {/* ACCTION BUTTONS*/}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.back()} // Botón Cancelar
              className="w-1/2 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Recipe'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}