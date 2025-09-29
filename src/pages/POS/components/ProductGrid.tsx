import { Plus } from 'lucide-react';
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  lowStock: boolean;
  outOfStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Jack Daniel's Tennessee Whiskey 750ml",
    sku: 'SKU001',
    category: 'Whiskey',
    price: 45.99,
    stock: 24,
    image: '/products/jack-daniels.jpg',
    lowStock: false,
    outOfStock: false,
  },
  {
    id: 2,
    name: 'Grey Goose Vodka 750ml',
    sku: 'SKU002',
    category: 'Vodka',
    price: 59.99,
    stock: 8,
    image: '/products/grey-goose.jpg',
    lowStock: true,
    outOfStock: false,
  },
  {
    id: 3,
    name: 'Corona Extra 12-Pack',
    sku: 'SKU003',
    category: 'Beer',
    price: 18.99,
    stock: 0,
    image: '/products/corona.jpg',
    lowStock: false,
    outOfStock: true,
  },
  {
    id: 4,
    name: 'Patron Silver Tequila 750ml',
    sku: 'SKU004',
    category: 'Tequila',
    price: 52.99,
    stock: 15,
    image: '/products/patron.jpg',
    lowStock: false,
    outOfStock: false,
  },
];

interface ProductGridProps {
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const categories = ['All Products', 'Whiskey', 'Vodka', 'Beer', 'Tequila', 'Energy Drinks'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Category Filters */}
      <div className="flex items-center space-x-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
              <div className="text-gray-400 text-6xl">🥃</div>
              {product.outOfStock && (
                <div className="absolute top-2 right-2">
                  <span className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
              {product.lowStock && !product.outOfStock && (
                <div className="absolute top-2 right-2">
                  <span className="px-3 py-1 bg-orange-500 text-white rounded text-xs font-medium">
                    Low Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
              <p className="text-sm text-gray-500 mb-1">{product.sku}</p>
              <p className="text-xs text-gray-400 mb-3">{product.category}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                  <p className="text-xs text-orange-600 mt-1">
                    {product.stock} in stock
                  </p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                  21+
                </span>
              </div>

              <button
                disabled={product.outOfStock}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg font-medium transition-colors ${
                  product.outOfStock
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
