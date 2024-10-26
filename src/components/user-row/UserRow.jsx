import './UserRow.css';

export default function UserRow({ user, deleteUser, handleEditUser }) {
  return (
    <tr className="admin-table-row">
      <td className="image">
        <img src={user.image} alt={user.name} />
      </td>
      <td className="name">
        {user.name}
      </td>
      <td className="mail-container">
        {user.mail}
      </td>
      <td className="password">
        {/* Mostrar asteriscos en lugar de la contraseña real */}
        {"*".repeat(user.pasword.length)}
      </td>
      <td className="date">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="actions">
        <div className="actions-container">
          <button className="btn" onClick={() => handleEditUser(user)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
