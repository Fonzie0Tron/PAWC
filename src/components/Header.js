import { NavLink } from "react-router-dom";
import React from "react";
import { useCart } from "../CartContext";

{/* logo, menu e contador
com o número total de produtos no carrinho*/}

function Header () {
    // Fallback caso useCart retorne undefined
    const cartContext = useCart() || {};
    const { totalItems = 0 } = cartContext; // Valor padrão 0

    function openMenu() {
        const navList = document.querySelector('.nav-list');
        navList.classList.toggle('active');
    }
    return (
        <header class="header">
            <div class="logo">
                <h1>Produtos</h1>
            </div>
            <nav class="nav">
                <ul class="nav-list" onClick={openMenu}>
                    <li><NavLink to='/' >Home</NavLink></li>
                    <li><NavLink to='/produtos' >Produtos</NavLink></li>
                    <li><NavLink to="/carrinho" className="cart-link">Carrinho ({totalItems})</NavLink></li>
                </ul>
            </nav>
            <div class="menu-toggle" id="menu-toggle" onClick={openMenu}>
                ☰
            </div>
        </header>
    )
}
export default Header;