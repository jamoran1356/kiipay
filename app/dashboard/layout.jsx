import Link from "next/link"
import Image from "next/image"
import {
  Bell,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Percent,
  Settings,
  Users,
  Wallet,
  X,
  ShoppingCart,
  Package2,
  Receipt,
  BarChart3,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Alternar menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <MobileSidebar />
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Image src="/images/logo.webp" alt="Kiipay Logo" width={100} height={32} priority />
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notificaciones</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2463] text-white">
                  <span className="text-sm font-medium">JD</span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wallet className="mr-2 h-4 w-4" />
                <span>Billetera</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-white md:block">
          <DesktopSidebar />
        </aside>

        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

function DesktopSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto py-6">
        <nav className="grid items-start px-4 text-sm font-medium">
          <div className="mb-6">
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Principal</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-900 hover:bg-slate-100"
              >
                <LayoutDashboard className="h-5 w-5 text-[#0a2463]" />
                Panel
              </Link>
              <Link
                href="/dashboard/products"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Package className="h-5 w-5 text-slate-500" />
                Productos
              </Link>
              <Link
                href="/dashboard/transactions"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <CreditCard className="h-5 w-5 text-slate-500" />
                Transacciones
              </Link>
              <Link
                href="/dashboard/customers"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Users className="h-5 w-5 text-slate-500" />
                Clientes
              </Link>
              <Link
                href="/dashboard/staking"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Percent className="h-5 w-5 text-slate-500" />
                Staking
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pagos</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard/sms-payments"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <MessageSquare className="h-5 w-5 text-slate-500" />
                Pagos SMS
              </Link>
              <Link
                href="/dashboard/wallet"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Wallet className="h-5 w-5 text-slate-500" />
                Billetera
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">PDV</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard/pos"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <ShoppingCart className="h-5 w-5 text-slate-500" />
                Panel PDV
              </Link>
              <Link
                href="/dashboard/pos/inventory"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Package2 className="h-5 w-5 text-slate-500" />
                Inventario
              </Link>
              <Link
                href="/dashboard/pos/sales"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Receipt className="h-5 w-5 text-slate-500" />
                Ventas
              </Link>
              <Link
                href="/dashboard/pos/reports"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <BarChart3 className="h-5 w-5 text-slate-500" />
                Informes
              </Link>
            </div>
          </div>

          <div>
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cuenta</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Settings className="h-5 w-5 text-slate-500" />
                Configuración
              </Link>
              <Link
                href="/logout"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <LogOut className="h-5 w-5 text-slate-500" />
                Cerrar sesión
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a2463] text-white">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">John Doe</p>
            <p className="text-xs text-slate-500">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Image src="/images/logo.webp" alt="Kiipay Logo" width={100} height={32} priority />
        </Link>
        <Sheet.Close className="ml-auto">
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar</span>
        </Sheet.Close>
      </div>
      <div className="flex-1 overflow-auto py-6">
        <nav className="grid items-start px-4 text-sm font-medium">
          <div className="mb-6">
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Principal</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-900 hover:bg-slate-100"
              >
                <LayoutDashboard className="h-5 w-5 text-[#0a2463]" />
                Panel
              </Link>
              <Link
                href="/dashboard/products"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Package className="h-5 w-5 text-slate-500" />
                Productos
              </Link>
              <Link
                href="/dashboard/transactions"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <CreditCard className="h-5 w-5 text-slate-500" />
                Transacciones
              </Link>
              <Link
                href="/dashboard/customers"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Users className="h-5 w-5 text-slate-500" />
                Clientes
              </Link>
              <Link
                href="/dashboard/staking"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Percent className="h-5 w-5 text-slate-500" />
                Staking
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pagos</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard/sms-payments"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <MessageSquare className="h-5 w-5 text-slate-500" />
                Pagos SMS
              </Link>
              <Link
                href="/dashboard/wallet"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Wallet className="h-5 w-5 text-slate-500" />
                Billetera
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">PDV</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard/pos"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <ShoppingCart className="h-5 w-5 text-slate-500" />
                Panel PDV
              </Link>
              <Link
                href="/dashboard/pos/inventory"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Package2 className="h-5 w-5 text-slate-500" />
                Inventario
              </Link>
              <Link
                href="/dashboard/pos/sales"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Receipt className="h-5 w-5 text-slate-500" />
                Ventas
              </Link>
              <Link
                href="/dashboard/pos/reports"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <BarChart3 className="h-5 w-5 text-slate-500" />
                Informes
              </Link>
            </div>
          </div>

          <div>
            <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cuenta</h2>
            <div className="mt-3 space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Settings className="h-5 w-5 text-slate-500" />
                Configuración
              </Link>
              <Link
                href="/logout"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <LogOut className="h-5 w-5 text-slate-500" />
                Cerrar sesión
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a2463] text-white">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">John Doe</p>
            <p className="text-xs text-slate-500">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function User(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

