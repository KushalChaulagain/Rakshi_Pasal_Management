import { AlertTriangle, Plus } from 'lucide-react';
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
  isAlcoholic: boolean;
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
    isAlcoholic: true,
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
    isAlcoholic: true,
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
    isAlcoholic: true,
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
    isAlcoholic: true,
  },
  {
    id: 5,
    name: 'Red Bull Energy Drink 4-Pack',
    sku: 'SKU006',
    category: 'Energy Drinks',
    price: 12.99,
    stock: 50,
    image: '/products/red-bull.jpg',
    lowStock: false,
    outOfStock: false,
    isAlcoholic: false,
  },
];

interface ProductGridProps {
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const categories = [
    'All Products',
    'Whiskey',
    'Vodka',
    'Beer',
    'Tequila',
    'Energy Drinks',
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Products' ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Category Filters */}
      <div className="flex items-center space-x-3 mb-6">
        {categories.map(category => (
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
      <div className="grid grid-cols-2 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {product.category === 'Whiskey' && (
                  <div className="text-2xl">🥃</div>
                )}
                {product.category === 'Vodka' && (
                  <div className="w-12 h-12 bg-gray-600 rounded"></div>
                )}
                {product.category === 'Beer' && (
                  <div className="text-2xl">🍺</div>
                )}
                {product.category === 'Tequila' && (
                  <div className="text-2xl">🍸</div>
                )}
                {product.category === 'Energy Drinks' && (
                  <div className="text-2xl font-bold text-red-500">R</div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                <p className="text-xs text-gray-400 mb-2">{product.category}</p>

                {/* 21+ Label for alcoholic beverages */}
                {product.isAlcoholic && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium mb-2">
                    21+
                  </span>
                )}
              </div>

              {/* Price and Stock */}
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-gray-900 mb-1">
                  ${product.price.toFixed(2)}
                </p>

                {/* Stock Status */}
                <div className="flex items-center justify-end space-x-1 mb-3">
                  <AlertTriangle
                    className={`w-3 h-3 ${
                      product.outOfStock
                        ? 'text-red-500'
                        : product.lowStock
                          ? 'text-orange-500'
                          : 'text-green-500'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      product.outOfStock
                        ? 'text-red-500'
                        : product.lowStock
                          ? 'text-orange-500'
                          : 'text-green-500'
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </div>

                {/* Status Labels */}
                {product.outOfStock && (
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                {product.lowStock && !product.outOfStock && (
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                      Low Stock
                    </span>
                  </div>
                )}

                {/* Add Button */}
                {!product.outOfStock && (
                  <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-800 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors">
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
