import { useState } from  "react";
import './App.css';
import api from "./services/Api.js";
import { FiSearch } from "react-icons/fi";



export default function App() {
  
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  
  async function resultSearch() {
    if (input === "" ){
      alert("Digite algo por favor")
      return
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }
    catch{
      alert("Ops...algo deu errado");
      setInput("");
    }
  }


  return (
    <div className="container">
      <h1 className="titulo">
        Buscador de CEP
      </h1>


      <div className="container-input">
        
        <input type="text" placeholder='Digite seu cep' value={input} onChange={ (e) => setInput(e.target.value)}/>

        <button type="submit" className="input-btn" onClick={resultSearch}>
          <FiSearch size={25} color="#000"/>
        </button>
        
      </div>


      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>Cep: {cep.cep}</h2>

          {Object.keys(cep.logradouro).length > 0 && (
            <span>{cep.logradouro}</span>
          )}
          
          {Object.keys(cep.complemento).length > 0 && (
            <span>Complemento: {cep.complemento}</span>
          )}

          {Object.keys(cep.bairro).length > 0 && (
            <span>Bairro: {cep.bairro}</span>
          )}

          {Object.keys(cep.ddd).length > 0 && (
            <span>DDD: {cep.ddd}</span>
          )}
                    
          {Object.keys(cep.localidade).length > 0 && (
            <span>{cep.localidade} - {cep.uf}</span>
          )}
          
        </main>
      )}
      
    </div>
  )
}
