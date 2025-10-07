import './signIn.moldule.css'
import { useState } from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/auth';
import { useContext } from 'react';


export default function SignIn() {
    const [email, setEmail] = useState('')
    const [senha , setSenha]= useState('')
    const {login,loadingAuth} = useContext(AuthContext)

    function handleSignIn(e){
        e.preventDefault()
        if(email !== '' && senha !== ''){
            login(email, senha)
        } 
        // alert('TESTE')
        // login

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
                <form onSubmit={handleSignIn} >
                    <h1>Entrar</h1>
                    <input type='email' 
                        placeholder='Digitar seu Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='********'
                        value={senha}
                        onChange= {(e)=> setSenha(e.target.value)}
                    />
                    <button
                        type='submit'
                    >{loadingAuth ? 'Carregando...' : 'Acessar' }
                    </button>
                </form>
                <Link to='/register'>Criar uma Conta</Link>
            </div>
        </div>
    );
}