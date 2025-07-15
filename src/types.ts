// src/types.ts
export interface Categoria {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  imagen?: string; // Opcional ya que no está en el DTO del backend
  cantidadEnStock: number;
}

// Tipo para enviar al backend (DTO)
export interface ProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number;
  cantidadEnStock: number;
} 