"use client"
import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import NewProductForm from './NewProductForm';
import ProductList from './ProductList';

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProductData, setNewProductData] = useState({
    id: '',
    alto: '',
    ancho: '',
    color: '',
    eficiencia_energetica: '',
    fotografia: '',
    garantia: '',
    marca: '',
    modelo: '',
    peso: '',
    profundidad: '',
    voltaje: '',
  });

  useEffect(() => {
    // Carga de usuarios
    fetch('http://localhost:8080/api/usuarios')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });

    // Carga de productos
    fetch('http://localhost:8080/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  // ... (el resto del código del DashboardPage)

  const handleEdit = (userId, userData) => {
    setEditingUserId(userId);
    setUpdatedUserData(userData);
  };

  const handleSave = (userId) => {
    fetch(`http://localhost:8080/api/usuarios/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    })
    .then(response => {
      if (response.ok) {
        console.log(`Usuario con ID ${userId} actualizado con éxito`);
        return response.json();
      } else {
        throw new Error('Error al actualizar el usuario');
      }
    })
    .then(updatedUser => {
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      setEditingUserId(null);
    })
    .catch(error => {
      console.error('Error al actualizar el usuario:', error);
    });
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:8080/api/usuarios/${userId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } else {
        throw new Error('Error al eliminar el usuario');
      }
    })
    .catch(error => {
      console.error('Error al eliminar el usuario:', error);
    });
  };

  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleSaveNewProduct = () => {
    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Nuevo producto agregado con éxito');
        return response.json();
      } else {
        throw new Error('Error al agregar el nuevo producto');
      }
    })
    .then(newProduct => {
      setProducts(prevProducts => [...prevProducts, newProduct]);
      setAddingProduct(false);
      setNewProductData({
        id: '',
        alto: '',
        ancho: '',
        color: '',
        eficiencia_energetica: '',
        fotografia: '',
        garantia: '',
        marca: '',
        modelo: '',
        peso: '',
        profundidad: '',
        voltaje: '',
      });
    })
    .catch(error => {
      console.error('Error al agregar el nuevo producto:', error);
    });
  };

  const handleCancelProduct = () => {
    setAddingProduct(false);
    setNewProductData({
      id: '',
      alto: '',
      ancho: '',
      color: '',
      eficiencia_energetica: '',
      fotografia: '',
      garantia: '',
      marca: '',
      modelo: '',
      peso: '',
      profundidad: '',
      voltaje: '',
    });
  };
  const handleInputChange = (e, field) => {
    setUpdatedUserData(prevData => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  const handleInputChangeProduct = (e, field) => {
    setNewProductData(prevData => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };


  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-5 ">
        <h1 className="text-white text-5xl text-center">Logueado</h1>

        <div className="">
          <h2 className="text-white text-2xl mb-2">Usuarios Registrados:</h2>
          <div className='mx-auto flex justify-center text-center'>
            <UserList
              users={users}
              editingUserId={editingUserId}
              updatedUserData={updatedUserData}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleCancel={handleCancel}
              handleDelete={handleDelete}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-white text-2xl mb-4">Crear Nuevo Registrado:</h2>
          <NewProductForm
            addingProduct={addingProduct}
            newProductData={newProductData}
            handleInputChangeProduct={handleInputChangeProduct}
            handleSaveNewProduct={handleSaveNewProduct}
            handleCancelProduct={handleCancelProduct}
            handleAddProduct={handleAddProduct}
          />
        </div>

        <div className='mx-auto flex flex-col'>
          <h2 className="text-white text-2xl mb-4">Productos Registrados:</h2>
          <ProductList products={products} />
        </div>

      </div>
    </section>
  );
}

export default DashboardPage;
