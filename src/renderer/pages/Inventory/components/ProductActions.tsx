import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ProductActionsProps {
  productId: string;
  onEdit?: (productId: string) => void;
  onView?: (productId: string) => void;
  onDelete?: (productId: string) => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  onEdit,
  onView,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            onClick={() => handleAction(() => onView?.(productId))}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={() => handleAction(() => onEdit?.(productId))}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Product
          </button>
          <hr className="my-1" />
          <button
            onClick={() => handleAction(() => onDelete?.(productId))}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};
