import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import ProdutoCard from "../components/ProdutoCard";
import UserComponent from "../components/UserComponent";

{/* a. Seção com “top produtos” (produtos com maior rating)
b. Campo de pesquisa (pesquisa por nome de produto, tipo, categoria,
etc.) */}


const Home = () => {
    let [produtos, setProdutos] = useState([]);
    let [filtro, setFiltro] = useState('Comida');
    const [userName, setUserName] = useState('');
  
    const [users, setUsers] = useState([
       {id: 0, name: "John"},
       {id: 1, name: "Doe"},
     ]);
  
  
    function handleChangeInput(e) {
      setUserName(e.target.value)
    }
  
  
    function handleAddUser() {
      setUsers([
        ...users,
        { id: users.length, name: userName}
      ]);
      setUserName('')
    } 

    const getProdutos = async (type) => {
        try {
        const response = await fetch('http://localhost:3030/produtos?type=' + filtro, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        });
        
        const data = await response.json();
        console.log(data)
        setProdutos(data);

        } catch (error) {
        console.error('Error:', error);
        }
    }

    const filtrar = (e) => {
        setFiltro(e.target.value);
        //getProdutos(e.target.value);
    }

    useEffect(() => {
        getProdutos(filtro);
    }, [filtro]);

    return (
        <div>
            <Slider />
            <ProdutoCard/>
            <UserComponent />
            <section>
                <select onChange={filtrar}>
                    <option value="Comida">Comida</option>
                    <option value="Roupa">Roupa</option>
                    <option value="Limpeza">Limpeza</option>
                </select>
            </section>
             <div class="comida-list">
                {produtos.map((produto) => (
                    <ProdutoCard {...produto} />
                ))}
            </div> 
            <input value={userName} onChange={handleChangeInput} />
            <button onClick={handleAddUser}>Add</button>
            <ul>
                {users.map((user) => (
                    <p key={user.id}>{user.name}</p>
                ))}
            </ul>
        </div>
    )
}
export default Home;