import React from "react";

function ProdutoCard(props) {
    // Calculate average rating from reviews
    const averageRating = props.reviews && props.reviews.length > 0
        ? (props.reviews.reduce((sum, review) => sum + review.score, 0) / props.reviews.length).toFixed(1)
        : "N/A";

    return (
        <div class="produto_card">
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
                <button class="button">Comprar</button>
                <button class="button">Favorito</button>
            </div>
        </div>
    );
}

export default ProdutoCard;