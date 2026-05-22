import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    RiAddLine, 
    RiSearchLine, 
    RiInboxLine, 
    RiRefreshLine, 
    RiErrorWarningLine,
    RiMenu2Fill,
    RiNotification3Line,
    RiEditBoxLine,
    RiDeleteBin6Line,
    RiMore2Fill,
    RiFilter2Line
} from 'react-icons/ri';
import { useProduct } from '../hook/useProduct';

/**
 * MyProducts.jsx - Seller Dashboard Product Listing
 * 
 * Design Summary (Stitch Extraction):
 * - Philosophy: "Violent Simplicity" / Editorial Aesthetic.
 * - Colors: Ink (#111111), Soft Cloud (#F5F5F5), Canvas (#FFFFFF), Hairline (#E5E5E5).
 * - Typography: 
 *   - Hero: Lexend (96px, 0.9 Leading, Uppercase)
 *   - UI: Inter (16px, 500 Weight)
 * - Components: 
 *   - Pill-shaped CTAs (Rounded-full, 48px height)
 *   - Square Product Cards (0px Radius, Zero Shadow)
 * - Layout: 1440px max-width, 48px Section Gaps.
 */

const MyProducts = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth || {});
    const { handleGetSellerProducts, handleDeleteProduct, clearProductError, sellerProducts, loading, error } = useProduct();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Products');

    useEffect(() => {
        clearProductError();
        handleGetSellerProducts();
    }, []);

    useEffect(() => {
        // Only redirect if there's an actual error or an invalid role
        if (error) {
            navigate('/sync-error', { state: { error } });
        } else if (user && user.role !== 'seller') {
            navigate('/sync-error', { state: { error: 'Forbidden' } });
        }
    }, [error, user, navigate]);

    const onDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await handleDeleteProduct(id);
        }
    };

    const onEdit = (id) => {
        navigate(`/seller/product/edit/${id}`);
    };

    const filters = ['All Products', 'Active', 'Out of Stock', 'Drafts'];

    const getImageUrl = (images) => {
        if (!images || images.length === 0) return 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop';
        const img = images[0];
        if (typeof img === 'string') return img;
        if (img.url) return img.url;
        return 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop';
    };

    const filteredProducts = sellerProducts?.filter(product => {
        const title = product.title || product.name || '';
        const category = product.category || '';
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             category.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeFilter === 'All Products') return matchesSearch;
        if (activeFilter === 'Active') return matchesSearch && (product.status === 'Active' || product.stock > 0);
        if (activeFilter === 'Out of Stock') return matchesSearch && product.stock === 0;
        if (activeFilter === 'Drafts') return matchesSearch && product.status === 'Draft';
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white text-[#111111] font-['Inter',_sans-serif] selection:bg-[#111111] selection:text-white">
            {/* --- App Bar (Fixed) --- */}
            <header className="fixed top-0 left-0 right-0 h-[64px] bg-white z-[100] border-b border-[#E5E5E5] flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 md:gap-4">
                    <button className="p-2 -ml-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90">
                        <RiMenu2Fill className="text-[20px]" />
                    </button>
                </div>
                <div 
                    onClick={() => navigate('/')}
                    className="absolute left-1/2 -translate-x-1/2 font-['Lexend',_sans-serif] text-[20px] md:text-[28px] font-bold tracking-[-0.04em] cursor-pointer"
                >
                    SNITCH
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                    <button className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90">
                        <RiNotification3Line className="text-[20px]" />
                    </button>
                    <div className="w-[30px] h-[30px] md:w-[32px] md:h-[32px] bg-[#111111] text-white rounded-full flex items-center justify-center text-[10px] md:text-[12px] font-bold">
                        S
                    </div>
                </div>
            </header>

            <main className="pt-[64px] max-w-[1440px] mx-auto">
                {/* --- Hero Section --- */}
                <section className="px-6 pt-10 md:pt-16 pb-6 md:pb-8">
                    <h1 className="font-['Lexend',_sans-serif] text-[48px] sm:text-[64px] md:text-[96px] leading-[0.9] font-medium tracking-[-0.03em] uppercase">
                        MY<br />PRODUCTS
                    </h1>
                    <p className="text-[11px] md:text-[14px] text-[#707072] mt-3 md:mt-4 uppercase tracking-[0.1em] font-medium">
                        Total {sellerProducts?.length || 0} Items in Catalog
                    </p>
                </section>

                {/* --- Sticky Controls Strip --- */}
                <section className="sticky top-[64px] bg-white/90 backdrop-blur-md z-[90] border-b border-[#E5E5E5] px-4 md:px-6 py-3 md:py-4">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
                        {/* Search Pill */}
                        <div className="relative flex-grow w-full md:w-auto">
                            <RiSearchLine className="absolute left-5 top-1/2 -translate-y-1/2 text-[#707072] text-[18px] md:text-[20px]" />
                            <input 
                                type="text"
                                placeholder="Search inventory..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#F5F5F5] h-[44px] md:h-[48px] rounded-[24px] pl-[52px] pr-6 text-[14px] md:text-[15px] outline-none focus:ring-2 focus:ring-[#111111]/10 transition-all font-medium placeholder:text-[#9E9EA0]"
                            />
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <button 
                                onClick={() => navigate('/seller/product/create')}
                                className="flex-grow md:flex-none h-[44px] md:h-[48px] bg-[#111111] text-white px-6 md:px-8 rounded-full flex items-center justify-center gap-2 text-[12px] md:text-[13px] font-bold tracking-[0.05em] uppercase hover:opacity-90 active:scale-[0.98] transition-all"
                            >
                                <RiAddLine className="text-[18px]" />
                                <span className="hidden sm:inline">ADD NEW PRODUCT</span>
                                <span className="inline sm:hidden">ADD NEW</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Filter Chips --- */}
                <section className="px-4 md:px-6 py-4 md:py-6 overflow-x-auto no-scrollbar flex items-center gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`whitespace-nowrap px-5 md:px-6 h-[36px] md:h-[40px] rounded-full text-[11px] md:text-[13px] font-bold uppercase tracking-wider transition-all border ${
                                activeFilter === filter
                                    ? 'bg-[#111111] text-white border-[#111111]'
                                    : 'bg-white text-[#111111] border-[#E5E5E5] hover:border-[#111111]'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                    <div className="ml-auto hidden md:flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-[#111111] cursor-pointer hover:opacity-70 transition-opacity">
                        <RiFilter2Line className="text-[18px]" />
                        Sort By
                    </div>
                </section>

                {/* --- Content Area --- */}
                <section className="px-4 md:px-6 pb-24">
                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-y-12 gap-x-4 md:gap-x-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-square bg-[#F5F5F5] mb-3 md:mb-4" />
                                    <div className="h-3 md:h-4 bg-[#F5F5F5] w-3/4 mb-2" />
                                    <div className="h-3 md:h-4 bg-[#F5F5F5] w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="py-24 md:py-32 flex flex-col items-center text-center">
                            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#F5F5F5] rounded-full flex items-center justify-center mb-8">
                                <RiErrorWarningLine className="text-[32px] md:text-[40px] text-[#111111]" />
                            </div>
                            <h2 className="font-['Lexend',_sans-serif] text-[32px] md:text-[40px] font-medium leading-none tracking-[-0.03em] uppercase mb-4">
                                Sync Error
                            </h2>
                            <p className="text-[#707072] text-[13px] md:text-[14px] max-w-[320px] mb-10 uppercase tracking-widest font-bold">
                                {error === 'Forbidden' ? 'Your session has expired or you are not authorized.' : error}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                {error === 'Forbidden' ? (
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="h-[52px] bg-[#111111] text-white px-10 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-all active:scale-[0.98]"
                                    >
                                        Sign In to Snitch
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleGetSellerProducts()}
                                        className="h-[52px] bg-[#111111] text-white px-10 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-all active:scale-[0.98]"
                                    >
                                        <RiRefreshLine className="inline mr-2 text-[18px]" />
                                        Retry Connection
                                    </button>
                                )}
                                <button 
                                    onClick={() => navigate('/')}
                                    className="h-[52px] border-2 border-[#111111] px-10 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#F5F5F5] transition-all active:scale-[0.98]"
                                >
                                    Go Home
                                </button>
                            </div>
                        </div>
                    ) : filteredProducts?.length === 0 ? (
                        <div className="py-24 md:py-32 flex flex-col items-center text-center">
                            <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
                                <RiInboxLine className="text-[28px] md:text-[32px] text-[#9E9EA0]" />
                            </div>
                            <h2 className="text-[20px] md:text-[24px] font-bold uppercase tracking-tight mb-2">No Products Found</h2>
                            <p className="text-[#707072] text-[13px] max-w-[280px] md:max-w-[320px] mb-8">Start your journey by adding your first product.</p>
                            <button 
                                onClick={() => navigate('/seller/product/create')}
                                className="h-[44px] md:h-[48px] bg-[#111111] text-white px-8 md:px-10 rounded-full text-[12px] md:text-[13px] font-bold uppercase hover:opacity-90 transition-all"
                            >
                                List First Product
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-y-12 gap-x-4 md:gap-x-6">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="group relative">
                                    {/* Product Image Stage */}
                                    <div className="aspect-square bg-[#F5F5F5] overflow-hidden relative cursor-pointer" onClick={() => onEdit(product._id)}>
                                        <img 
                                            src={getImageUrl(product.images)} 
                                            alt={product.title}
                                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                        {/* Status Badge */}
                                        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider border border-[#E5E5E5]">
                                            {product.stock > 0 || product.status === 'Active' ? 'Active' : 'Out of Stock'}
                                        </div>
                                        
                                        {/* Hover Actions (Visible on touch for mobile if needed, or just stay hidden) */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 md:gap-3">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onEdit(product._id); }}
                                                className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] bg-white rounded-full flex items-center justify-center hover:bg-[#111111] hover:text-white transition-all shadow-sm active:scale-90"
                                            >
                                                <RiEditBoxLine className="text-[18px] md:text-[20px]" />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onDelete(product._id); }}
                                                className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] bg-white rounded-full flex items-center justify-center hover:bg-[#D30005] hover:text-white transition-all shadow-sm active:scale-90"
                                            >
                                                <RiDeleteBin6Line className="text-[18px] md:text-[20px]" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Metadata */}
                                    <div className="mt-3 md:mt-4 flex justify-between items-start">
                                        <div className="cursor-pointer flex-1 min-w-0" onClick={() => onEdit(product._id)}>
                                            <h3 className="text-[13px] md:text-[15px] font-bold leading-tight group-hover:underline truncate uppercase">
                                                {product.title || product.name || 'Untitled Product'}
                                            </h3>
                                            <p className="text-[11px] md:text-[13px] text-[#707072] mt-1 truncate">{product.category || 'Apparel'}</p>
                                            <div className="mt-1 md:mt-2 flex items-center gap-2 md:gap-3">
                                                <span className="text-[13px] md:text-[15px] font-bold">
                                                    {product.priceCurrency === 'USD' ? '$' : 
                                                     product.priceCurrency === 'EUR' ? '€' : 
                                                     product.priceCurrency === 'GBP' ? '£' : '₹'}
                                                    {(() => {
                                                        const val = product.priceAmount ?? product.price?.amount ?? product.price;
                                                        if (val === undefined || val === null) return '0';
                                                        const num = Number(String(val).replace(/[^0-9.-]/g, ''));
                                                        return isNaN(num) ? '0' : num.toLocaleString();
                                                    })()}
                                                </span>
                                                {product.stock !== undefined && (
                                                    <span className="text-[10px] md:text-[12px] font-medium text-[#9E9EA0]">Stock: {product.stock}</span>
                                                )}
                                            </div>
                                        </div>
                                        <button className="p-1 hover:bg-[#F5F5F5] rounded-full transition-colors ml-1">
                                            <RiMore2Fill className="text-[#9E9EA0] text-[16px] md:text-[18px]" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* --- Footer (Nike Style) --- */}
            <footer className="bg-white border-t border-[#E5E5E5] px-6 py-10 md:py-12">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <div>
                        <h4 className="text-[12px] md:text-[13px] font-bold uppercase mb-4 md:mb-6">Resources</h4>
                        <ul className="space-y-3 md:space-y-4">
                            <li><a href="#" className="text-[11px] md:text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">Seller Guide</a></li>
                            <li><a href="#" className="text-[11px] md:text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">Shipping Policy</a></li>
                            <li><a href="#" className="text-[11px] md:text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">Payment Terms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[12px] md:text-[13px] font-bold uppercase mb-4 md:mb-6">Support</h4>
                        <ul className="space-y-3 md:space-y-4">
                            <li><a href="#" className="text-[11px] md:text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">Help Center</a></li>
                            <li><a href="#" className="text-[11px] md:text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="hidden md:block">
                        <h4 className="text-[13px] font-bold uppercase mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">About Snitch</a></li>
                            <li><a href="#" className="text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">Careers</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                        <div className="font-['Lexend',_sans-serif] text-[20px] md:text-[24px] font-bold tracking-tighter mb-4">SNITCH</div>
                        <p className="text-[10px] md:text-[11px] text-[#9E9EA0] md:text-right uppercase tracking-widest">© 2026 SNITCH Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MyProducts;
