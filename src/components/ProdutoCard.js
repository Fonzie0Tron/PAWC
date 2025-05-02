import React from "react";

function ProdutoCard(props) {
    return (
        <div class="produto_card">
                    <div class="produto_tipo"><p>Tipo</p></div>
                    <div class="produto_img"></div>
                    <div class="produto_title">
                        <h2>{props.title}</h2>
                        <p>Descrição produto</p>
                    </div>
                    <div class="produto_button">
                        <div class="price">
                            <h3>Price</h3>
                            <p>$ {props.price}</p>
                        </div>
                        <button class="button">Comprar</button>
                        <button class="button">Favorito</button>
                    </div>
                </div>

    )
}

export default ProdutoCard;