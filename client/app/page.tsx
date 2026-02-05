'use client'; 

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Recipe } from '../types/recipe';     
import RecipeCard from '../components/RecipeCard'; 
import Link from 'next/link';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Error connecting to backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  // Borrar datos
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (error) {
      alert('Error deleting recipe');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            The Recipe Vault
          </h1>
          <Link href="/create" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-colors">
  + New Recipe
</Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-dashed border-2 border-gray-200">
            <p className="text-gray-400">No recipes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe._id} 
                recipe={recipe} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}