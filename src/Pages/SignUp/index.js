// import './signIn.moldule.css'
import { useState, useContext } from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/auth';


export default function SignUp() {
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    const {SignUp ,loadingAuth } = useContext(AuthContext)


    async function handleSubmit(e){
e.preventDefault()
// console.log("handleSubmit foi chamado", nome, email, senha);

if(nome !== '' && email !== '' && senha !== ''){
await SignUp(email, senha, nome)
return

}

alert('FAZER CADASTRO')


}

    return (
        <div className='container-center' >
            <div className='login'>
                <div className='login-area'>
                    <img
                        src={logo}
                        alt='Logo do sistema de chamados'
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Nova conta</h1>

                    <input type='text'
                        placeholder='Digitar seu Nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <input type='email'
                        placeholder='Digitar seu Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='********'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button
                    type='submit'>
                       {loadingAuth ? 'Carregando...' : 'Cadastrar'}
                    </button>


                </form>
                <Link to='/'>Já Possui uma conta? Faça login</Link>
            </div>
        </div>
    );
}