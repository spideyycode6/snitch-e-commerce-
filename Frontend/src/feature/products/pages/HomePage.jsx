import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';

import {
    RiSearchLine,
    RiHeart3Line,
    RiHeart3Fill,
    RiShoppingBag3Line,
    RiHome5Fill,
    RiHome5Line,
    RiGridLine,
    RiUser3Line,
    RiFireLine,
    RiStarFill,
    RiArrowRightSLine,
    RiArrowRightLine,
    RiTruckLine,
    RiRefreshLine,
    RiShieldCheckLine,
    RiAwardLine,
} from 'react-icons/ri';

/**
 * HomePage.jsx — Buyer-Facing Home Page
 *
 * Design System: Snitch Editorial — "Violent Simplicity"
 * Colors: Ink (#111111), Cloud (#F5F5F5), Canvas (#FFFFFF),
 *         Hairline (#E5E5E5), Muted (#707072), Sale (#D30005)
 * Typography: Lexend (Hero), Inter (UI)
 * Components: Pill CTAs, Square Cards, Editorial Layout
 */

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

const banners = [
    {
        tag: 'NEW DROP',
        title: 'SUMMER\nESSENTIALS',
        subtitle: 'Up to 40% off on season\'s best',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    },
    {
        tag: 'TRENDING',
        title: 'STREET\nREADY',
        subtitle: 'Oversized fits for every mood',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    },
    {
        tag: 'FLASH SALE',
        title: 'UNDER\n₹999',
        subtitle: 'Limited time deals, shop now',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop',
    },
];

const categories = ['All', 'Men', 'Women', 'Oversized', 'Bottoms', 'Accessories'];

const products = [
    { id: 1, name: 'Acid Wash Oversized Tee', price: 849, mrp: 1499, discount: 43, rating: 4.5, reviews: 2341, badge: 'Bestseller', category: 'Tees' },
    { id: 2, name: 'Cargo Jogger Pants', price: 1199, mrp: 2199, discount: 45, rating: 4.3, reviews: 1872, badge: 'New', category: 'Bottoms' },
    { id: 3, name: 'Graphic Print Hoodie', price: 1599, mrp: 2799, discount: 42, rating: 4.7, reviews: 3120, badge: 'Hot', category: 'Hoodies' },
    { id: 4, name: 'Relaxed Fit Shorts', price: 699, mrp: 1299, discount: 46, rating: 4.2, reviews: 987, badge: null, category: 'Shorts' },
];

const flashSaleItems = [
    { id: 5, name: 'Tie-Dye Crop Top', price: 499, mrp: 999, discount: 50 },
    { id: 6, name: 'Denim Jacket', price: 1299, mrp: 2599, discount: 50 },
    { id: 7, name: 'Printed Co-ord Set', price: 1099, mrp: 2199, discount: 50 },
    { id: 8, name: 'Cargo Shorts', price: 599, mrp: 1199, discount: 50 },
];

const IMG_PLACEHOLDER = 'https://placehold.co/600x800/F5F5F5/111111?text=SNITCH';

// Helper to extract image URL from API product
const getImageUrl = (images) => {
    if (!images || images.length === 0) return IMG_PLACEHOLDER;
    const img = images[0];
    if (typeof img === 'string') return img;
    if (img.url) return img.url;
    return IMG_PLACEHOLDER;
};

// Helper to safely extract numeric price from various API shapes
const extractPrice = (p) => {
    if (!p) return 0;
    const cand = p.priceAmount ?? p.price ?? p.amount ?? null;
    if (cand == null) return 0;
    if (typeof cand === 'number') return cand;
    if (typeof cand === 'string') {
        const n = Number(cand.replace(/[^0-9.-]/g, ''))
        return Number.isFinite(n) ? n : 0
    }
    if (typeof cand === 'object') {
        const n = cand.amount ?? cand.value ?? null
        if (typeof n === 'number') return n
        if (typeof n === 'string') {
            const v = Number(n.replace(/[^0-9.-]/g, ''))
            return Number.isFinite(v) ? v : 0
        }
    }
    return 0
}

// Helper to normalize API product to card format
const normalizeProduct = (p) => {
    const price = extractPrice(p)
    const mrp = extractPrice({ price: p.mrpAmount ?? p.mrp }) || Math.round(price * 1.5)
    const discount = p.discount ?? (mrp ? Math.round((1 - (price / mrp)) * 100) : 0)
    return ({
        id: p._id || p.id,
        name: p.title || p.name || 'Untitled',
        price,
        mrp,
        discount,
        rating: p.rating ?? 4.5,
        reviews: p.reviews ?? 0,
        badge: p.badge ?? null,
        category: p.category || 'Apparel',
        image: getImageUrl(p.images),
        currency: p.priceCurrency === 'USD' ? '$' : p.priceCurrency === 'EUR' ? '€' : p.priceCurrency === 'GBP' ? '£' : '₹',
    })
}

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <header className="fixed top-0 left-0 right-0 h-[64px] bg-white z-[100] border-b border-[#E5E5E5] flex items-center justify-between px-4 md:px-6">
            <div
                onClick={() => navigate('/')}
                className="font-['Lexend',_sans-serif] text-[20px] md:text-[28px] font-bold tracking-[-0.04em] cursor-pointer"
            >
                SNITCH
            </div>
            <div className="flex items-center gap-1 md:gap-2">
                <button className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90">
                    <RiSearchLine className="text-[20px]" />
                </button>
                <button className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90">
                    <RiHeart3Line className="text-[20px]" />
                </button>
                <button className="relative p-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90">
                    <RiShoppingBag3Line className="text-[20px]" />
                    <span className="absolute top-0.5 right-0.5 bg-[#111111] text-white text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center">
                        2
                    </span>
                </button>
            </div>
        </header>
    );
};

const HeroBanner = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const banner = banners[active];

    return (
        <section className="px-4 md:px-6 pt-4">
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] bg-[#111111] overflow-hidden">
                <img
                    src={banner.image}
                    alt={banner.tag}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                    <span className="inline-block w-fit bg-white/20 backdrop-blur-sm text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-3 md:mb-4">
                        {banner.tag}
                    </span>
                    <h2 className="font-['Lexend',_sans-serif] text-[40px] sm:text-[56px] md:text-[80px] leading-[0.9] font-medium tracking-[-0.03em] text-white whitespace-pre-line">
                        {banner.title}
                    </h2>
                    <p className="text-[12px] md:text-[14px] text-white/60 mt-2 md:mt-3 uppercase tracking-[0.05em] font-medium">
                        {banner.subtitle}
                    </p>
                    <button className="mt-4 md:mt-6 w-fit h-[40px] md:h-[48px] bg-white text-[#111111] px-6 md:px-8 rounded-full text-[11px] md:text-[13px] font-bold uppercase tracking-[0.1em] hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
                        Shop Now
                        <RiArrowRightLine className="text-[16px]" />
                    </button>
                </div>
                {/* Dot indicators */}
                <div className="absolute bottom-4 md:bottom-6 right-6 md:right-12 flex items-center gap-1.5">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`rounded-full transition-all duration-300 ${i === active
                                    ? 'bg-white w-5 h-1.5'
                                    : 'bg-white/30 w-1.5 h-1.5 hover:bg-white/60'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const CategoryTabs = () => {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <section className="px-4 md:px-6 pt-8 md:pt-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9E9EA0] mb-3">
                Shop By
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`whitespace-nowrap px-5 md:px-6 h-[36px] md:h-[40px] rounded-full text-[11px] md:text-[13px] font-bold uppercase tracking-wider transition-all border ${activeTab === cat
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-white text-[#111111] border-[#E5E5E5] hover:border-[#111111]'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </section>
    );
};

const SectionHeader = ({ title, actionLabel = 'See All' }) => (
    <div className="flex items-center justify-between px-4 md:px-6 pt-10 md:pt-14 pb-4 md:pb-6">
        <h3 className="font-['Lexend',_sans-serif] text-[20px] md:text-[28px] font-medium tracking-[-0.03em] uppercase">
            {title}
        </h3>
        <button className="flex items-center gap-0.5 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.05em] text-[#707072] hover:text-[#111111] transition-colors">
            {actionLabel}
            <RiArrowRightSLine className="text-[16px] md:text-[18px]" />
        </button>
    </div>
);

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [wishlisted, setWishlisted] = useState(false);

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        return (
            <div className="flex items-center gap-px">
                {[...Array(5)].map((_, i) => (
                    <RiStarFill
                        key={i}
                        className={`text-[10px] md:text-[12px] ${i < full ? 'text-[#111111]' : 'text-[#E5E5E5]'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="group relative">
            {/* Image */}
            <div onClick={() => {navigate(`/products/${product.id}`)}}
            className="aspect-[3/4] bg-[#F5F5F5] overflow-hidden relative cursor-pointer">
                <img
                    src={product.image || IMG_PLACEHOLDER}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white px-2.5 md:px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider border border-[#E5E5E5]">
                        {product.badge}
                    </div>
                )}
                {/* Wishlist */}
                <button
                    onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
                    className="absolute top-2 right-2 md:top-3 md:right-3 w-[32px] h-[32px] md:w-[36px] md:h-[36px] bg-white rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-all active:scale-90 shadow-sm"
                >
                    {wishlisted
                        ? <RiHeart3Fill className="text-[16px] md:text-[18px] text-[#D30005]" />
                        : <RiHeart3Line className="text-[16px] md:text-[18px] text-[#111111]" />
                    }
                </button>
            </div>

            {/* Metadata */}
            <div className="mt-3 md:mt-4">
                <h4 className="text-[13px] md:text-[15px] font-bold leading-tight uppercase truncate">
                    {product.name}
                </h4>
                <p className="text-[11px] md:text-[12px] text-[#707072] mt-0.5 uppercase tracking-wide">
                    {product.category}
                </p>

                {/* Rating */}
                {product.rating > 0 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                        {renderStars(product.rating)}
                        {product.reviews > 0 && (
                            <span className="text-[10px] md:text-[11px] text-[#9E9EA0] font-medium">
                                ({product.reviews.toLocaleString()})
                            </span>
                        )}
                    </div>
                )}

                {/* Price Row */}
                <div className="flex items-center gap-2 mt-1.5 md:mt-2">
                    <span className="text-[15px] md:text-[17px] font-bold">{product.currency || '₹'}{Number(product.price).toLocaleString()}</span>
                    {product.mrp > product.price && (
                        <>
                            <span className="text-[11px] md:text-[13px] text-[#9E9EA0] line-through">{product.currency || '₹'}{Number(product.mrp).toLocaleString()}</span>
                            <span className="text-[10px] md:text-[11px] font-bold text-[#D30005] uppercase">
                                {product.discount}% off
                            </span>
                        </>
                    )}
                </div>

                {/* Add to Bag */}
                <button className="w-full mt-3 h-[38px] md:h-[42px] bg-[#111111] text-white rounded-full text-[11px] md:text-[12px] font-bold uppercase tracking-[0.1em] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <RiShoppingBag3Line className="text-[14px] md:text-[16px]" />
                    Add to Bag
                </button>
            </div>
        </div>
    );
};

const ProductGrid = ({ items, loading: isLoading }) => (
    <>
        <SectionHeader title="Trending Now" />
        {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 px-4 md:px-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-[3/4] bg-[#F5F5F5] mb-3 md:mb-4" />
                        <div className="h-3 md:h-4 bg-[#F5F5F5] w-3/4 mb-2" />
                        <div className="h-3 md:h-4 bg-[#F5F5F5] w-1/2" />
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 px-4 md:px-6">
                {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
    </>
);

const FlashSale = () => {
    const [time, setTime] = useState({ h: 2, m: 14, s: 37 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                let { h, m, s } = prev;
                if (s > 0) { s--; }
                else if (m > 0) { m--; s = 59; }
                else if (h > 0) { h--; m = 59; s = 59; }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <section className="px-4 md:px-6 pt-10 md:pt-14">
            <div className="bg-[#111111] p-5 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 md:mb-6">
                    <div className="flex items-center gap-2">
                        <RiFireLine className="text-[20px] md:text-[24px] text-white" />
                        <h3 className="font-['Lexend',_sans-serif] text-[18px] md:text-[24px] font-medium tracking-[-0.02em] text-white uppercase">
                            Flash Sale
                        </h3>
                    </div>
                    <div className="bg-white text-[#111111] text-[11px] md:text-[13px] font-bold font-mono px-3 md:px-4 py-1.5 md:py-2 rounded-full tracking-wider">
                        {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
                    </div>
                </div>

                {/* Scrollable Cards */}
                <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
                    {flashSaleItems.map((item) => (
                        <div key={item.id} className="w-[140px] md:w-[180px] flex-shrink-0">
                            <div className="aspect-[3/4] bg-[#F5F5F5] overflow-hidden relative">
                                <img
                                    src={IMG_PLACEHOLDER}
                                    alt={item.name}
                                    className="w-full h-full object-cover mix-blend-multiply"
                                />
                                <div className="absolute top-2 left-2 bg-[#D30005] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                                    {item.discount}% off
                                </div>
                            </div>
                            <h4 className="text-[11px] md:text-[13px] text-white font-bold mt-2 md:mt-3 uppercase truncate leading-tight">
                                {item.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[13px] md:text-[15px] font-bold text-white">₹{item.price}</span>
                                <span className="text-[10px] md:text-[11px] text-white/40 line-through">₹{item.mrp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BrandStrip = () => (
    <section className="px-4 md:px-6 pt-10 md:pt-14 pb-6 md:pb-8">
        <div className="bg-[#F5F5F5] p-6 md:p-10 flex flex-col items-center text-center">
            <RiAwardLine className="text-[28px] md:text-[36px] text-[#111111]" />
            <h3 className="font-['Lexend',_sans-serif] text-[16px] md:text-[20px] font-medium tracking-[-0.02em] uppercase mt-2">
                100% Original Products
            </h3>
            <p className="text-[11px] md:text-[13px] text-[#707072] mt-1 uppercase tracking-[0.05em]">
                Directly from brand, delivered to your door
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6">
                {[
                    { icon: <RiTruckLine className="text-[14px]" />, label: 'Free Shipping' },
                    { icon: <RiRefreshLine className="text-[14px]" />, label: 'Easy Returns' },
                    { icon: <RiShieldCheckLine className="text-[14px]" />, label: 'Secure Pay' },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-1.5 bg-white px-3 md:px-4 py-2 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#707072] border border-[#E5E5E5]"
                    >
                        {item.icon}
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-white border-t border-[#E5E5E5] px-6 py-10 md:py-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
                <h4 className="text-[12px] md:text-[13px] font-bold uppercase mb-4 md:mb-6">Shop</h4>
                <ul className="space-y-3 md:space-y-4">
                    {['New Arrivals', 'Bestsellers', 'Oversized', 'Bottoms'].map((l) => (
                        <li key={l}>
                            <a href="#" className="text-[11px] md:text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">{l}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="text-[12px] md:text-[13px] font-bold uppercase mb-4 md:mb-6">Support</h4>
                <ul className="space-y-3 md:space-y-4">
                    {['Help Center', 'Shipping', 'Returns', 'Contact Us'].map((l) => (
                        <li key={l}>
                            <a href="#" className="text-[11px] md:text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">{l}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hidden md:block">
                <h4 className="text-[13px] font-bold uppercase mb-6">Company</h4>
                <ul className="space-y-4">
                    {['About Snitch', 'Careers', 'Sustainability'].map((l) => (
                        <li key={l}>
                            <a href="#" className="text-[12px] text-[#707072] hover:text-[#111111] transition-colors uppercase">{l}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-start md:items-end col-span-2 md:col-span-1">
                <div className="font-['Lexend',_sans-serif] text-[20px] md:text-[24px] font-bold tracking-tighter mb-4">SNITCH</div>
                <p className="text-[10px] md:text-[11px] text-[#9E9EA0] md:text-right uppercase tracking-widest">
                    © 2026 SNITCH Inc. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

const BottomNav = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const tabs = [
        { label: 'Home', icon: RiHome5Line, activeIcon: RiHome5Fill },
        { label: 'Search', icon: RiSearchLine, activeIcon: RiSearchLine },
        { label: 'Categories', icon: RiGridLine, activeIcon: RiGridLine },
        { label: 'Wishlist', icon: RiHeart3Line, activeIcon: RiHeart3Line },
        { label: 'Profile', icon: RiUser3Line, activeIcon: RiUser3Line },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-[#E5E5E5] md:hidden">
            <div className="flex justify-around py-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.label;
                    const Icon = isActive ? tab.activeIcon : tab.icon;
                    return (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`flex flex-col items-center gap-0.5 pt-1.5 pb-1 min-w-[52px] transition-all ${isActive ? 'border-t-2 border-[#111111]' : 'border-t-2 border-transparent'
                                }`}
                        >
                            <Icon className={`text-[20px] ${isActive ? 'text-[#111111]' : 'text-[#9E9EA0]'}`} />
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-[#111111]' : 'text-[#9E9EA0]'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

const HomePage = () => {
    const { handleGetAllProducts, loading } = useProduct();
    const { allProducts } = useSelector((state) => state.product || {});

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    // Normalize API products, fallback to static data if empty
    const displayProducts = (allProducts && allProducts.length > 0)
        ? allProducts.map(normalizeProduct)
        : products;

    return (
        <div className="min-h-screen bg-white text-[#111111] font-['Inter',_sans-serif] selection:bg-[#111111] selection:text-white overflow-x-hidden">
            <Navbar />
            <main className="pt-[64px] pb-20 md:pb-0 max-w-[1440px] mx-auto">
                <HeroBanner />
                <CategoryTabs />
                <ProductGrid items={displayProducts} loading={loading} />
                <FlashSale />
                <BrandStrip />
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default HomePage;