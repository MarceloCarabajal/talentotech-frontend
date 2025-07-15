import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";
import ProductSearch from "./components/ProductSearch";
import type { Producto, Categoria } from "./types";
import { getProductoById, getProductoByName, createProducto, updateProducto, getAllProductos, deleteProducto, getAllCategorias } from "./api";

function App() {
  const [selected, setSelected] = useState<Producto | null>(null);
  const [editing, setEditing] = useState<Producto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchResult, setSearchResult] = useState<Producto | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    getAllProductos().then(setProductos);
    getAllCategorias().then(setCategorias);
  }, []);

  const handleSearch = async (query: string, by: "id" | "nombre") => {
    setSearchResult(null);
    if (by === "id") {
      try {
        const prod = await getProductoById(Number(query));
        setSearchResult(prod);
      } catch {
        alert("Producto no encontrado");
      }
    } else {
      try {
        const prod = await getProductoByName(query);
        setSearchResult(Array.isArray(prod) ? prod[0] : prod);
      } catch {
        alert("Producto no encontrado");
      }
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (producto: Producto) => {
    setEditing(producto);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: Partial<Producto>) => {
    try {
      if (editing) {
        await updateProducto(editing.id, data);
      } else {
        await createProducto(data);
      }
      setShowForm(false);
      getAllProductos().then(setProductos);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteProducto(id);
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <div style={{padding:24}}>
      <h1>Gestión de Productos</h1>
      <ProductSearch onSearch={handleSearch} />
      <button className="agregar-btn" onClick={handleAdd}>Agregar Producto</button>
      <div className="table-container">
        {searchResult ? (
          <ProductDetail producto={searchResult} onClose={() => setSearchResult(null)} />
        ) : (
          <ProductList productos={productos} onSelect={setSelected} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      {selected && !showForm && (
        <ProductDetail producto={selected} onClose={() => setSelected(null)} />
      )}
      {showForm && (
        <ProductForm
          initial={editing || {}}
          categorias={categorias}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
