import React from 'react';

const UserList = ({ users, editingUserId, updatedUserData, handleEdit, handleSave, handleCancel, handleDelete, handleInputChange }) => {
  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map(user => (
        <div key={user.id} className="bg-white p-4 rounded shadow">
          <div className=''>
            <p className="text-black">ID: {user.id}</p>
            <p className="text-black">Nombre de Usuario: {user.username}</p>
            <p className="text-black">Correo Electrónico: {user.email}</p>
          </div>

          {editingUserId === user.id ? (
            <div className="mt-2">
              <input
                type="text"
                value={updatedUserData.username || user.username}
                onChange={(e) => handleInputChange(e, 'username')}
                className="border p-2 w-full"
              />
              <input
                type="email"
                value={updatedUserData.email || user.email}
                onChange={(e) => handleInputChange(e, 'email')}
                className="border p-2 mt-2 w-full"
              />
              <div className="mt-2 mx-auto flex">
                <div className=''>
                  <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2" onClick={() => handleSave(user.id)}>
                    Guardar
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(user.id, { username: user.username, email: user.email })}>
                Editar
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={() => handleDelete(user.id)}>
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
