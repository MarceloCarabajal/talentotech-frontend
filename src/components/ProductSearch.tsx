import React, { useState } from "react";

interface ProductSearchProps {
  onSearch: (query: string, by: "id" | "nombre") => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [by, setBy] = useState<"id" | "nombre">("nombre");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, by);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom:16}}>
      <select value={by} onChange={e => setBy(e.target.value as any)}>
        <option value="nombre">Nombre</option>
        <option value="id">ID</option>
      </select>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar producto..." />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default ProductSearch; 