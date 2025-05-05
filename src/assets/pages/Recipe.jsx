import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import CreateRecipe from '../components/CreateRecipe';
import EditRecipe from '../components/EditRecipe';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/recetas');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error al cargar las recetas:', error);
    }
  };

  const handleSaveRecipe = async (newRecipe) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/recetas', newRecipe);
      setRecipes((prev) => [...prev, response.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error al guardar receta:', error);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/recetas/${updatedRecipe.id}`, updatedRecipe);
      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === updatedRecipe.id ? response.data : recipe))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar receta:', error);
    }
  };

  const handleEditClick = (recipe) => {
    setRecipeToEdit(recipe);
    setShowEditModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          Crear nueva receta
        </button>

        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="row mt-4">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-3" key={recipe.id}>
            <RecipeCard recipe={recipe} onEdit={handleEditClick} />
          </div>
        ))}
      </div>

      <CreateRecipe
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveRecipe}
      />

      {recipeToEdit && (
        <EditRecipe
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateRecipe}
          recipe={recipeToEdit}
        />
      )}
    </div>
  );
}

export default Recipe;
