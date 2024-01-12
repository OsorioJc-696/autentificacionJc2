import React, { useState }  from 'react';

const NewProductForm = ({setProducts}) => {
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProductData, setNewProductData] = useState({
    id: '',
    alto: '',
    color: '',
    eficienciaEnergetica: '',
    fotografia: '',
    garantia: '',
    marca: '',
    modelo: '',
    peso: '',
    profundidad: '',
    voltaje: '',
  });
  
  
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
        voltaje: '',
        fotografia: '',
        garantia: '',
        marca: '',
        modelo: '',
        profundidad: '',
        eficienciaEnergetica: '',
        peso: '',
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
        voltaje: '',
        fotografia: '',
        garantia: '',
        marca: '',
        modelo: '',
        profundidad: '',
        eficienciaEnergetica: '',
        peso: '',
    });
  };
  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleInputChangeProduct = (e, field) => {
    const value = e.target.value;
    setNewProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  
  return (
    <div className="my-5">
      {addingProduct ? (
        <div className='mx-auto flex justify-center '>
          <div className="bg-white p-4 rounded shadow flex flex-col">
            <h3 className="text-black text-xl mb-2">Agregar Nuevo Producto:</h3>
            {/* Agregar inputs según las propiedades del producto */}
            <input
                type="text"
                value={newProductData.alto || ''}
                onChange={(e) => handleInputChangeProduct(e, 'alto')}
                className="border p-2 mb-2"
                placeholder="Alto"
                />
            <input
                type="text"
                value={newProductData.ancho || ''}
                onChange={(e) => handleInputChangeProduct(e, 'ancho')}
                className="border p-2 mb-2"
                placeholder="Ancho"
                />
                <input
                type="text"
                value={newProductData.color || ''}
                onChange={(e) => handleInputChangeProduct(e, 'color')}
                className="border p-2 mb-2"
                placeholder="Color"
                />
                <input
  type="text"
  value={newProductData.eficienciaEnergetica}
  onChange={(e) => handleInputChangeProduct(e, 'eficienciaEnergetica')}
  className="border p-2 mb-2"
  placeholder="Eficiencia Energetica"
/>

                <input
                type="text"
                value={newProductData.fotografia || ''}
                onChange={(e) => handleInputChangeProduct(e, 'fotografia')}
                className="border p-2 mb-2"
                placeholder="Fotografia"
                />
                <input
                type="text"
                value={newProductData.garantia || ''}
                onChange={(e) => handleInputChangeProduct(e, 'garantia')}
                className="border p-2 mb-2"
                placeholder="Garantia"
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
