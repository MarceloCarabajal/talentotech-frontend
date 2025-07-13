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
  imagen: string;
  cantidad_en_stock: number;
} 