import React from "react";
import type { Producto } from "../types";

interface ProductDetailProps {
  producto: Producto | null;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ producto, onClose }) => {
  if (!producto) return null;
  return (
    <div className="product-detail">
      <h2>Detalle del Producto</h2>
      <p><b>ID:</b> {producto.id}</p>
      <p><b>Nombre:</b> {producto.nombre}</p>
      <p><b>Descripción:</b> {producto.descripcion}</p>
      <p><b>Precio:</b> ${producto.precio}</p>
      <p><b>Categoría:</b> {producto.categoria?.nombre}</p>
      <p><b>Stock:</b> {producto.cantidadEnStock}</p>
      <img src={producto.imagen} alt={producto.nombre} style={{maxWidth:200}} />
      <br />
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ProductDetail; 