import React, { useState } from "react";
import type { Producto, Categoria } from "../types";

interface ProductFormProps {
  initial?: Partial<Producto>;
  categorias: Categoria[];
  onSubmit: (producto: Partial<Producto>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initial = {}, categorias, onSubmit, onCancel }) => {
  const [form, setForm] = useState<Partial<Producto>>({ ...initial });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "precio" || name === "stock" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.categoria || form.stock == null) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (form.precio <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }
    if (form.stock < 0) {
      setError("El stock no puede ser negativo");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.id ? "Editar" : "Agregar"} Producto</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <input name="nombre" placeholder="Nombre" value={form.nombre || ""} onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" value={form.descripcion || ""} onChange={handleChange} />
      <input name="precio" type="number" placeholder="Precio" value={form.precio || ""} onChange={handleChange} />
      <select name="categoria" value={form.categoria?.id || ""} onChange={e => setForm(f => ({ ...f, categoria: categorias.find(c => c.id === Number(e.target.value)) }))}>
        <option value="">Selecciona categoría</option>
        {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
      </select>
      <input name="imagen" placeholder="URL Imagen" value={form.imagen || ""} onChange={handleChange} />
      <input name="stock" type="number" placeholder="Stock" value={form.stock || ""} onChange={handleChange} />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ProductForm; 