'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Ingredient } from '@/types/recipe';

export default function EditRecipe() {
  const router = useRouter();
  const params = useParams(); 
  const recipeId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Hard'>('Easy');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${recipeId}`);
        const data = response.data;
        
        // Rellenar formulario
        setTitle(data.title);
        setDifficulty(data.difficulty);
        setIngredients(data.ingredients);
      } catch (error) {
        console.error('Error fetching recipe', error);
        alert('Recipe not found');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) fetchRecipe();
  }, [recipeId, router]);

  // --- Handlers ---
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    const list = [...ingredients];
    list.splice(index, 1);
    setIngredients(list);
  };

  const handleIngredientChange = (index: number, field: 'name' | 'quantity', value: string) => {
    const list = [...ingredients];
    list[index] = { ...list[index], [field]: value };
    setIngredients(list);
  };

  // --- (PATCH) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const cleanIngredients = ingredients.map(({ name, quantity }) => ({
        name,
        quantity,
      }));

      await axios.patch(`http://localhost:3000/recipes/${recipeId}`, {
        title,
        difficulty,
        ingredients: cleanIngredients, 
      });

      router.push('/'); // back to home
    } catch (error) {
      alert('Error updating recipe');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading recipe data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">✏️ Edit Recipe</h1>

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
            />
          </div>

          {/* DIFFICULTY */}
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

          {/* INGREDIENTS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
            
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item"
                  required
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
                />
                <input
                  type="text"
                  placeholder="Qty"
                  required
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  className="w-24 p-2 border border-gray-300 rounded-lg outline-none"
                />
                
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg font-bold"
                >
                  ✕
                </button>
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

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-1/2 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-1/2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Updating...' : 'Update Recipe'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}