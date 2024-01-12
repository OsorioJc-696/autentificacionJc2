import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const ProductList = ({ products, setProducts }) => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({
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
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach(URL.revokeObjectURL);
    };
  }, [imageUrls]);

  const handleEdit = (productId, productData) => {
    setEditingProductId(productId);
    setUpdatedProductData(productData);
  };

  const handleInputChange = (e, field) => {
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSave = (productId) => {
    const formData = new FormData();
    formData.append('file', updatedProductData.fotografia);
    formData.append('marca', updatedProductData.marca);
    formData.append('modelo', updatedProductData.modelo);
    formData.append('garantia', updatedProductData.garantia);
    formData.append('color', updatedProductData.color);
    formData.append('voltaje', updatedProductData.voltaje);
    formData.append('alto', updatedProductData.alto);
    formData.append('ancho', updatedProductData.ancho);
    formData.append('profundidad', updatedProductData.profundidad);
    formData.append('eficienciaEnergetica', updatedProductData.eficienciaEnergetica);
    formData.append('peso', updatedProductData.peso);

    fetch(`http://localhost:8080/api/productos/${productId}/upload-image`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log(`Imagen del producto con ID ${productId} subida con éxito`);
          return response.json();
        } else {
          throw new Error('Error al subir la imagen del producto');
        }
      })
      .then(() => {
        fetch(`http://localhost:8080/api/productos/${productId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            marca: updatedProductData.marca,
            modelo: updatedProductData.modelo,
            garantia: updatedProductData.garantia,
            color: updatedProductData.color,
            voltaje: updatedProductData.voltaje,
            alto: updatedProductData.alto,
            ancho: updatedProductData.ancho,
            profundidad: updatedProductData.profundidad,
            eficienciaEnergetica: updatedProductData.eficienciaEnergetica,
            peso: updatedProductData.peso,
            fotografia: updatedProductData.fotografia.name,
          }),
        })
          .then(response => {
            if (response.ok) {
              console.log(`Producto con ID ${productId} actualizado con éxito`);
              return response.json();
            } else {
              throw new Error('Error al actualizar el producto');
            }
          })
          .then(updatedProduct => {
            setProducts(prevProducts =>
              prevProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
              )
            );
            setEditingProductId(null);
          })
          .catch(error => {
            console.error('Error al actualizar el producto:', error);
          });
      })
      .catch(error => {
        console.error('Error al subir la imagen del producto:', error);
      });
  };

  const handleCancel = () => {
    setEditingProductId(null);
  };

  const handleDelete = (productId) => {
    // Eliminar la imagen del servidor antes de eliminar el producto
    deleteImage(productId);
  
    fetch(`http://localhost:8080/api/productos/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log(`Producto con ID ${productId} eliminado con éxito`);
          // Filtra los productos para excluir el producto eliminado
          setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== productId)
          );
        } else {
          throw new Error('Error al eliminar el producto');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  };
  const deleteImage = (productId) => {
    const imageName = updatedProductData.fotografia && updatedProductData.fotografia.name;
  
    if (imageName) {
      fetch(`http://localhost:8080/api/productos/${productId}/delete-image/${imageName}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            console.error(`Error al eliminar la imagen del producto con ID ${productId}`);
          }
        })
        .catch(error => {
          console.error(`Error al eliminar la imagen del producto con ID ${productId}:`, error);
        });
    }
  };
  const handleImageDrop = useCallback((acceptedFiles) => {
    const imageUrl = URL.createObjectURL(new Blob([acceptedFiles[0]]));

    setImageUrls((prevUrls) => ({ ...prevUrls, [updatedProductData.id]: imageUrl }));
    setUpdatedProductData((prevData) => ({ ...prevData, fotografia: acceptedFiles[0] }));
  }, [setUpdatedProductData, setImageUrls, updatedProductData.id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: handleImageDrop,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.slice(0).reverse().map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          <div id='listaProducto' className="">
            <p className="text-black font-bold ">ID: {product.id}</p>
            <img src={imageUrls[product.id]} alt={`Imagen de ${product.fotografia}`} />

            <p className="text-black">Marca: {product.marca}</p>
            <p className="text-black">Modelo: {product.modelo}</p>
            <p className="text-black">Garantía: {product.garantia}</p>
            <p className="text-black">Color: {product.color}</p>
            <p className="text-black">Voltaje: {product.voltaje}</p>
            <p className="text-black">Alto: {product.alto}</p>
            <p className="text-black">Ancho: {product.ancho}</p>
            <p className="text-black">Profundidad: {product.profundidad}</p>
            <p className="text-black">Eficiencia Energética: {product.eficienciaEnergetica}</p>
            <p className="text-black">Peso: {product.peso}</p>
          </div>

          <div id='editarProducto' className="flex mt-2 justify-center">
            {editingProductId === product.id ? (
              <div className="flex flex-col items-center">
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p className="text-gray-600">
                    {isDragActive ? 'Suelta la imagen aquí' : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'}
                  </p>
                </div>

                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.marca}
                  onChange={(e) => handleInputChange(e, 'marca')}
                  placeholder='Marca'
                />
               
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.modelo}
                  onChange={(e) => handleInputChange(e, 'modelo')}
                  placeholder='Modelo'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.garantia}
                  onChange={(e) => handleInputChange(e, 'garantia')}
                  placeholder='Garantía'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.color}
                  onChange={(e) => handleInputChange(e, 'color')}
                  placeholder='Color'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.voltaje}
                  onChange={(e) => handleInputChange(e, 'voltaje')}
                  placeholder='Voltaje'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.alto}
                  onChange={(e) => handleInputChange(e, 'alto')}
                  placeholder='Alto'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.ancho}
                  onChange={(e) => handleInputChange(e, 'ancho')}
                  placeholder='Ancho'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.profundidad}
                  onChange={(e) => handleInputChange(e, 'profundidad')}
                  placeholder='Profundidad'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.eficienciaEnergetica}
                  onChange={(e) => handleInputChange(e, 'eficienciaEnergetica')}
                  placeholder='Eficiencia Energética'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.peso}
                  onChange={(e) => handleInputChange(e, 'peso')}
                  placeholder='Peso'
                />

                <div className="flex items-center">
                  <button
                    className="bg-green-500 hover:bg-green-700 my-1 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleSave(product.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-red-500 hover.bg-red-700 text-white px-2 py-1 rounded"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(product.id, product)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover.bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
