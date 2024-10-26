import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTable from "../../components/user-table/UserTable"
import Swal from "sweetalert2";

const URL = "http://localhost:3000";

export default function AdminUser(){
  const[users, setUsers]=useState([])
  const[selectedUser, setSelectedUser]=useState(null)
const{reset,setValue,register,formState:{errors, isValid} , handleSubmit}=useForm()

useEffect(()=>{
  getUsers()
},[])
useEffect(()=>{
  if(selectedUser) {
    setValue("name",selectedUser.name)
    setValue("mail", selectedUser.mail)
    setValue("pasword", selectedUser.pasword)
    setValue("createdAt",selectedUser.createdAt)
    setValue("image",selectedUser.image)
  }  else {
    reset()
  }

}, [ selectedUser, setValue, reset ])




function deleteUser(identificador) {

  Swal.fire({
    title: "Borrar producto",
    text: "Realmente desea borrar este producto",
    icon: "warning",
    reverseButtons: true,
    showCancelButton: true,
  }).then(async(result) => {
    try {
      if(result.isConfirmed) {
        const response = await axios.delete(`${URL}/users/${identificador}`);

        console.log(response.data);
  
        getUsers();
      }
    } catch (error) {
      console.log(error)
      // Mensaje para el usuario de que algo falló
      Swal.fire({
        title: "Error al borrar",
        text: "El producto no fue borrado",
        icon: "error"
      })
    }
  })

}

async function onUsersSumbit(usuarios) {
  console.log(usuarios);

  try {
    if (selectedUser) {
      // Actualizar usuario existente
      const { id } = selectedUser;
      const response = await axios.put(`${URL}/users/${id}`, usuarios);
      console.log(response.data);
      
      Swal.fire({
        title: "Actualización correcta",
        text: "El usuario fue actualizado correctamente",
        icon: "success",
        timer: 1500
      });

      // Limpiar usuario seleccionado
      setSelectedUser(null);
    } else {
      // Crear un nuevo usuario
      const response = await axios.post(`${URL}/users`, usuarios);
      console.log('ID del nuevo usuario:', response.data.id);
      reset();  // Limpiar el formulario después de crear
    }

    // Obtener lista actualizada de usuarios
    getUsers();

  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al procesar la solicitud",
      icon: "error"
    });
  }
}


async function getUsers() {
  try {

    const response= await axios.get(`${URL}/users`)
    console.log(response.data)

    setUsers(response.data)
  } catch (error) {
    console.log(error)
  }
    }

    function handleEditUser(usuario){
      console.log(usuario)
      setSelectedUser(usuario)
 

    }





      return (
        <>





<div className="admin-container">
          {/* Contenedor del formulario */}
          <div className="form-container">  
          <form onSubmit={handleSubmit(onUsersSumbit)} className="admin-form">

              <div className="input-group">
                <label htmlFor="name">Nombre de usuario</label>

                <input type="text" id="name" 
                        {...register("name", { required: true, minLength: 3 }) 
                } />

                { errors.name?.type === "required" && <div className="input-error">El campo es requerido</div> }

                { errors.name?.type === "minLength" && <div className="input-error">Mínimo de carácteres es 3</div> }

              </div>

              <div className="input-group">
                <label htmlFor="mail">Mail</label>
                <input type="text" {...register("mail", { required: true }) } />

                { errors.mail && <div className="input-error">El campo mail es requerido</div> }
              </div>

              <div className="input-group">
                <label htmlFor="pasword">Contraseña de usuario</label>

                <input type="text" id="pasword" 
                        {...register("pasword", { required: true, minLength: 3 }) 
                } />

                { errors.pasword?.type === "required" && <div className="input-error">El campo es requerido</div> }

                { errors.pasword?.type === "minLength" && <div className="input-error">Mínimo de carácteres es 3</div> }

              </div>


              <div className="input-group">
                <label htmlFor="createdAt">Fecha de ingreso</label>
                <input type="date" {...register("createdAt")}  />
              </div>

                <div className="input-group">
                  <label htmlFor="">Imagen</label>
                  <input type="url" {...register("image") } />
                </div>

              {/* <button className={`btn ${selectedProduct && 'btn-success'}`}       
                      type="submit" 
                      disabled={ !isValid }  > 

                {
                  selectedProduct ? "Editar" : "Crear"
                } */}
{/* 
              </button> */}
                <button
                className={`btn${selectedUser && ``}`}
                type="sumbit"
                disabled={ !isValid }
                >{
                  selectedUser? "Editar": "Crear"
                } </button>
            </form>

          </div>
          <div className="table-container">
            <UserTable users={users}
                              deleteUser={deleteUser}
                              handleEditUser={handleEditUser}/>

          </div>
          {/* Contenedor de la tabla de productos */}

      </div>

        </>
      )
}