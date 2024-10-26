import { useParams } from 'react-router-dom'
import './ProductDetail.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useOrder } from '../../context/OrderContex'
const URL= import.meta.env.VITE_SERVER_URL



export default function ProductDetail(){
  const{addProduct}=useOrder()
    const[product, setProduct]= useState()
    const {id}= useParams()
    useEffect(()=>{
        getProducts()
    },[])
    async function getProducts() {
        try {
            const response =await  axios.get(`${URL}/products/${id}`)
            setProduct(response.data)
        } catch (error) {
            alert("erorrrr")
            console.log(error)
        }
    }
        if(!product){
            return <h5>Cargando..........</h5>
        }

     return(

        <>
 
 

  <title>Amigos de la musica</title>

  <main>
    
    <section className="section-principal">
      <div className="div-container">
        <div className="producto">
          <div className="imagen">
            <img src={product?.image} alt="" />
          </div>
          <div className="info-producto">
            <h1>{product?.name}</h1>
            <h2>${product?.price}</h2>
            <p> </p>
            <ul>
              <li> Este instrumento es de {product?.category}</li>
              <br />
              <li>{product?.description}</li>

            </ul>
            <p />
            <div className="acciones">
              <button className="carro" onClick={()=>addProduct(product)}>Añadir al carro</button>
              <button className="ahora">Comprar ahora</button>
            </div>
          </div>
        </div>
        <div className="descripcion">
          <h3>Descripcion</h3>
          <p>
            {product?.descriptionp}
          </p>
        </div>
      </div>
    </section>
  </main>

</>

     )
}