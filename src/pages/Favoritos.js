import React from "react";
import { useCart } from "../CartContext";

{/*a. Lista de produtos favoritos*/}

const Favoritos = () => {
    const { favorites, addToCart, removeFromFavorites } = useCart();
  
    return (
      <div className="favoritos-container" style={{ padding: "20px" }}>
        <h1>Meus Favoritos</h1>
        {favorites.length === 0 ? (
          <p>Você não tem nenhum produto favorito ainda.</p>
        ) : (
          <div className="produtos-grid">
            {favorites.map((produto) => {
              const averageRating =
                produto.reviews && produto.reviews.length > 0
                  ? (
                      produto.reviews.reduce((sum, r) => sum + r.score, 0) /
                      produto.reviews.length
                    ).toFixed(1)
                  : "N/A";
              return (
                <div key={produto.id} className="produto_card">
                  <div className="produto_tipo">
                    <p>{produto.category}</p>
                  </div>
                  <div className="produto_img">
                    <img
                      src={produto.image}
                      alt=""
                      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="produto_title">
                    <h2>{produto.name}</h2>
                    <p>{produto.description}</p>
                  </div>
                  <div className="produto_button">
                    <div className="price">
                      <h3>Preço</h3>
                      <p>€ {produto.price}</p>
                    </div>
                    <div className="rating">
                      <span>⭐ {averageRating}</span>
                    </div>
                    <button
                      className="button"
                      onClick={() =>
                        addToCart({
                          id: produto.id,
                          name: produto.name,
                          price: produto.price,
                          quantity: 1,
                        })
                      }
                    >
                      Comprar
                    </button>
                    <button
                      className="button"
                      onClick={() => removeFromFavorites(produto.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  
  export default Favoritos;
  