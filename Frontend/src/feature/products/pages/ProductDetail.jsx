
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../service/product.api.js'
import { RiArrowLeftLine, RiShoppingBag3Line, RiHeart3Line, RiStarFill, RiTruckLine, RiRefreshLine, RiShieldCheckLine, RiMailLine, RiUser3Line, RiAddLine, RiSubtractLine, RiSearchLine } from 'react-icons/ri'

const IMG_PLACEHOLDER = 'https://placehold.co/800x1000/F5F5F5/111111?text=SNITCH'

const Navbar = ({ onBack }) => (
    <header className="fixed top-0 left-0 right-0 h-[64px] bg-white z-[100] border-b border-[#E5E5E5] flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
            <button onClick={onBack} aria-label="Back" className="p-2 rounded-full hover:bg-[#F5F5F5]">
                <RiArrowLeftLine className="text-[18px]" />
            </button>
            <div className="font-['Lexend',_sans-serif] text-[18px] md:text-[22px] font-bold tracking-[-0.02em]">SNITCH</div>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-[#F5F5F5]">
                <RiSearchLine className="text-[18px]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#F5F5F5]">
                <RiHeart3Line className="text-[18px]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#F5F5F5]">
                <RiShoppingBag3Line className="text-[18px]" />
            </button>
        </div>
    </header>
)

const ProductDetail = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        if (!productId) return
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getProductById(productId)
                setProduct(data.product || data)
            } catch (err) {
                setError(err.message || JSON.stringify(err))
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [productId])

    const extractPrice = (p) => {
        if (!p) return 0
        const cand = p.priceAmount ?? p.price ?? p.amount ?? null
        if (cand == null) return 0
        if (typeof cand === 'number') return cand
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

    const images = (product && product.images && product.images.length > 0)
        ? product.images.map((i) => (typeof i === 'string' ? i : i.url || i))
        : [IMG_PLACEHOLDER]

    const priceVal = extractPrice(product)
    const mrpVal = extractPrice({ price: product?.mrpAmount ?? product?.mrp }) || Math.round(priceVal * 1.5)
    const currency = product?.priceCurrency || product?.currency || '₹'
    const [qty, setQty] = useState(1)

    const renderStars = (rating = 4.5) => {
        const full = Math.floor(rating)
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-px">
                    {[...Array(5)].map((_, i) => (
                        <RiStarFill key={i} className={`text-[12px] ${i < full ? 'text-[#111111]' : 'text-[#E5E5E5]'}`} />
                    ))}
                </div>
                <span className="text-[12px] text-[#707072]">{rating.toFixed(1)}</span>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white text-[#111111] font-['Inter',_sans-serif]">
            <Navbar onBack={() => navigate(-1)} />

            <main className="pt-[80px] pb-20 max-w-[1100px] mx-auto px-4 md:px-6">
                {loading && (
                    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-[3/4] bg-[#F5F5F5]" />
                        <div>
                            <div className="h-6 bg-[#F5F5F5] w-1/3 mb-4" />
                            <div className="h-4 bg-[#F5F5F5] w-1/4 mb-6" />
                            <div className="space-y-3">
                                <div className="h-10 bg-[#F5F5F5]" />
                                <div className="h-10 bg-[#F5F5F5]" />
                                <div className="h-10 bg-[#F5F5F5]" />
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-red-600">{error}</div>
                )}

                {!loading && product && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* LEFT: Gallery */}
                        <div className="order-2 md:order-1">
                            <div className="bg-[#F5F5F5] overflow-hidden rounded-lg">
                                <img src={images[activeImage]} alt={product.title || product.name}
                                    className="w-full h-[540px] object-cover" />
                            </div>
                            <div className="flex gap-3 mt-4">
                                {images.map((src, i) => (
                                    <button key={i} onClick={() => setActiveImage(i)} className={`w-[72px] h-[96px] bg-[#F5F5F5] overflow-hidden rounded-md ${i === activeImage ? 'ring-2 ring-[#111111]' : ''}`}>
                                        <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Product Info Card */}
                        <div className="flex flex-col order-1 md:order-2">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h1 className="font-['Lexend',_sans-serif] text-[22px] md:text-[28px] font-bold tracking-[-0.02em]">
                                        {product.title || product.name || 'Untitled Product'}
                                    </h1>
                                    <p className="text-[13px] text-[#707072] mt-2">{product.category || product.type}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-full border border-[#E5E5E5] hover:bg-[#F5F5F5]">
                                        <RiHeart3Line className="text-[18px]" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <div className="text-[26px] font-bold">{currency}{priceVal.toLocaleString()}</div>
                                    {mrpVal > priceVal && (
                                        <div className="text-[12px] text-[#9E9EA0] line-through">{currency}{mrpVal.toLocaleString()}</div>
                                    )}
                                </div>
                                <div>
                                    {renderStars(product.rating)}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex items-center border border-[#E5E5E5] rounded-full overflow-hidden">
                                    <button className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}><RiSubtractLine /></button>
                                    <div className="px-4 py-2 font-bold">{qty}</div>
                                    <button className="px-3 py-2" onClick={() => setQty((q) => q + 1)}><RiAddLine /></button>
                                </div>

                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#111111] text-white px-5 py-3 rounded-full font-bold hover:opacity-95">
                                        <RiShoppingBag3Line /> Add to Bag
                                    </button>
                                    <button className="flex items-center gap-2 border border-[#E5E5E5] px-4 py-3 rounded-full">
                                        <RiHeart3Line /> Wishlist
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="flex items-center gap-3 bg-[#F9FAFB] p-3 rounded-md">
                                    <RiTruckLine className="text-[20px]" />
                                    <div>
                                        <div className="font-bold text-[13px]">Free Shipping</div>
                                        <div className="text-[12px] text-[#707072]">On orders over ₹999</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-[#F9FAFB] p-3 rounded-md">
                                    <RiRefreshLine className="text-[20px]" />
                                    <div>
                                        <div className="font-bold text-[13px]">Easy Returns</div>
                                        <div className="text-[12px] text-[#707072]">7 days return</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-[#F9FAFB] p-3 rounded-md">
                                    <RiShieldCheckLine className="text-[20px]" />
                                    <div>
                                        <div className="font-bold text-[13px]">Secure Payment</div>
                                        <div className="text-[12px] text-[#707072]">Trusted checkout</div>
                                    </div>
                                </div>
                            </div>

                            <section className="mt-8">
                                <h3 className="text-[14px] font-bold mb-2">Product Details</h3>
                                <p className="text-[13px] text-[#707072] whitespace-pre-line">{product.description || product.details || 'No description provided.'}</p>
                            </section>

                            <section className="mt-8 border-t border-[#F0F0F0] pt-6">
                                <h4 className="text-[13px] font-bold">Seller</h4>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[18px]"><RiUser3Line /></div>
                                        <div>
                                            <div className="font-bold">{product.seller?.name || product.sellerName || 'Unknown Seller'}</div>
                                            <div className="text-[12px] text-[#707072]">{product.seller?.email || product.sellerEmail || ''}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a href={`mailto:${product.seller?.email || product.sellerEmail || ''}`} className="flex items-center gap-2 border border-[#E5E5E5] px-4 py-2 rounded-full">
                                            <RiMailLine /> Contact
                                        </a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default ProductDetail