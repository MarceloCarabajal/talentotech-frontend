// src/api.ts
const API_BASE = "http://localhost:9090";

// Mapeo de producto recibido del backend a modelo frontend
function mapProductoFromApi(apiProd: any) {
  return {
    ...apiProd,
    stock: apiProd.cantidadEnStock ?? 0, // Si es null/undefined, pone 0
  };
}

export async function getAllProductos() {
  const res = await fetch(`${API_BASE}/productos`);
  const data = await res.json();
  return Array.isArray(data) ? data.map(mapProductoFromApi) : [];
}

export async function getProductoById(id: number) {
  const res = await fetch(`${API_BASE}/productos/${id}`);
  const data = await res.json();
  return mapProductoFromApi(data);
}

export async function getProductoByName(nombre: string) {
  const res = await fetch(`${API_BASE}/productos/search/${encodeURIComponent(nombre)}`);
  const data = await res.json();
  if (Array.isArray(data)) return data.map(mapProductoFromApi);
  return mapProductoFromApi(data);
}

export async function createProducto(producto: any) {
  // Mapea stock a cantidadEnStock
  const payload = { ...producto, cantidadEnStock: producto.stock };
  delete payload.stock;
  const res = await fetch(`${API_BASE}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return mapProductoFromApi(data);
}

export async function updateProducto(id: number, producto: any) {
  const payload = { ...producto, cantidadEnStock: producto.stock };
  delete payload.stock;
  const res = await fetch(`${API_BASE}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return mapProductoFromApi(data);
}

export async function deleteProducto(id: number) {
  const res = await fetch(`${API_BASE}/productos/${id}`, {
    method: "DELETE" });
  return res.ok;
}

export async function getAllCategorias() {
  const res = await fetch(`${API_BASE}/categorias`);
  return res.json();
}

// Categoría: se pueden agregar funciones similares cuando se conozcan los endpoints. 