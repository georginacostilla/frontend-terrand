import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditRecipe({ show, onClose, onSave, recipe }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');

	useEffect(() => {
		if (recipe) {
			setTitle(recipe.title);
			setDescription(recipe.description);
			setIngredients(recipe.ingredients);
		}
	}, [recipe]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!title || !description || !ingredients) {
			alert('Todos los campos son obligatorios');
			return;
		}

		const updatedRecipe = {
			id: recipe.id,
			title,
			description,
			ingredients,
		};

		onSave(updatedRecipe);

		setTitle('');
		setDescription('');
		setIngredients('');
	};

	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Editar receta</Modal.Title>
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
						Guardar cambios
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default EditRecipe;
