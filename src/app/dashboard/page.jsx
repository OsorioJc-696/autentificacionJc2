"use client"
import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import NewProductForm from './NewProductForm';
import ProductList from './ProductList';

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

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

  
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-5 ">
        <h1 className="text-white text-5xl text-center">Logueado</h1>

        <div className="">
          <h2 className="text-white text-2xl mb-2">Usuarios Registrados:</h2>
          <div className='mx-auto flex justify-center text-center'>
            <UserList
              users={users}
              setUsers={setUsers}
            />
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-white text-2xl mb-4">Crear Nuevo Registrado:</h2>
          <NewProductForm
          setProducts={setProducts}
          />
        </div>

        <div className='mx-auto flex flex-col'>
          <h2 className="text-white text-2xl mb-4">Productos Registrados:</h2>
          <ProductList 
          products={products}
          setProducts={setProducts}
          />
        </div>

      </div>
    </section>
  );
}

export default DashboardPage;
