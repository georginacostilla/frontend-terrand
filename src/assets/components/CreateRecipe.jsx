import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateRecipe({ show, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !ingredients) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const newRecipe = {
      title,
      description,
      ingredients,
    };

    onSave(newRecipe);

    setTitle('');
    setDescription('');
    setIngredients('');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear nueva receta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Pizza casera"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contanos cómo es la receta"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ej: Harina, levadura, salsa..."
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Guardar receta
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default CreateRecipe
