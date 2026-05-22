import React from 'react';
import { RiEditBoxLine, RiDeleteBin6Line } from 'react-icons/ri';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const { _id, title, priceAmount, priceCurrency, images, status = 'Active', category = 'Apparel', color = 'Midnight Black' } = product;
    
    const getImageUrl = (img) => {
        if (!img) return 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop';
        if (typeof img === 'string') return img;
        if (img.url) return img.url;
        if (img instanceof Blob || img instanceof File) {
            try {
                return URL.createObjectURL(img);
            } catch (e) {
                return 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop';
            }
        }
        return 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop';
    };

    const coverImage = images && images.length > 0 ? images[0] : null;

    return (
        <div className="group flex flex-col bg-white overflow-hidden transition-all duration-300">
            {/* Aspect Square Image Container (Stitch Design) */}
            <div className="relative aspect-square overflow-hidden bg-[#F5F5F5] mb-3">
                <img
                    src={getImageUrl(coverImage)}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Status Badge (Top Left - Stitch Design) */}
                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white ${
                        status === 'Active' ? 'bg-[#007D48]' : 
                        status === 'Draft' ? 'bg-[#9E9EA0]' : 'bg-[#D30005]'
                    }`}>
                        {status}
                    </span>
                </div>

                {/* Edit/Delete Overlay (Functional Addition) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(_id); }}
                            className="bg-white p-3 rounded-full shadow-lg hover:bg-[#111111] hover:text-white transition-all transform hover:scale-110"
                        >
                            <RiEditBoxLine className="text-lg" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(_id); }}
                            className="bg-white p-3 rounded-full shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                        >
                            <RiDeleteBin6Line className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Info (Flex Justify Between - Stitch Design) */}
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-['Inter',_sans-serif] text-[#111111] text-sm font-bold uppercase tracking-tight line-clamp-1 flex-1 pr-4">
                    {title}
                </h3>
                <p className="font-['Inter',_sans-serif] text-[#111111] text-sm font-bold whitespace-nowrap">
                    {priceCurrency} {priceAmount ? Number(priceAmount).toLocaleString() : '0'}
                </p>
            </div>
            
            {/* Category & Color Line (Stitch Design) */}
            <p className="font-['Inter',_sans-serif] text-gray-400 text-xs font-medium">
                {category} • {color}
            </p>
        </div>
    );
};

export default ProductCard;
