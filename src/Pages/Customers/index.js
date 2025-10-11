import { FiUser } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../services/FireBaseConectio";
import {addDoc, collection } from "firebase/firestore";




export default function Customers() {
    const [ nome, setNome ] = useState('')
    const [ cnpj, setCnpj ] = useState('')
    const [ endereco, setEndereco ] = useState('')


   async function handlenRegister(e){
      e.preventDefault();

      if(nome !== '' && cnpj!== '' && endereco!== ''){
        await addDoc(collection(db,"customers"),{
            nomeFantasia:nome,
            cnpj:cnpj,
            endereco:endereco
        })

      }
   } 

    return (
        <div>
            <Header />

            <div className="content">
                <Title nome='Clientes'>
                    <FiUser size={25}/>
                </Title>

                <div className="container" >
                    
                    <form className="form-profile" onSubmit={handlenRegister}>
                        <label>Nome Fantasia</label>
                        <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        />
                        <label>CNPJ</label>
                        <input
                        type="text"
                        placeholder="Digitar seu Cnpj"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label>Endereco</label>
                        <input
                        type="text"
                        placeholder="Digitar seu Endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        />

                        <button type="submit">
                            Salvar
                        </button>

                    </form>
                    
                    
                </div>


            </div>







        </div>
    );
}