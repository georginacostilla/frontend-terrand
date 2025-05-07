import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const CreateRecipe = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSave = async () => {

    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const recipeData = {
      title,
      description,
      ingredients,
      userId
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/recetas', recipeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error creando receta:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear receta</Modal.Title>
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
        <Button variant="primary" onClick={handleSave}>Crear receta</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRecipe;
