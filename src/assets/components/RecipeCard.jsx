import { Card, Button } from 'react-bootstrap';

function RecipeCard({ recipe }) {
  const { title, description, ingredients } = recipe;

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Ingredientes:</strong> {ingredients}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" className="w-100">
          Editar
        </Button>
        <Button variant="warning" className="w-100 mt-2">
          Calificar
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default RecipeCard;
