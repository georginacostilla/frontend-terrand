import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import CreateRecipe from '../components/CreateRecipe';
import EditRecipe from '../components/EditRecipe';
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {

      const token = localStorage.getItem('token')
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await axios.get(`http://localhost:8000/api/v1/recetas/user-recipes/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error al obtener recetas:', error);
      }
    };

    fetchRecipes();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Has cerrado sesión correctamente.',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      navigate('/');
    });
  };

  const handleSaveRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowEditModal(true);
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
    );
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
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="col-md-4 mb-3" key={recipe.id}>
              <RecipeCard recipe={recipe} onEdit={handleEditClick} />
            </div>
          ))
        ) : (
          <p className="text-white text-center fs-5 mt-4">
            No hay recetas disponibles. Crea una nueva
          </p>

        )}
      </div>

      <CreateRecipe
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveRecipe}
      />

      {selectedRecipe && (
        <EditRecipe
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          recipe={selectedRecipe}
          onUpdate={handleUpdateRecipe}
        />
      )}
    </div>
  );
}

export default Recipe;
