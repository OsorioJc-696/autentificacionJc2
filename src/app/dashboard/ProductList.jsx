import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          {/* Mostrar otras propiedades del producto */}
          <div className=''>
            <p className="text-black">ID: {product.id}</p>
            <p className="text-black">Nombre: {product.nombre}</p>
            <p className="text-black">Descripcion: {product.descripcion}</p>
            <p className="text-black">Precio: {product.precio}</p>
            <p className="text-black">Cantidad: {product.cantidad}</p>
            <p className="text-black">Categoria: {product.categoria}</p>
            <p className="text-black">Imagen: {product.imagen}</p>
            <p className="text-black">Marca: {product.marca}</p>
            <p className="text-black">Modelo: {product.modelo}</p>
          </div>

          <div className="flex mt-2 justify-center">
            {/* Agregar botones de acciones para los productos si es necesario */}
            
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2">
              Editar
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
