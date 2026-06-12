import { useState, type ReactNode } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Calendar,
  Car,
  Package,
  Wrench,
  User,
  Bell,
  ShoppingCart,
  Menu,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Logo } from "./ui/Logo";
import { IconButton } from "./ui/IconButton";

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
}

const NAV: NavItem[] = [
  { to: "/dashboard", icon: Home, label: "Panel" },
  { to: "/citas", icon: Calendar, label: "Citas" },
  { to: "/vehiculo", icon: Car, label: "Vehículos" },
  { to: "/repuestos", icon: Package, label: "Repuestos" },
  { to: "/servicios", icon: Wrench, label: "Servicios" },
  { to: "/perfil", icon: User, label: "Perfil" },
];

interface LayoutProps {
  children: ReactNode;
}

// Envuelve cada página autenticada con el header, la barra lateral y la navegación inferior móvil.
export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { count, bump } = useCart();
  const [mobileNav, setMobileNav] = useState(false);

  const carritoActivo = location.pathname === "/carrito";

  return (
    <div className="min-h-[100svh] bg-neutral tex-grid">
      {/* Header */}
      <header
        className="sticky top-0 z-40 h-16 flex items-center gap-4 px-4 sm:px-7"
        style={{
          borderBottom: "1px solid var(--line)",
          background: "rgba(15,15,15,0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <button
          onClick={() => setMobileNav(true)}
          className="md:hidden bg-transparent border-0 text-white cursor-pointer p-0"
          aria-label="Abrir menú"
        >
          <Menu size={24} />
        </button>
        <button onClick={() => navigate("/dashboard")} className="bg-transparent border-0 cursor-pointer p-0">
          <Logo />
        </button>
        <div className="flex-1" />
        <IconButton icon={Bell} size={19} title="Notificaciones" />
        <button
          onClick={() => navigate("/carrito")}
          className="relative grid place-items-center w-[42px] h-[42px] rounded cursor-pointer"
          style={{
            border: "1px solid " + (carritoActivo ? "var(--primary)" : "var(--line-strong)"),
            background: carritoActivo ? "rgba(230,0,0,0.12)" : "transparent",
            color: carritoActivo ? "var(--primary)" : "#fff",
          }}
          aria-label="Carrito"
        >
          <ShoppingCart size={20} />
          {count > 0 && (
            <span
              className={"mono absolute -top-[7px] -right-[7px] min-w-5 h-5 px-1.5 rounded-[10px] text-[11px] font-extrabold grid place-items-center " + (bump ? "cart-pop" : "")}
              style={{ background: "var(--primary)", color: "#fff", border: "2px solid var(--neutral)" }}
            >
              {count}
            </span>
          )}
        </button>
      </header>

      <div className="flex max-w-[1440px] mx-auto">
        {/* Sidebar de escritorio */}
        <aside
          className="hidden md:flex flex-col w-[232px] shrink-0 sticky top-16 h-[calc(100svh-64px)]"
          style={{ borderRight: "1px solid var(--line)", background: "rgba(34,34,34,0.35)" }}
        >
          <SidebarNav onNavigate={() => {}} />
        </aside>

        {/* Contenido */}
        <main className="flex-1 min-w-0 p-5 sm:p-9 pb-24 md:pb-9">{children}</main>
      </div>

      {/* Drawer móvil */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-16 z-[39]"
            style={{ background: "rgba(8,8,8,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setMobileNav(false)}
          >
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-64 h-full flex flex-col"
              style={{ background: "#161616", borderRight: "1px solid var(--line)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarNav onNavigate={() => setMobileNav(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navegación inferior móvil */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-[38] h-[62px]"
        style={{ background: "rgba(15,15,15,0.95)", backdropFilter: "blur(10px)", borderTop: "1px solid var(--line)" }}
      >
        <div className="grid grid-cols-5 h-full">
          {NAV.slice(0, 5).map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className="flex flex-col items-center justify-center gap-[3px] text-secondary"
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <n.icon size={21} strokeWidth={isActive ? 2.4 : 2} style={{ color: isActive ? "var(--primary)" : undefined }} />
                  <span
                    className="mono text-[9.5px] uppercase font-bold"
                    style={{ letterSpacing: "0.04em", color: isActive ? "var(--primary)" : undefined }}
                  >
                    {n.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

// Contenido interno de la barra lateral (reutilizado en escritorio y en el drawer móvil).
function SidebarNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-3 pt-5 h-full">
      <div
        className="mono text-[10px] uppercase text-secondary font-bold px-3.5 pb-3 pt-1"
        style={{ letterSpacing: "0.2em" }}
      >
        Navegación
      </div>
      {NAV.map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          onClick={onNavigate}
          className={({ isActive }: { isActive: boolean }) =>
            `relative flex items-center gap-3 px-3.5 py-3 rounded-md font-semibold text-[14.5px] text-left w-full ${isActive ? "nav-active" : "text-secondary"}`
          }
        >
          {({ isActive }: { isActive: boolean }) => (
            <>
              <n.icon
                size={20}
                strokeWidth={isActive ? 2.4 : 2}
                style={{ color: isActive ? "var(--primary)" : "inherit" }}
              />
              {n.label}
            </>
          )}
        </NavLink>
      ))}

      <div className="mt-auto px-3.5 pt-4 pb-1.5">
        <div className="surface tex-carbon rounded-lg p-4" style={{ borderColor: "rgba(230,0,0,0.3)" }}>
          <Phone size={18} style={{ color: "var(--primary)" }} />
          <div className="font-bold text-white text-sm mt-2">¿Necesitás ayuda?</div>
          <div className="text-secondary text-[12.5px] mt-0.5">Llamanos al</div>
          <div className="mono text-primary font-bold text-[15px] mt-0.5">2253-8800</div>
        </div>
      </div>
    </nav>
  );
}
