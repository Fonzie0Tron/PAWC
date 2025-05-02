import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Header from "./components/Header";
{/*import Produto from "./pages/Produto";
import Favoritos from "./pages/Favoritos";
import Carrinho from "./pages/Carrinho";*/}


function App() {
 return (
   <div className="App">
     <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          {/*<Route path="/produto/:produto_id" element={<Produto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/favoritos" element={<Favoritos />} />*/ }
        </Routes>
       <Footer />
     </Router>
   </div>
 );
}

export default App;
