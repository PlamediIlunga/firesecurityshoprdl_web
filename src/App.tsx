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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Route de connexion sans le Layout avec menu */}
      <Route index element={<Login />} />
      
      {/* Routes protégées avec le Layout incluant le menu */}
      <Route element={<Layout />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/Administration/Product" element={<Product />} />
        <Route path="/Kart" element={<Kart />} />
        <Route path="/Administration/Catalogue" element={<Catalogue />} />
        <Route path="/Produit/:id" element={<ProductDetails />} />
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
