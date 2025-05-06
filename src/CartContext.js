import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider(props) {
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Função para ADICIONAR produto ao carrinho
    function addToCart(product) {
        // Verifica se o produto já está no carrinho
        let productInCart = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                productInCart = true;
                break;
            }
        }

        // Se já está, aumenta a quantidade em 1
        if (productInCart) {
            const newCart = [];
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === product.id) {
                    newCart.push({
                        id: cart[i].id,
                        name: cart[i].name,
                        price: cart[i].price,
                        quantity: cart[i].quantity + 1
                    });
                } else {
                    const newItem = {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                      };
                      setCart(cart.concat(newItem));
                }
            }
            setCart(newCart);
        } 
        // Se não está, adiciona o produto com quantidade 1
        else {
            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            };
            setCart(cart.concat(newItem));
        }
    }

    // Função para REMOVER produto do carrinho
    function removeFromCart(productId) {
        const newCart = [];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id !== productId) {
                newCart.push(cart[i]);
            }
        }
        setCart(newCart);
    }

    // Função para ATUALIZAR quantidade
    function updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) return;

        const newCart = [];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId) {
                newCart.push({
                    id: cart[i].id,
                    name: cart[i].name,
                    price: cart[i].price,
                    quantity: newQuantity
                });
            } else {
                newCart.push(cart[i]);
            }
        }
        setCart(newCart);
    }

    // Função para adicionar aos favoritos
    function addToFavorites(product) {
        if (!favorites.some(f => f.id === product.id)) {
        setFavorites([...favorites, product]);
            }
        }

    // Função para remover dos favoritos
    function removeFromFavorites(productId) {
        setFavorites(favorites.filter(f => f.id !== productId));
        }


    
    // Calcula o TOTAL DE ITENS no carrinho
    function getTotalItems() {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].quantity;
        }
        return total;
    }

    // Calcula o PREÇO TOTAL do carrinho
    function getTotalPrice() {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;
        }
        return total;
    }

    // Disponibiliza os dados/funções para os componentes
    return (
        <CartContext.Provider
            value={{
                cart: cart,
                addToCart: addToCart,
                removeFromCart: removeFromCart,
                updateQuantity: updateQuantity,
                totalItems: getTotalItems(),
                totalPrice: getTotalPrice(),
                favorites,
                addToFavorites,
                removeFromFavorites,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}

// Hook personalizado para usar o carrinho
export function useCart() {
    return useContext(CartContext);
}