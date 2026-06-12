import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Repuesto } from "../models/Repuesto/responses/Repuesto";
import type { Servicio } from "../models/Servicio/responses/Servicio";

// Un ítem del carrito. Cada ítem se corresponde con un "servicio brindado":
// un repuesto (tipo "repuesto" + cantidad) o un servicio (tipo "servicio").
export interface CartItem {
  key: string; // identificador único en el carrito: `${tipo}-${id}`
  tipo: "repuesto" | "servicio";
  id: number; // idRepuesto o idServicio
  nombre: string;
  precio: number;
  cantidad: number;
  stock?: number; // tope de cantidad para repuestos
}

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  bump: boolean; // se activa brevemente al añadir, para animar el icono del header
  addRepuesto: (r: Repuesto, cantidad?: number) => void;
  addServicio: (s: Servicio) => void;
  setCantidad: (key: string, delta: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "cart_items";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });
  const [bump, setBump] = useState(false);
  const bumpTimer = useRef<number | undefined>(undefined);

  // Persiste el carrito en localStorage cada vez que cambia.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function triggerBump() {
    setBump(true);
    window.clearTimeout(bumpTimer.current);
    bumpTimer.current = window.setTimeout(() => setBump(false), 400);
  }

  function addRepuesto(r: Repuesto, cantidad = 1) {
    const key = `repuesto-${r.idRepuesto}`;
    setItems((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) {
        return prev.map((c) =>
          c.key === key ? { ...c, cantidad: Math.min(c.stock ?? Infinity, c.cantidad + cantidad) } : c
        );
      }
      return [
        ...prev,
        { key, tipo: "repuesto", id: r.idRepuesto, nombre: r.nombre, precio: Number(r.precio), cantidad, stock: r.stock },
      ];
    });
    triggerBump();
  }

  function addServicio(s: Servicio) {
    const key = `servicio-${s.idServicio}`;
    setItems((prev) => {
      // Los servicios son únicos en el carrito (no se acumulan en cantidad).
      if (prev.find((c) => c.key === key)) return prev;
      return [
        ...prev,
        { key, tipo: "servicio", id: s.idServicio, nombre: s.nombreServicio, precio: Number(s.precio), cantidad: 1 },
      ];
    });
    triggerBump();
  }

  function setCantidad(key: string, delta: number) {
    setItems((prev) =>
      prev.map((c) =>
        c.key === key ? { ...c, cantidad: Math.max(1, Math.min(c.stock ?? Infinity, c.cantidad + delta)) } : c
      )
    );
  }

  function remove(key: string) {
    setItems((prev) => prev.filter((c) => c.key !== key));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((a, c) => a + c.cantidad, 0);
  const subtotal = items.reduce((a, c) => a + c.precio * c.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, bump, addRepuesto, addServicio, setCantidad, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
