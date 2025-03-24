//import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import Layout from './pages/Layout';
import Kart from './pages/Kart';
import Catalogue from './pages/Catalogue';
import ProductDetails from './pages/ProductDetails';
import Administration from './pages/Administration';
import EditProduct from './pages/EditProduct';
import Contact from './pages/Contact';
import User from './pages/User';
import EditUser from './pages/EditUser';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Route de connexion sans le Layout avec menu */}
      <Route index element={<Login />} />

      {/* Routes protégées avec le Layout incluant le menu */}
      <Route element={<Layout />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/Catalogue" element={<Catalogue />} />
        <Route path="/Home/Contact" element={<Contact />} />
        <Route path="/Products/:idItem" element={<ProductDetails />} />
        <Route path="/Home/Administration/Product" element={<Product />} />
        <Route path="/Home/Administration/User" element={<User />} />
        <Route path="/Kart" element={<Kart />} />
        <Route path="/Home/Administration" element={<Administration />} />
        <Route path="/edit-product/:idItem" element={<EditProduct />} />
        <Route path="/edit-user/:idUser" element={<EditUser />} />
      </Route>
    </Route>
  )
)
function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}
export default App;
