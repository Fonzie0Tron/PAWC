import React from "react";
import { useCart } from "../CartContext";

{/* a. Lista de todos os produtos adicionados à lista de compra;
    b. Remover / atualizar número de artigos;*/}


const Carrinho = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
    } = useCart();

    return (
        <div className="carrinho-container">
            <h1>Carrinho de Compras ({totalItems} itens)</h1>
            {cart.length === 0 ? (
                <p>O seu carrinho está vazio.</p>
            ) : (
                <div className="carrinho-items">
                    {cart.map((item) => (
                        <div key={item.id} className="carrinho-item">
                            <img 
                                src={item.image || "/imagens/pepino.jpg"} 
                                alt={item.name} 
                            />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p>€ {item.price.toFixed(2)}</p>
                                <div className="item-actions">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="remove-btn"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="carrinho-total">
                        <h3>Total: € {totalPrice.toFixed(2)}</h3>
                        <button className="checkout-btn">Finalizar Compra</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrinho;