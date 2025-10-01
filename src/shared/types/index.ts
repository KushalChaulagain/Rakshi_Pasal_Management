/**
 * Shared TypeScript types between main and renderer processes
 */

// Product types
export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  maxStock: number;
  supplier: string;
  image?: string;
  description?: string;
  requiresAgeVerification: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction types
export interface Transaction {
  id: string;
  customerName: string;
  customerId?: string;
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'check';
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Customer types
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: Address;
  isAgeVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Supplier types
export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  paymentTerms: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Stock Alert types
export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  supplier: string;
  lastRestockDate: Date;
  daysUntilOut: number;
  isOutOfStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Low Stock Alert Summary types
export interface AlertSummary {
  critical: number;
  highPriority: number;
  outOfStock: number;
  resolvedToday: number;
}

// Alert Filter types
export interface AlertFilters {
  search: string;
  priority: 'all' | 'critical' | 'high' | 'medium' | 'low';
  category: 'all' | string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// IPC Message types
export interface IpcMessage<T = unknown> {
  type: string;
  payload: T;
  id?: string;
}

// Window management types
export interface WindowConfig {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  title: string;
  resizable: boolean;
  maximizable: boolean;
  minimizable: boolean;
  closable: boolean;
}

export default {};
