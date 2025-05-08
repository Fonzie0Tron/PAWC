import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import ProdutoCard from "../components/ProdutoCard";

{/* a. Seção com “top produtos” (produtos com maior rating)
b. Campo de pesquisa (pesquisa por nome de produto, tipo, categoria,
etc.) */}


const Home = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const getProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3030/produtos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();

                const sorted = data.sort((a, b) => {
                    const avgA = a.reviews && a.reviews.length > 0
                        ? a.reviews.reduce((sum, r) => sum + r.score, 0) / a.reviews.length
                        : 0;
                    const avgB = b.reviews && b.reviews.length > 0
                        ? b.reviews.reduce((sum, r) => sum + r.score, 0) / b.reviews.length
                        : 0;
                    return avgB - avgA;
                });

                setProdutos(sorted.slice(0, 6));

            } catch (error) {
                console.error('Error:', error);
            }
        };

        getProdutos();
    }, []);

    return (
        <div>
            <Slider />
            <h1>Top Produtos:</h1>
            <div className="comida-list">
                {produtos.map((produto) => (
                    <ProdutoCard
                        key={produto.id}
                        id={produto.id}
                        title={produto.name}
                        price={produto.price}
                        type={produto.category}
                        description={produto.description}
                        reviews={produto.reviews}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
