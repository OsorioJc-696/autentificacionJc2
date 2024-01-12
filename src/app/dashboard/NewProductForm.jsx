import React from 'react';

const NewProductForm = ({ addingProduct, newProductData, handleInputChangeProduct, handleSaveNewProduct, handleCancelProduct, handleAddProduct }) => {
  return (
    <div className="my-5">
      {addingProduct ? (
        <div className='mx-auto flex justify-center '>
          <div className="bg-white p-4 rounded shadow flex flex-col">
            <h3 className="text-black text-xl mb-2">Agregar Nuevo Producto:</h3>
            {/* Agregar inputs según las propiedades del producto */}
            <input
              type="text"
              value={newProductData.nombre || ''}
              onChange={(e) => handleInputChangeProduct(e, 'nombre')}
              className="border p-2 mb-2"
              placeholder="Nombre"
            />
            <input
                type="text"
                value={newProductData.descripcion || ''}
                onChange={(e) => handleInputChangeProduct(e, 'descripcion')}
                className="border p-2 mb-2"
                placeholder="Descripcion"
                />
            <input
                type="text"
                value={newProductData.precio || ''}
                onChange={(e) => handleInputChangeProduct(e, 'precio')}
                className="border p-2 mb-2"
                placeholder="Precio"
                />  
            <input
                type="text"
                value={newProductData.cantidad || ''}
                onChange={(e) => handleInputChangeProduct(e, 'cantidad')}
                className="border p-2 mb-2"
                placeholder="Cantidad"
                />
            <input
                type="text"
                value={newProductData.categoria || ''}
                onChange={(e) => handleInputChangeProduct(e, 'categoria')}
                className="border p-2 mb-2"
                placeholder="Categoria"
                />
            <input
                type="text"
                value={newProductData.imagen || ''}
                onChange={(e) => handleInputChangeProduct(e, 'imagen')}
                className="border p-2 mb-2"
                placeholder="Imagen"
                />
            <input
                type="text"
                value={newProductData.marca || ''}
                onChange={(e) => handleInputChangeProduct(e, 'marca')}
                className="border p-2 mb-2"
                placeholder="Marca"
                />
            <input
                type="text"
                value={newProductData.modelo || ''}
                onChange={(e) => handleInputChangeProduct(e, 'modelo')}
                className="border p-2 mb-2"
                placeholder="Modelo"
                />
            <input
                type="text"
                value={newProductData.peso || ''}
                onChange={(e) => handleInputChangeProduct(e, 'peso')}
                className="border p-2 mb-2"
                placeholder="Peso"
                />
            <input
                type="text"
                value={newProductData.profundidad || ''}
                onChange={(e) => handleInputChangeProduct(e, 'profundidad')}
                className="border p-2 mb-2"
                placeholder="Profundidad"
                />
            <input
                type="text"
                value={newProductData.voltaje || ''}
                onChange={(e) => handleInputChangeProduct(e, 'voltaje')}
                className="border p-2 mb-2"
                placeholder="Voltaje"
                />
                
            <div className="flex mt-2 justify-center">
              <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2" onClick={handleSaveNewProduct}>
                Guardar
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={handleCancelProduct}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md " onClick={handleAddProduct}>
            Agregar Nuevo Producto
          </button>
        </div>
      )}
    </div>
  );
};

export default NewProductForm;
