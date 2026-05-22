import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    RiArrowLeftLine, 
    RiPriceTag3Line, 
    RiInformationLine, 
    RiCheckLine,
    RiMenu2Fill,
    RiNotification3Line,
    RiImageAddLine,
    RiArrowRightLine
} from 'react-icons/ri';
import { useProduct } from '../hook/useProduct';
import ImageUploader from '../components/ImageUploader';

/**
 * CreateProduct.jsx - Redesigned Listing Page
 * 
 * Design Summary:
 * - Alignment: Matches MyProducts.jsx (Snitch Design System).
 * - Typography: Lexend 96px Hero, Inter 16px UI.
 * - Colors: Ink (#111111), Soft Cloud (#F5F5F5), Canvas (#FFFFFF).
 * - Shapes: Pill-shaped inputs and CTAs.
 */

const CreateProduct = () => {
    const navigate = useNavigate();
    const { handleCreateProduct, loading, error } = useProduct();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });

    const [images, setImages] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    const validate = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.priceAmount) errors.priceAmount = 'Price is required';
        if (images.length === 0) errors.images = 'At least one image is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('priceAmount', formData.priceAmount);
        data.append('priceCurrency', formData.priceCurrency);

        images.forEach((img) => {
            data.append('images', img.file);
        });

        const result = await handleCreateProduct(data);
        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/seller/product'); // Redirect to listing
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-white text-[#111111] font-['Inter',_sans-serif] selection:bg-[#111111] selection:text-white">
            {/* --- App Bar (Fixed) --- */}
            <header className="fixed top-0 left-0 right-0 h-[64px] bg-white z-[100] border-b border-[#E5E5E5] flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90"
                    >
                        <RiArrowLeftLine className="text-[20px]" />
                    </button>
                </div>
                <div 
                    onClick={() => navigate('/')}
                    className="absolute left-1/2 -translate-x-1/2 font-['Lexend',_sans-serif] text-[28px] font-bold tracking-[-0.04em] cursor-pointer"
                >
                    SNITCH
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90">
                        <RiNotification3Line className="text-[20px]" />
                    </button>
                    <div className="w-[32px] h-[32px] bg-[#111111] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
                        S
                    </div>
                </div>
            </header>

            <main className="pt-[64px] max-w-[1440px] mx-auto pb-24">
                {/* --- Hero Section --- */}
                <section className="max-w-[800px] mx-auto px-6 pt-16 pb-12">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#707072] mb-4">
                        <span className="cursor-pointer hover:text-[#111111]" onClick={() => navigate('/seller/product')}>Inventory</span>
                        <RiArrowRightLine className="text-[12px]" />
                        <span className="text-[#111111]">List New Product</span>
                    </div>
                    <h1 className="font-['Lexend',_sans-serif] text-[64px] md:text-[96px] leading-[0.9] font-medium tracking-[-0.03em] uppercase">
                        LIST<br />PRODUCT
                    </h1>
                </section>

                <div className="max-w-[800px] mx-auto px-6">
                    {/* --- Feedback Banners --- */}
                    {error && (
                        <div className="bg-[#D30005]/5 border border-[#D30005]/20 text-[#D30005] px-6 py-4 rounded-[24px] text-[13px] font-bold uppercase tracking-wider mb-8 flex items-center gap-4">
                            <RiInformationLine className="text-[20px]" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-[#007D48]/5 border border-[#007D48]/20 text-[#007D48] px-6 py-4 rounded-[24px] text-[13px] font-bold uppercase tracking-wider mb-8 flex items-center gap-4">
                            <RiCheckLine className="text-[20px]" />
                            Product created successfully! Redirecting...
                        </div>
                    )}

                    {/* --- Listing Form --- */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                        
                        {/* Image Upload Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-4">
                                <label className="text-[12px] font-bold uppercase tracking-[0.1em]">Product Imagery</label>
                                <span className="text-[11px] text-[#9E9EA0] uppercase font-bold">{images.length}/7 Photos</span>
                            </div>
                            <div className={`p-8 bg-[#F5F5F5] rounded-[32px] border-2 border-dashed ${formErrors.images ? 'border-[#D30005]/30' : 'border-[#E5E5E5]'}`}>
                                <ImageUploader
                                    images={images}
                                    onChange={setImages}
                                    maxImages={7}
                                />
                            </div>
                            {formErrors.images && <p className="text-[#D30005] text-[11px] px-4 font-bold uppercase tracking-wider">{formErrors.images}</p>}
                        </div>

                        {/* Title Input */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[12px] font-bold uppercase tracking-[0.1em] px-4">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Minimalist Boxy Tee"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full bg-[#F5F5F5] h-[56px] rounded-full px-8 text-[15px] font-medium outline-none border-2 transition-all ${
                                    formErrors.title ? 'border-[#D30005]/20 focus:border-[#D30005]' : 'border-transparent focus:border-[#111111]'
                                }`}
                            />
                            {formErrors.title && <p className="text-[#D30005] text-[11px] px-4 font-bold uppercase tracking-wider">{formErrors.title}</p>}
                        </div>

                        {/* Description Input */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[12px] font-bold uppercase tracking-[0.1em] px-4">Description</label>
                            <textarea
                                name="description"
                                placeholder="Detail the fit, fabric, and unique features..."
                                rows="6"
                                value={formData.description}
                                onChange={handleChange}
                                className={`w-full bg-[#F5F5F5] rounded-[32px] p-8 text-[15px] font-medium outline-none border-2 transition-all resize-none ${
                                    formErrors.description ? 'border-[#D30005]/20 focus:border-[#D30005]' : 'border-transparent focus:border-[#111111]'
                                }`}
                            />
                            {formErrors.description && <p className="text-[#D30005] text-[11px] px-4 font-bold uppercase tracking-wider">{formErrors.description}</p>}
                        </div>

                        {/* Price & Currency */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 flex flex-col gap-3">
                                <label className="text-[12px] font-bold uppercase tracking-[0.1em] px-4">Retail Price</label>
                                <div className="relative">
                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 font-bold text-[#9E9EA0]">₹</div>
                                    <input
                                        type="number"
                                        name="priceAmount"
                                        placeholder="0.00"
                                        value={formData.priceAmount}
                                        onChange={handleChange}
                                        className={`w-full bg-[#F5F5F5] h-[56px] rounded-full pl-12 pr-8 text-[15px] font-medium outline-none border-2 transition-all ${
                                            formErrors.priceAmount ? 'border-[#D30005]/20 focus:border-[#D30005]' : 'border-transparent focus:border-[#111111]'
                                        }`}
                                    />
                                </div>
                                {formErrors.priceAmount && <p className="text-[#D30005] text-[11px] px-4 font-bold uppercase tracking-wider">{formErrors.priceAmount}</p>}
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[12px] font-bold uppercase tracking-[0.1em] px-4">Currency</label>
                                <select
                                    name="priceCurrency"
                                    value={formData.priceCurrency}
                                    onChange={handleChange}
                                    className="w-full bg-[#F5F5F5] h-[56px] rounded-full px-8 text-[15px] font-bold outline-none border-2 border-transparent focus:border-[#111111] appearance-none cursor-pointer"
                                >
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-[64px] bg-[#111111] text-white rounded-full flex items-center justify-center gap-3 text-[14px] font-bold uppercase tracking-[0.15em] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Confirm & List Product</span>
                                        <RiArrowRightLine className="text-[18px]" />
                                    </>
                                )}
                            </button>
                            <p className="text-center text-[11px] text-[#9E9EA0] mt-6 uppercase font-bold tracking-widest">
                                By listing, you agree to Snitch Merchant Terms
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateProduct;