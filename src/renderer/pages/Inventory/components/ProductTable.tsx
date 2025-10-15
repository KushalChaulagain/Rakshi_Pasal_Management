import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import React, { useState } from 'react';
import { Product } from '../../../../shared/types';
import { ProductActions } from './ProductActions';
import { StatusBadge } from './StatusBadge';

interface ProductTableProps {
  products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getStockStatus = (
    product: Product
  ): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (product.stock === 0) return 'out-of-stock';
    if (product.stock <= product.minStock) return 'low-stock';
    return 'in-stock';
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const handleStockSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              Product
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              SKU
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              Category
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              Price
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              <button
                onClick={handleStockSort}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
              >
                Stock
                {sortDirection === 'desc' ? (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                )}
              </button>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              Status
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">
              Supplier
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900"></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr
              key={product.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              {/* Product Column */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.barcode}
                    </div>
                  </div>
                </div>
              </td>

              {/* SKU Column */}
              <td className="py-4 px-4 text-gray-700">{product.sku}</td>

              {/* Category Column */}
              <td className="py-4 px-4 text-gray-700">{product.category}</td>

              {/* Price Column */}
              <td className="py-4 px-4 text-gray-700 font-medium">
                {formatPrice(product.price)}
              </td>

              {/* Stock Column */}
              <td className="py-4 px-4 text-gray-700">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{product.stock}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-500 text-sm">
                    {product.minStock} min
                  </span>
                </div>
              </td>

              {/* Status Column */}
              <td className="py-4 px-4">
                <StatusBadge status={getStockStatus(product)} />
              </td>

              {/* Supplier Column */}
              <td className="py-4 px-4 text-gray-700">{product.supplier}</td>

              {/* Actions Column */}
              <td className="py-4 px-4">
                <ProductActions
                  productId={product.id}
                  onEdit={id => console.log('Edit product:', id)}
                  onView={id => console.log('View product:', id)}
                  onDelete={id => console.log('Delete product:', id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
