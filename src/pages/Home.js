import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import ProdutoCard from "../components/ProdutoCard";

{/* a. Seção com “top produtos” (produtos com maior rating)
b. Campo de pesquisa (pesquisa por nome de produto, tipo, categoria,
etc.) */}


const Home = () => {
    const [allProdutos, setAllProdutos] = useState([]);
    const [topProdutos, setTopProdutos] = useState([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3030/produtos', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
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

                setAllProdutos(sorted);
                setTopProdutos(sorted.slice(0, 6));

                const uniqueCats = [...new Set(sorted.map(p => p.category))];
                setCategories(uniqueCats);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        getProdutos();
    }, []);

    const handleFilter = e => {
        setFilterType(e.target.value);
    };

    const produtosParaMostrar = () => {
        if (search.trim() !== "" || filterType !== "all") {
            return allProdutos.filter(p =>
                (p.name.toLowerCase().includes(search.toLowerCase()) ||
                 p.category.toLowerCase().includes(search.toLowerCase()) ||
                 p.description.toLowerCase().includes(search.toLowerCase()))
                &&
                (filterType === "all" || p.category === filterType)
            );
        }
        return topProdutos;
    };

    const resultados = produtosParaMostrar();

    return (
        <div>
            <Slider />
            <div className="flex justify-center mb-4 space-x-4">
                <select
                    value={filterType}
                    onChange={handleFilter}
                    className="h-10 bg-white rounded-lg border border-gray-300 px-3 pr-8 focus:border-blue-500 focus:outline-none appearance-none"
                >
                    <option value="all">Todos os tipos</option>
                    {categories.sort().map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-4 pr-4 h-10 bg-white rounded-lg w-full max-w-md border border-gray-300 focus:border-blue-500 focus:outline-none transition-shadow shadow-sm focus:shadow-md"
                />
            </div>

            <h1>
                {search.trim() !== "" || filterType !== "all"
                    ? `Resultados${filterType !== "all" ? `: ${filterType}` : ""}${search.trim() !== "" ? ` para \"${search}\"` : ""}`
                    : "Top Produtos:"}
            </h1>

            <div className="comida-list">
                {resultados.length > 0 ? (
                    resultados.map(produto => (
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
        </div>
    );
};

export default Home;
