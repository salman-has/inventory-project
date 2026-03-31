import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './components/router/router'
import ProductDetails from './pages/productDetails/productDetails'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router></Router>
    <ProductDetails></ProductDetails>
  </StrictMode>
)
