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
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Administration/Product" element={<Product />} />
            <Route path="/Kart" element={<Kart />} />
            <Route path="/Administration/Catalogue" element={<Catalogue />} />
            <Route path="/Produit/:id" element={<ProductDetails />} />
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
