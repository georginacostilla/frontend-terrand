import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styleForm.css';
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Inicio de sesión exitoso.",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        navigate('/recetas');
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales incorrectas. Intenta nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <h1 className='welcome-title text-center m-5'>Bienvenido a la aplicación</h1>
      <Form className="form" onSubmit={handleLogin}>
        <p className="title">Iniciar sesión</p>
        <p className="message">Accede a tu cuenta para continuar.</p>

        <Form.Group controlId="loginEmail">
          <Form.Label>
            <Form.Control
              type="email"
              className="input"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Correo electrónico</span>
          </Form.Label>
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Label>
            <Form.Control
              type="password"
              className="input"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Contraseña</span>
          </Form.Label>
        </Form.Group>

        <Button type="submit" className="submit w-100">
          Iniciar sesión
        </Button>

        <p className="signin">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
