import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styleForm.css';

const Register = () => {
  return (
    <>
      <div className='mt-5'>
        <Form className="form">
          <p className="title">Registro</p>
          <p className="message">Regístrate y explora todas las funcionalidades.</p>

          <Row className="flex">
            <Col>
              <Form.Group controlId="formFirstname">
                <Form.Label>
                  <Form.Control
                    type="text"
                    className="input"
                    placeholder=""
                    required
                  />
                  <span>Nombre</span>
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formEmail">
            <Form.Label>
              <Form.Control
                type="email"
                className="input"
                placeholder=" "
                required
              />
              <span>Email</span>
            </Form.Label>
          </Form.Group>

          <Form.Group controlId="formPassword">
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

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>
              <Form.Control
                type="password"
                className="input"
                placeholder=" "
                required
              />
              <span>Repetir contraseña</span>
            </Form.Label>
          </Form.Group>

          <Button type="submit" className="submit w-100">
            Registrarse
          </Button>

          <p className="signin">
            ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Register;
