import React, { useState, useEffect } from "react";
import ProdutoCard from "../components/ProdutoCard";

{/*a. Lista em forma de grelha com todos os produtos disponíveis na base
de dados;
b. Paginação;
c. Ordenar produtos por preço ou rating;
d. Filtrar por tipo de produto; */}

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("price");
    const [filterType, setFilterType] = useState("all");
    const [categories, setCategories] = useState([]);
    const itemsPerPage = 12;

    const getProdutos = async () => {
        try {
            const response = await fetch('http://localhost:3030/produtos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setProdutos(data);
            // Extract unique categories from products
            const uniqueCategories = [...new Set(data.map(product => product.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getProdutos();
    }, []);

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    const handleFilter = (e) => {
        setFilterType(e.target.value);
        setCurrentPage(1);
    };

    const filteredProducts = produtos.filter(product => 
        filterType === "all" ? true : product.category.toLowerCase().includes(filterType.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price descending") {
            return b.price - a.price;  // Higher price first
        } else if (sortBy === "price ascending") {
            return a.price - b.price;  // Lower price first
        } else if (sortBy === "rating descending" || sortBy === "rating ascending") {
            const avgA = a.reviews && a.reviews.length > 0 
                ? a.reviews.reduce((sum, r) => sum + r.score, 0) / a.reviews.length 
                : 0;
            const avgB = b.reviews && b.reviews.length > 0 
                ? b.reviews.reduce((sum, r) => sum + r.score, 0) / b.reviews.length 
                : 0;
            return sortBy === "rating descending" ? avgB - avgA : avgA - avgB;
        }
        return 0;
    });

    const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="produtos-page">
            <div className="filters">
                <div className="filter-group">
                    <label>Ordenar por:</label>
                    <select value={sortBy} onChange={handleSort}>
                        <option>Nada</option>
                        <option value="price descending">Preço: Maior para Menor</option>
                        <option value="price ascending">Preço: Menor para Maior</option>
                        <option value="rating descending">Avaliação: Melhor para Pior</option>
                        <option value="rating ascending">Avaliação: Pior para Melhor</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Filtrar por tipo:</label>
                    <select value={filterType} onChange={handleFilter}>
                        <option value="all">Todos</option>
                        {[...new Set(categories.map(category => category.split(' ')[0]))].sort().map(firstWord => (
                            <option key={firstWord} value={firstWord}>
                                {firstWord}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="produtos-grid">
                {currentProducts.length > 0 ? (
                    currentProducts.map((produto) => (
                        <ProdutoCard
                            key={produto.id}
                            id={produto.id}
                            title={produto.name}
                            price={produto.price}
                            type={produto.category}
                            description={produto.description}
                            reviews={produto.reviews}
                        />
                    ))
                ) : (
                    <p>Nenhum produto encontrado</p>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default Produtos;