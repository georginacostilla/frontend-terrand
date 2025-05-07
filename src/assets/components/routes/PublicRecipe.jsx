import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../RecipeCard';

const PublicRecipe = () => {
  const { publicId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/recetas/public/${publicId}`);
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la receta');
      }
    };
    fetchRecipe();
  }, [publicId]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Cargando...</p>;

  return <RecipeCard recipe={recipe} isPublic={true} />;
};

export default PublicRecipe;
