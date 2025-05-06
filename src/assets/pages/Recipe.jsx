import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import CreateRecipe from '../components/CreateRecipe';
import EditRecipe from '../components/EditRecipe';
import axios from 'axios';
import Swal from "sweetalert2";
import jwt_decode from 'jwt-decode'; // Asegúrate de importar correctamente

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
      const token = localStorage.getItem('token');
      console.log('Token:', token); 
      if (!token) {
        console.error('Token no encontrado');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/v1/recetas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error al cargar las recetas:', error);
    }
  };

  const handleSaveRecipe = async (newRecipe) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    try {
      const decoded = jwt_decode(token);
      const userId = decoded.id;

      const recipeWithUser = {
        ...newRecipe,
        userId: userId,
      };

      const response = await axios.post('http://localhost:8000/api/v1/recetas', recipeWithUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecipes([...recipes, response.data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error saving recipe:', error);
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
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Has cerrado sesión correctamente.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      navigate('/');
    });
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
