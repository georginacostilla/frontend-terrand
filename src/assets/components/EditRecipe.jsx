import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditRecipe = ({ show, onClose, recipe, onUpdate }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token')

    const updatedRecipe = {
      title,
      description,
      ingredients
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/v1/recetas/${recipe.id}`, updatedRecipe, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error actualizando receta:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar receta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formIngredients">
            <Form.Label>Ingredientes</Form.Label>
            <Form.Control
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleUpdate}>Actualizar receta</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRecipe;
