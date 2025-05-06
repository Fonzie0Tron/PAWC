import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function ProdutoCard(props) {
    // Calculate average rating from reviews
    const averageRating = props.reviews && props.reviews.length > 0
        ? (props.reviews.reduce((sum, review) => sum + review.score, 0) / props.reviews.length).toFixed(1)
        : "N/A";

    const { addToCart, addToFavorites } = useCart();


    return (
        <div className="produto_card">
            <div class="produto_tipo"><p>{props.type}</p></div>
            <div class="produto_img"></div>
            <div class="produto_title">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
            <div class="produto_button">
                <div class="price">
                    <h3>Preço</h3>
                    <p>€ {props.price}</p>
                </div>
                <div class="rating">
                    <span>⭐ {averageRating}</span>
            </div>

        {/* Comprar */}
        <button
          className="button"
          onClick={() =>
            addToCart({
              id: props.id,
              name: props.title,
              price: props.price,
              quantity: 1,
            })
          }
        >
          Comprar
        </button>

        {/* Favoritar */}
        <button
          className="button"
          onClick={() =>
            addToFavorites({
              id: props.id,
              name: props.title,
              price: props.price,
              type: props.type,
              description: props.description,
              reviews: props.reviews,
            })
          }
        >
          Favoritar
        </button>

            <Link
                to={`/produtos/${props.id}`} 
                className="button"
            >
                Detalhes
            </Link>
            </div>
        </div>
    );
}

export default ProdutoCard;