import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styleForm.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      navigate("/recetas");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div>
      <h1 className="welcome-title text-center m-5">Bienvenido a la aplicación</h1>
      <Form className="form" onSubmit={handleLogin}>
        <p className="title">Iniciar sesión</p>
        <p className="message">Accede a tu cuenta para continuar.</p>

        <Form.Group controlId="loginEmail">
          <Form.Control
            type="email"
            className="input"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Correo electrónico</span>
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Control
            type="password"
            className="input"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Contraseña</span>
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

// import { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './styleForm.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/auth/login', {
//         email,
//         password,
//       });
//       // Si la autenticación es exitosa, guardar el token (si es necesario) y redirigir
//       localStorage.setItem('authToken', response.data.token); // Ejemplo, depende de lo que devuelvas del backend
//       navigate('/recetas'); // Redirige a las recetas u otra página
//     } catch (error) {
//       console.error('Error al iniciar sesión:', error);
//       setError('Credenciales incorrectas. Intenta nuevamente.');
//     }
//   };

//   return (
//     <div>
//       <h1 className='welcome-title text-center m-5'>Bienvenido a la aplicación</h1>
//       <Form className="form" onSubmit={handleLogin}>
//         <p className="title">Iniciar sesión</p>
//         <p className="message">Accede a tu cuenta para continuar.</p>

//         {error && <p className="text-danger">{error}</p>} {/* Mostrar error si existe */}

//         <Form.Group controlId="loginEmail">
//           <Form.Label>
//             <Form.Control
//               type="email"
//               className="input"
//               placeholder=" "
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} // Actualiza el email
//             />
//             <span>Correo electrónico</span>
//           </Form.Label>
//         </Form.Group>

//         <Form.Group controlId="loginPassword">
//           <Form.Label>
//             <Form.Control
//               type="password"
//               className="input"
//               placeholder=" "
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Actualiza la contraseña
//             />
//             <span>Contraseña</span>
//           </Form.Label>
//         </Form.Group>

//         <Button type="submit" className="submit w-100">
//           Iniciar sesión
//         </Button>

//         <p className="signin">
//           ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
//         </p>
//       </Form>
//     </div>
//   );
// };

// export default Login;
