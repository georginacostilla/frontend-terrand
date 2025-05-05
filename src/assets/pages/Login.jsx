import { Form, Button } from 'react-bootstrap';
import './Register/styleForm.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Form className="form">
        <p className="title">Iniciar sesión</p>
        <p className="message">Accede a tu cuenta para continuar.</p>

        <Form.Group controlId="loginEmail">
          <Form.Label>
            <Form.Control
              type="email"
              className="input"
              placeholder=" "
              required
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
    </>
  );
};

export default Login;
