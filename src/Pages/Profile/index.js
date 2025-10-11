import Header from "../../components/Header";
import Title from "../../components/Title"
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from '../../assets/avatar.png'
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/auth";
import './Profile.css'
import { toast } from "react-toastify";
import { db, storage } from "../../services/FireBaseConectio";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const { user,storageUser,setUser,logout } = useContext(AuthContext)
  const [nome, setNome]= useState(user && user.nome)
  const [email,setEmail] = useState(user && user.email)
  const [avartarUrl, setAvartarUrl] = useState(user && user.avartarUrl)
  const [imageAvatar, setImageAvatar] = useState(null)

function handleFile(e){
// console.log(e.target.files);
if(e.target.files[0]){
  const image = e.target.files[0]

  if(image.type ==='image/jpeg' || image.type == 'image/png'){
    setImageAvatar(image)
    setAvartarUrl(URL.createObjectURL(image))
  }else{
   toast.warning("Envie uma Imagem do tipo PNG ou JPEG") 
   setImageAvatar(null)
   return
  }

}

}
async function handleUpload(){
const currentUid = user.uid
const updloadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
const updloadTask = uploadBytes(updloadRef, imageAvatar)
.then((snapshort)=>{
getDownloadURL(snapshort.ref).then( async (dowloadUrl) =>{
  let urlFoto = dowloadUrl;
  const docRef = doc(db, "users", user.uid )
  await updateDoc(docRef,{
    avartarUrl:urlFoto,
    nome:nome
  })
  .then(() =>{
     let data ={
        ...user,
        nome:nome,
        avartarUrl:urlFoto
      }
      setUser(data)
      storageUser(data)
      // console.log('ESSE MEU USER',user);
      
      toast.success("Atualizado com sucesso")
  })
})
})
}


async function handleSubmit(e){
  e.preventDefault();

  if(imageAvatar === null && nome !== ''){
    const docRef = doc(db,"users", user.uid)
    await updateDoc(docRef, {
      nome:nome
    })
    .then(() =>{
      let data ={
        ...user,
        nome:nome
      }
      setUser(data)
      storageUser(data)
      console.log('ESSE MEU USER',user);
      
      toast.success("Atualizado com sucesso")
    })
  }else if(nome !== '' && imageAvatar !== null){
    console.log('PASSOU AQUI');
    
  handleUpload()
  }


  // toast.success('teste')

}

  return (
    <div>
      <Header />
      <div className="content">
        <Title nome="Minha Conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile} /> <br />
              {avartarUrl === null ? (
                <img src={avatar} alt="Foto de perfil" width={250} height={250} />
              ) : (
                <img src={avartarUrl} alt="Foto de perfil" width={250} height={250} />
              )}


            </label>

            <label>Nome</label>
            <input 
            type="text" 
            placeholder="Seu Nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
             />

            <label>email</label>
            <input type="email"  disabled={true} value={email} />

            <button type="submit">
              Salvar
            </button>

          </form>
        </div >

        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Sair
          </button>
        </div>


      </div>

    </div>
  );
}