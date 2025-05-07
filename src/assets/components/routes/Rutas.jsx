import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Recipe from "../../pages/Recipe";
import PrivateRoute from "./PrivateRoute";
import PublicRecipe from '../routes/PublicRecipe';

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recipe" element={<PrivateRoute><Recipe /></PrivateRoute>} />
      <Route path="/recetas/public/:publicId" element={<PublicRecipe />} />
    </Routes>
  );
};

export default Rutas;
