import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContex"

export default function AdminGuard({children}){
    const{user}=useUser()
    
    
    
    return user?.role==="admin"? children:<Navigate  to="/" replace/>
}