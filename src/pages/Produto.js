import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../CartContext";
import ProdutoCard from "../components/ProdutoCard";

{/* Página individual de cada produto
a. Informação detalhada de cada produto
b. Botão para adicionar aos favoritos
c. Botão para adicionar ao carrinho de compras;
d. Seção com produtos similares; */}


function Produto() {
    const [produto, setProduto] = useState(null);
    const [similares, setSimilares] = useState([]);
    const { addToCart, addToFavorites } = useCart();
    const { id } = useParams();

    const getProduto = async () => {
        try {

            const response = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setProduto(data);


            const response2 = await fetch(
                `http://localhost:3000/produtos?category=${encodeURIComponent(data.category)}`,
                { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            const lista = await response2.json();

            setSimilares(lista.filter(p => p.id !== data.id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getProduto();
    }, [id]);

    if (!produto) return <p>Carregando produto…</p>;

    return (
        <div className="produto-page">
            <h1>{produto.name}</h1>
            <img src={produto.image} alt="" />

            <p>{produto.description}</p>
            <p><strong>Preço:</strong> €{produto.price}</p>
            <p><strong>Categoria:</strong> {produto.category}</p>

            <div className="produto_button">
                <button className="button"
                  onClick={() =>
                    addToCart({
                      id: produto.id,
                      name: produto.name,
                      price: produto.price,
                      quantity: 1
                    })
                  }
                >
                  Comprar
                </button>
                <button className="button"
                 onClick={() => addToFavorites(produto)}>
                  Favorito
                </button>
            </div>

            {similares.length > 0 && (
                <>
                  <h2>Produtos similares</h2>
                  <div className="produtos-grid">
                    {similares.map(p => (
                      <ProdutoCard
                        key={p.id}
                        id={p.id}
                        title={p.name}
                        price={p.price}
                        type={p.category}
                        description={p.description}
                        reviews={p.reviews}
                      />
                    ))}
                  </div>
                </>
            )}
        </div>
    );
}

export default Produto;
