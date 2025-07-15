import React from "react";
import type { Producto } from "../types";

interface ProductListProps {
  productos: Producto[];
  onSelect: (producto: Producto) => void;
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ productos, onSelect, onEdit, onDelete }) => {
  if (!productos.length) return <div>No hay productos.</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(producto => {
          const sinCategoria = !producto.categoria?.nombre;
          const sinStock = !producto.cantidadEnStock;
          return (
            <tr key={producto.id} className={sinCategoria ? "sin-categoria" : sinStock ? "no-stock" : ""}>
              <td>{producto.id}</td>
              <td>{producto.nombre || ""}</td>
              <td>${producto.precio ?? 0}</td>
              <td>{producto.categoria?.nombre || "Sin categoría"}</td>
              <td>{producto.cantidadEnStock ?? 0}</td>
              <td>
                <button onClick={() => onSelect(producto)}>Ver</button>
                <button onClick={() => onEdit(producto)}>Editar</button>
                <button onClick={() => onDelete(producto.id)}>Eliminar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductList; 