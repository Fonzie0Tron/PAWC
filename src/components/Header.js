import { NavLink } from "react-router-dom";
import React from "react";

{/* logo, menu e contador
com o número total de produtos no carrinho*/}

function Header () {
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
                    <li><NavLink to= '/carrinho' >Carrinho</NavLink></li>
                </ul>
            </nav>
            <div class="menu-toggle" id="menu-toggle" onClick={openMenu}>
                ☰
            </div>
        </header>
    )
}
export default Header;