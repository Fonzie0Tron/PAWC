import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Header from "./components/Header";
import Carrinho from "./pages/Carrinho";
import { CartProvider } from './CartContext';
import Favoritos from "./pages/Favoritos";
import Produto from "./pages/Produto";


function App() {
 return (
   <div className="App">
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/produtos/:id" element={<Produto />} />
        </Routes>
       <Footer />
     </Router>
    </CartProvider>
   </div>
 );
}

export default App;
