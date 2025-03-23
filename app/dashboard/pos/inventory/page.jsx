"use client"

import { useState } from "react"
import {
  AlertCircle,
  ArrowUpDown,
  Download,
  Edit,
  FileText,
  Filter,
  MoreHorizontal,
  Package2,
  Plus,
  Search,
  Tag,
  Trash,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo para el inventario
const initialInventory = [
  {
    id: "PROD-001",
    name: "Camiseta Premium",
    category: "Ropa",
    price: 29.99,
    cost: 12.5,
    stock: 45,
    sku: "RP-TS-001",
    status: "active",
    lastUpdated: "12/05/2023",
  },
  {
    id: "PROD-002",
    name: "Auriculares Bluetooth",
    category: "Electrónica",
    price: 89.99,
    cost: 45.0,
    stock: 18,
    sku: "EL-HP-002",
    status: "active",
    lastUpdated: "10/05/2023",
  },
  {
    id: "PROD-003",
    name: "Taza Personalizada",
    category: "Hogar",
    price: 14.99,
    cost: 5.25,
    stock: 32,
    sku: "HG-MG-003",
    status: "active",
    lastUpdated: "08/05/2023",
  },
  {
    id: "PROD-004",
    name: "Libro - El Arte de la Guerra",
    category: "Libros",
    price: 24.99,
    cost: 10.0,
    stock: 15,
    sku: "BK-AW-004",
    status: "active",
    lastUpdated: "05/05/2023",
  },
  {
    id: "PROD-005",
    name: "Reloj Inteligente",
    category: "Electrónica",
    price: 129.99,
    cost: 65.0,
    stock: 8,
    sku: "EL-SW-005",
    status: "low_stock",
    lastUpdated: "03/05/2023",
  },
  {
    id: "PROD-006",
    name: "Zapatillas Deportivas",
    category: "Calzado",
    price: 79.99,
    cost: 35.0,
    stock: 22,
    sku: "SH-SP-006",
    status: "active",
    lastUpdated: "01/05/2023",
  },
  {
    id: "PROD-007",
    name: "Bolso de Cuero",
    category: "Accesorios",
    price: 149.99,
    cost: 70.0,
    stock: 5,
    sku: "AC-LB-007",
    status: "low_stock",
    lastUpdated: "28/04/2023",
  },
  {
    id: "PROD-008",
    name: "Cargador Inalámbrico",
    category: "Electrónica",
    price: 34.99,
    cost: 15.0,
    stock: 0,
    sku: "EL-WC-008",
    status: "out_of_stock",
    lastUpdated: "25/04/2023",
  },
]

// Categorías disponibles
const categories = ["Todas", "Ropa", "Electrónica", "Hogar", "Libros", "Calzado", "Accesorios"]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Todas")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Filtrar y ordenar inventario
  const filteredInventory = inventory
    .filter((item) => {
      // Filtro de búsqueda
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtro de categoría
      const matchesCategory = categoryFilter === "Todas" || item.category === categoryFilter

      // Filtro de estado
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "in_stock" && item.stock > 0) ||
        (statusFilter === "low_stock" && item.status === "low_stock") ||
        (statusFilter === "out_of_stock" && item.stock === 0)

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      // Ordenamiento
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price
      } else if (sortField === "stock") {
        return sortDirection === "asc" ? a.stock - b.stock : b.stock - a.stock
      }
      return 0
    })

  // Función para cambiar el ordenamiento
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Estadísticas de inventario
  const totalProducts = inventory.length
  const totalValue = inventory.reduce((sum, item) => sum + item.price * item.stock, 0)
  const lowStockItems = inventory.filter((item) => item.status === "low_stock").length
  const outOfStockItems = inventory.filter((item) => item.stock === 0).length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Inventario</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Importar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importar Inventario</DialogTitle>
                <DialogDescription>
                  Sube un archivo CSV o Excel con tu inventario para importarlo al sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-medium mb-1">Arrastra y suelta tu archivo aquí</p>
                  <p className="text-xs text-slate-500 mb-4">Soporta archivos CSV, XLS y XLSX</p>
                  <Button variant="outline" size="sm">
                    Seleccionar Archivo
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  <p className="font-medium mb-1">El archivo debe contener las siguientes columnas:</p>
                  <p>Nombre, Categoría, Precio, Costo, Stock, SKU</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Importar Inventario</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="bg-[#0a2463] hover:bg-[#0a2463]/90">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Producto
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">En {categories.length - 1} categorías</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Basado en precios de venta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Productos por reponer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sin Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Productos agotados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Inventario</CardTitle>
          <CardDescription>Administra todos los productos disponibles en tu tienda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos por nombre, SKU o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="in_stock">En Stock</SelectItem>
                  <SelectItem value="low_stock">Stock Bajo</SelectItem>
                  <SelectItem value="out_of_stock">Sin Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Producto
                      {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                    <div className="flex items-center">
                      Precio
                      {sortField === "price" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("stock")}>
                    <div className="flex items-center">
                      Stock
                      {sortField === "stock" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </div>
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            product.stock === 0
                              ? "text-red-600 font-medium"
                              : product.stock < 10
                                ? "text-amber-600 font-medium"
                                : ""
                          }
                        >
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            product.stock === 0
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : product.status === "low_stock"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                          }`}
                        >
                          {product.stock === 0 ? "Sin Stock" : product.status === "low_stock" ? "Stock Bajo" : "Activo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Añadir Stock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      No se encontraron productos. Intenta con una búsqueda diferente.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

