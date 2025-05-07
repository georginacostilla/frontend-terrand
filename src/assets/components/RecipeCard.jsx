import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const RecipeCard = ({ recipe, onEdit }) => {
  const [rating, setRating] = useState(null);
  const [score, setScore] = useState(null);

  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;


  const getRating = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/calificaciones/usuario/${userId}/receta/${recipe.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRating(response.data.value);
      console.log(response.data, 'rating');
    } catch (error) {
      console.error('Error al obtener recetas:', error);
    }
  }

  useEffect(() => {
    getRating()
    console.log(rating, 'rating2');
  }, []);

  const sendRating = async () => {

    const calification = {
      value: parseInt(score, 10),
      userId: userId,
      recipeId: recipe.id
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/v1/calificaciones`, calification, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      getRating()
    } catch (error) {
      console.error('Error al obtener recetas:', error);
    }
  }

  return (
    <Card className="mb-4 shadow-sm rounded-3">
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Text><strong>Ingredientes:</strong> {recipe.ingredients}</Card.Text>
        <a href={`http://localhost:5173/recetas/public/${recipe.publicId}`} target="_blank">
          URL publica - Click aquí para ver la receta
        </a>

        <div className='mt-2'>
          {rating ? <p><strong>Tu calificación: </strong>{rating}</p> : <div>
            <select onChange={(e) => setScore(e.target.value)} name="" id="">
              <option value="">Seleccionar</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <Button variant="success" className='ms-3' onClick={sendRating}>Enviar</Button>
          </div>}
          <Button variant="primary" onClick={() => onEdit(recipe)}>Editar</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
