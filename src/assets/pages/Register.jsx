import { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './styleForm.css';
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      Swal.fire({
        icon: "warning",
        title: "Contraseñas no coinciden",
        text: "Por favor, asegúrate de que ambas contraseñas sean iguales.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Registro exitoso. Ahora puedes iniciar sesión.",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo ya está en uso o hubo un error.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <div className='mt-5'>
        <Form className="form" onSubmit={handleRegister}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <span>Nombre</span>
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Row className="flex">
            <Col>
              <Form.Group controlId="formLastname">
                <Form.Label>
                  <Form.Control
                    type="text"
                    className="input"
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <span>Apellido</span>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
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
