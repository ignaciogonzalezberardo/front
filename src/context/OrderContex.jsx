
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const OrderContext= createContext()

export const useOrder=()=> useContext(OrderContext)

export default function OrderProvider({children}){
    const [count, setCount] = useState(0); 
    const[order, setOrder]= useState([])
    const [toggleModal, setToggleModal]=useState(false)
    const[total, setTotal]=useState(0)


useEffect(()=>{
calculateCount()
calculateTotal()
    },[order])



    function addProduct(product){
        console.log("addProduct" , product.name)
        const productExist=order.find(prod=>prod.id===product.id)
        if(productExist){
    productExist.quantity++
    setOrder([...order])
        }

    
        else{
            product.quantity=1
            setOrder([...order,product])
        }
        
        Swal.fire({
            icon: "succes",
            position:'bottom-end',
            title: "Producto Agregado",
            padding:'.5rem',
            width:'300px'
        })

    }



    function calculateCount(){
        let cantidadItems=0
        for(let item of order){
            cantidadItems+=item.quantity
        }
        setCount(cantidadItems)
    }
    function calculateTotal(){
        let total=0
        order.forEach(item=>{
            total+= (item.price* item.quantity)
        })
        setTotal(total)
    }
    function removeProduct(id){
        const indice= order.findIndex(prod=>prod.id===id)
        const ordercopy=[...order]
        ordercopy.splice(indice, 1)
        setOrder(ordercopy)
    }

    function chanceItemQuantity(id, value){
        const newOrder=order.map(prod=>{
            if(prod.id===id){
                prod.quantity=value
            }
            return prod
        })
        setOrder(newOrder)
    }
    return( 
        <OrderContext.Provider
        value={{
            order,
            addProduct,
            toggleModal,
            setToggleModal,
            count,
            total,
            removeProduct,
            chanceItemQuantity
        }}> 
            {children}
        </OrderContext.Provider>
    )

}