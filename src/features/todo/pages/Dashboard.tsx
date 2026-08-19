import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  ShoppingBag,
  Store,
  Tag,
  Star,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  X,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  TrendingUp,
  RefreshCw,
  ShoppingBasket,
  ArrowRight,
  UserCheck,
  Check,
} from 'lucide-react';

// Product Form Schema
const productSchema = z.object({
  title: z.string().min(2, 'उत्पाद का नाम आवश्यक है (कम से कम 2 अक्षर)').max(255),
  description: z.string().optional().nullable(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().optional().nullable(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export interface ProductItem {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  // Extended E-commerce fields
  price: number;
  originalPrice: number;
  category: string;
  stock: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  image: string;
  seller: string;
}

// Preset Curated Village Dummy Images
const DUMMY_IMAGES = [
  {
    name: 'A2 गिर गाय का देशी घी',
    url: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&auto=format&fit=crop&q=80',
    category: 'डेयरी व घी',
  },
  {
    name: 'जैविक कच्ची घानी सरसों तेल',
    url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    category: 'जैविक खाद्य तेल',
  },
  {
    name: 'हाथ से बुनी खादी शॉल',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    category: 'हस्तशिल्प व खादी',
  },
  {
    name: 'शुद्ध प्राकृतिक जंगली शहद',
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    category: 'आयुर्वेदिक व शहद',
  },
  {
    name: 'पारंपरिक मिट्टी के बर्तन (कुल्हड़ सेट)',
    url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
    category: 'हस्तशिल्प व कुम्हारी',
  },
  {
    name: 'जैविक साबुत हल्दी व मसाले',
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    category: 'देशी मसाले व अनाज',
  },
];

// Initial Rich Sample Catalog
const INITIAL_CATALOG: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'शुद्ध A2 देशी गिर गाय का बिलोना घी (1 लीटर)',
    description: 'पारंपरिक वैदिक बिलोना पद्धति से बना 100% शुद्ध और औषधीय गुणों से भरपूर A2 गाय का घी।',
    completed: false,
    priority: 'HIGH',
    dueDate: '2026-12-31',
    price: 1450,
    originalPrice: 1800,
    category: 'डेयरी व घी',
    stock: 24,
    unit: '1 लीटर काँच का जार',
    rating: 4.9,
    reviewsCount: 88,
    badge: 'बेस्टसेलर ★',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&auto=format&fit=crop&q=80',
    seller: 'रामेश्वर जैविक गोशाला, सूर्यपुरा',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    title: 'कच्ची घानी शुद्ध जैविक सरसों तेल (1 लीटर)',
    description: 'सूर्यपुरा के खेतों में उगाई गई पीली सरसों से लकड़ी के कोल्हू द्वारा निकाला गया ताज़ा तेल।',
    completed: false,
    priority: 'MEDIUM',
    dueDate: '2026-12-31',
    price: 210,
    originalPrice: 260,
    category: 'जैविक खाद्य तेल',
    stock: 45,
    unit: '1 लीटर बोतल',
    rating: 4.8,
    reviewsCount: 64,
    badge: '100% जैविक',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    seller: 'सूर्यपुरा किसान उत्पादक संगठन (FPO)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    title: 'हाथ से बुनी पारंपरिक खादी शॉल व स्टोल',
    description: 'गाँव की महिला बुनकरों द्वारा चरखे पर सूत कातकर बुनी गई आरामदायक और सुरुचिपूर्ण शॉल।',
    completed: false,
    priority: 'HIGH',
    dueDate: '2026-12-31',
    price: 890,
    originalPrice: 1250,
    category: 'हस्तशिल्प व खादी',
    stock: 12,
    unit: '1 पीस (2.2 मीटर)',
    rating: 5.0,
    reviewsCount: 42,
    badge: 'हस्तनिर्मित',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    seller: 'माँ दुर्गा महिला स्वयं सहायता समूह',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-4',
    title: 'शुद्ध अरावली वन तुलसी शहद (500 ग्राम)',
    description: 'प्राकृतिक जंगलों से निकाला गया असंसाधित कच्चा शहद। इम्युनिटी बढ़ाने में सर्वोत्तम।',
    completed: false,
    priority: 'MEDIUM',
    dueDate: '2026-12-31',
    price: 399,
    originalPrice: 520,
    category: 'आयुर्वेदिक व शहद',
    stock: 30,
    unit: '500 ग्राम जार',
    rating: 4.9,
    reviewsCount: 51,
    badge: 'प्राकृतिक',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    seller: 'सूर्यपुरा मधुमक्खी पालन संघ',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-5',
    title: 'पारंपरिक हस्तनिर्मित मिट्टी के चाय कुल्हड़ (सेट ऑफ़ 6)',
    description: 'गाँव के कुम्हारों द्वारा प्राकृतिक चिकनी मिट्टी से गढ़े गए व पके हुए पर्यावरण-अनुकूल कुल्हड़।',
    completed: false,
    priority: 'LOW',
    dueDate: '2026-12-31',
    price: 249,
    originalPrice: 350,
    category: 'हस्तशिल्प व कुम्हारी',
    stock: 18,
    unit: '6 पीस का सेट',
    rating: 4.7,
    reviewsCount: 39,
    badge: 'इको-फ्रेंडली',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
    seller: 'प्रजापति कुम्हार शिल्प केंद्र',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-6',
    title: 'जैविक साबुत सेलम हल्दी गांठ (1 किग्रा)',
    description: 'उच्च करक्यूमिन (Curcumin 5%+) युक्त प्राकृतिक धूप में सुखाई गई शुद्ध साबुत हल्दी।',
    completed: false,
    priority: 'MEDIUM',
    dueDate: '2026-12-31',
    price: 280,
    originalPrice: 360,
    category: 'देशी मसाले व अनाज',
    stock: 50,
    unit: '1 किग्रा थैला',
    rating: 4.9,
    reviewsCount: 73,
    badge: 'हाई करक्यूमिन',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    seller: 'बलदेव जैविक फार्म, सूर्यपुरा',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const CATEGORIES = [
  'सभी श्रेणियाँ',
  'डेयरी व घी',
  'जैविक खाद्य तेल',
  'हस्तशिल्प व खादी',
  'आयुर्वेदिक व शहद',
  'हस्तशिल्प व कुम्हारी',
  'देशी मसाले व अनाज',
];

export default function Dashboard() {
  const queryClient = useQueryClient();
  const VITE_API_URL = import.meta.env.VITE_API_URL || 'https://api.durgagenerator.com/api';

  // State
  const [activeTab, setActiveTab] = useState<'store' | 'admin'>('store');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सभी श्रेणियाँ');
  const [stockFilter, setStockFilter] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK'>('ALL');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');

  // Local state overlay for extended e-commerce properties
  const [localProducts, setLocalProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('suryapura_products_cache');
    return saved ? JSON.parse(saved) : INITIAL_CATALOG;
  });

  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);

  // Cart State
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // React Hook Form for Add / Edit
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: null,
    },
  });

  // Custom Form Extra Fields (Price, Category, Stock, Image)
  const [formPrice, setFormPrice] = useState('450');
  const [formOriginalPrice, setFormOriginalPrice] = useState('550');
  const [formCategory, setFormCategory] = useState(CATEGORIES[1]);
  const [formStock, setFormStock] = useState('20');
  const [formUnit, setFormUnit] = useState('1 Kg');
  const [formSeller, setFormSeller] = useState('सूर्यपुरा स्वयं सहायता समूह');
  const [formBadge, setFormBadge] = useState('100% जैविक');
  const [formImage, setFormImage] = useState(DUMMY_IMAGES[0].url);

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync / Fetch from API
  const { refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}/todos?limit=50`);
        return res.data;
      } catch (err) {
        console.warn('API sync fallback to local store:', err);
        return null;
      }
    },
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (newProd: ProductItem) => {
      try {
        await axios.post(`${VITE_API_URL}/todos`, {
          title: newProd.title,
          description: newProd.description,
          priority: newProd.priority,
        });
      } catch (e) {
        console.warn('Backend offline, saved locally');
      }
      return newProd;
    },
    onSuccess: (newProd) => {
      const updated = [newProd, ...localProducts];
      setLocalProducts(updated);
      localStorage.setItem('suryapura_products_cache', JSON.stringify(updated));
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsAddModalOpen(false);
      reset();
      showToast(`✅ "${newProd.title}" सफलतापूर्वक जोड़ा गया!`);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await axios.delete(`${VITE_API_URL}/todos/${id}`);
      } catch (e) {
        console.warn('Backend delete sync note');
      }
      return id;
    },
    onSuccess: (deletedId) => {
      const updated = localProducts.filter((p) => p.id !== deletedId);
      setLocalProducts(updated);
      localStorage.setItem('suryapura_products_cache', JSON.stringify(updated));
      setDeleteTarget(null);
      showToast('🗑️ उत्पाद सफलतापूर्वक हटा दिया गया!');
    },
  });

  // Submit Handler (Add or Update)
  const onSubmit = (data: ProductFormValues) => {
    if (editingProduct) {
      // Update existing
      const updatedList = localProducts.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            title: data.title,
            description: data.description || '',
            priority: data.priority || 'MEDIUM',
            price: parseFloat(formPrice) || p.price,
            originalPrice: parseFloat(formOriginalPrice) || p.originalPrice,
            category: formCategory,
            stock: parseInt(formStock, 10) || p.stock,
            unit: formUnit,
            seller: formSeller,
            badge: formBadge,
            image: formImage,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      setLocalProducts(updatedList);
      localStorage.setItem('suryapura_products_cache', JSON.stringify(updatedList));
      setEditingProduct(null);
      setIsAddModalOpen(false);
      reset();
      showToast(`✏️ "${data.title}" सफलतापूर्वक अपडेट किया गया!`);
    } else {
      // Create new
      const newProduct: ProductItem = {
        id: 'prod-' + Date.now(),
        title: data.title,
        description: data.description || '',
        completed: false,
        priority: data.priority || 'MEDIUM',
        dueDate: null,
        price: parseFloat(formPrice) || 299,
        originalPrice: parseFloat(formOriginalPrice) || 399,
        category: formCategory,
        stock: parseInt(formStock, 10) || 15,
        unit: formUnit,
        rating: 5.0,
        reviewsCount: 1,
        badge: formBadge,
        image: formImage,
        seller: formSeller,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      createMutation.mutate(newProduct);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (prod: ProductItem) => {
    setEditingProduct(prod);
    setValue('title', prod.title);
    setValue('description', prod.description || '');
    setValue('priority', prod.priority);
    setFormPrice(prod.price.toString());
    setFormOriginalPrice(prod.originalPrice.toString());
    setFormCategory(prod.category);
    setFormStock(prod.stock.toString());
    setFormUnit(prod.unit);
    setFormSeller(prod.seller);
    setFormBadge(prod.badge);
    setFormImage(prod.image);
    setIsAddModalOpen(true);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    reset({ title: '', description: '', priority: 'MEDIUM', dueDate: null });
    setFormPrice('350');
    setFormOriginalPrice('450');
    setFormCategory(CATEGORIES[1]);
    setFormStock('25');
    setFormUnit('1 किग्रा');
    setFormSeller('सूर्यपुरा स्वयं सहायता समूह');
    setFormBadge('100% जैविक');
    setFormImage(DUMMY_IMAGES[0].url);
    setIsAddModalOpen(true);
  };

  // Cart Handlers
  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`🛒 "${product.title}" कार्ट में जोड़ा गया!`);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return localProducts
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.seller.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          selectedCategory === 'सभी श्रेणियाँ' || p.category === selectedCategory;

        const matchesStock =
          stockFilter === 'ALL' ||
          (stockFilter === 'IN_STOCK' && p.stock > 10) ||
          (stockFilter === 'LOW_STOCK' && p.stock <= 10);

        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  }, [localProducts, search, selectedCategory, stockFilter, sortBy]);

  // Inventory Statistics
  const stats = useMemo(() => {
    const totalProducts = localProducts.length;
    const totalValue = localProducts.reduce((sum, p) => sum + p.price * p.stock, 0);
    const lowStockCount = localProducts.filter((p) => p.stock <= 10).length;
    const categoriesCount = new Set(localProducts.map((p) => p.category)).size;
    return { totalProducts, totalValue, lowStockCount, categoriesCount };
  }, [localProducts]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-green text-cream px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-warm-yellow/40 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-warm-yellow animate-pulse" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner with Store Title & Switcher */}
      <div className="relative overflow-hidden rounded-3xl bg-green-gradient text-cream p-6 sm:p-10 shadow-xl border border-forest-green/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-warm-yellow/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 bg-warm-yellow/20 text-warm-yellow px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-warm-yellow/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>सूर्यपुरा ई-कॉमर्स बाज़ार पोर्टल</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-cream tracking-tight">
              गाँव का ताज़ा उत्पाद, सीधा आपके द्वार 🌾
            </h1>
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed">
              सूर्यपुरा के मेहनती किसानों, पशुपालकों और महिला स्वयं सहायता समूहों द्वारा तैयार किए गए
              100% शुद्ध और जैविक उत्पादों का डिजिटल केंद्र।
            </p>
          </div>

          {/* Tab Switcher & Cart Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-charcoal/40 backdrop-blur-md p-1.5 rounded-2xl flex items-center border border-white/10">
              <button
                onClick={() => setActiveTab('store')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === 'store'
                    ? 'bg-warm-yellow text-charcoal shadow-md'
                    : 'text-cream/70 hover:text-cream hover:bg-white/5'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>ई-कॉमर्स स्टोर</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === 'admin'
                    ? 'bg-warm-yellow text-charcoal shadow-md'
                    : 'text-cream/70 hover:text-cream hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>प्रबंधन CRUD</span>
              </button>
            </div>

            {/* Floating Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-warm-yellow text-charcoal hover:bg-gold px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-lg transition-transform active:scale-95"
              title="शॉपिंग कार्ट खोलें"
            >
              <ShoppingBasket className="w-4 h-4" />
              <span className="hidden sm:inline">कार्ट</span>
              {cartItemsCount > 0 && (
                <span className="bg-deep-green text-warm-yellow text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Ribbon (Shown in Admin Mode) */}
      {activeTab === 'admin' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
          <div className="bg-white dark:bg-[#121B16] p-5 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-800 flex items-center gap-4">
            <div className="p-3 bg-light-green dark:bg-forest-green/30 text-forest-green dark:text-warm-yellow rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-green dark:text-gray-400 font-medium">कुल उत्पाद</p>
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-white">
                {stats.totalProducts} आइटम
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121B16] p-5 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-800 flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-green dark:text-gray-400 font-medium">इन्वेंटरी मूल्य</p>
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-white">
                ₹{stats.totalValue.toLocaleString('en-IN')}
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121B16] p-5 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-800 flex items-center gap-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-green dark:text-gray-400 font-medium">कम स्टॉक चेतावनी</p>
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-white">
                {stats.lowStockCount} उत्पाद
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121B16] p-5 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-800 flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-xl">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-green dark:text-gray-400 font-medium">सक्रिय श्रेणियाँ</p>
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-white">
                {stats.categoriesCount} श्रेणियाँ
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Search, Category Filters, Stock status and Actions Bar */}
      <div className="bg-white dark:bg-[#121B16] p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-200/80 dark:border-gray-800 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-green dark:text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="उत्पाद का नाम, श्रेणी या किसान/विक्रेता खोजें..."
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-soft-beige dark:bg-gray-800/80 border border-transparent focus:border-forest-green text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 transition-all text-charcoal dark:text-white"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Stock Filter Pills & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-soft-beige dark:bg-gray-800 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setStockFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  stockFilter === 'ALL'
                    ? 'bg-deep-green text-warm-yellow shadow-sm'
                    : 'text-muted-green dark:text-gray-400 hover:text-charcoal'
                }`}
              >
                सभी स्टॉक
              </button>
              <button
                onClick={() => setStockFilter('IN_STOCK')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  stockFilter === 'IN_STOCK'
                    ? 'bg-deep-green text-warm-yellow shadow-sm'
                    : 'text-muted-green dark:text-gray-400 hover:text-charcoal'
                }`}
              >
                उपलब्ध (&gt;10)
              </button>
              <button
                onClick={() => setStockFilter('LOW_STOCK')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  stockFilter === 'LOW_STOCK'
                    ? 'bg-deep-green text-warm-yellow shadow-sm'
                    : 'text-muted-green dark:text-gray-400 hover:text-charcoal'
                }`}
              >
                कम स्टॉक (≤10)
              </button>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="appearance-none bg-soft-beige dark:bg-gray-800 text-charcoal dark:text-white pl-4 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none border border-transparent focus:border-forest-green cursor-pointer"
              >
                <option value="popular">🔥 लोकप्रियता (Popular)</option>
                <option value="price_low">₹ मूल्य: कम से ज्यादा</option>
                <option value="price_high">₹ मूल्य: ज्यादा से कम</option>
                <option value="rating">⭐ शीर्ष रेटिंग (Rating)</option>
              </select>
              <SlidersHorizontal className="w-4 h-4 text-muted-green absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Add Product Button */}
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 bg-green-gradient hover:opacity-90 text-cream px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-green transition-transform active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-5 h-5 text-warm-yellow" />
              <span>नया उत्पाद जोड़ें</span>
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'सभी श्रेणियाँ'
                ? localProducts.length
                : localProducts.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-deep-green text-warm-yellow shadow-sm scale-105'
                    : 'bg-soft-beige dark:bg-gray-800 text-charcoal dark:text-gray-300 hover:bg-warm-yellow/20'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-warm-yellow text-charcoal'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🛍️ VIEW 1: STOREFRONT CATALOG (CUSTOMER SHOPPING VIEW)                   */}
      {/* ========================================================================= */}
      {activeTab === 'store' && (
        <div>
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#121B16] rounded-3xl p-12 text-center space-y-4 border border-dashed border-gray-300 dark:border-gray-800">
              <div className="w-16 h-16 bg-soft-beige dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-muted-green">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-charcoal dark:text-white">
                कोई उत्पाद नहीं मिला
              </h3>
              <p className="text-xs text-muted-green dark:text-gray-400 max-w-md mx-auto">
                आपके खोज मानदंड के अनुसार कोई उत्पाद उपलब्ध नहीं है। कृपया सर्च फ़िल्टर रीसेट करें
                या नया उत्पाद जोड़ें।
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('सभी श्रेणियाँ');
                  setStockFilter('ALL');
                }}
                className="px-5 py-2.5 bg-forest-green text-cream rounded-xl text-xs font-bold"
              >
                फ़िल्टर रीसेट करें
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((prod) => {
                const discount = Math.round(
                  ((prod.originalPrice - prod.price) / prod.originalPrice) * 100
                );

                return (
                  <div
                    key={prod.id}
                    className="group bg-white dark:bg-[#121B16] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover border border-gray-200/80 dark:border-gray-800/80 transition-all duration-300 flex flex-col hover:-translate-y-1.5"
                  >
                    {/* Product Image & Badges */}
                    <div className="relative h-52 sm:h-56 bg-soft-beige dark:bg-gray-800 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DUMMY_IMAGES[0].url;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <button
                          onClick={() => setQuickViewProduct(prod)}
                          className="w-full py-2.5 bg-white/95 text-charcoal font-bold text-xs rounded-xl shadow-md hover:bg-warm-yellow transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>त्वरित विवरण (Quick View)</span>
                        </button>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {prod.badge && (
                          <span className="bg-warm-yellow text-charcoal font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                            {prod.badge}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                            {discount}% छूट
                          </span>
                        )}
                      </div>

                      {/* Stock Tag */}
                      <div className="absolute top-3 right-3">
                        {prod.stock <= 10 ? (
                          <span className="bg-rose-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
                            केवल {prod.stock} बचे
                          </span>
                        ) : (
                          <span className="bg-deep-green/90 text-warm-yellow text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
                            उपलब्ध
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Details Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-green dark:text-gray-400">
                          <span className="font-semibold text-forest-green dark:text-emerald-400 bg-light-green dark:bg-forest-green/20 px-2.5 py-0.5 rounded-md">
                            {prod.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{prod.rating}</span>
                            <span className="text-gray-400 font-normal text-[10px]">
                              ({prod.reviewsCount})
                            </span>
                          </div>
                        </div>

                        <h3 className="font-bold text-base text-charcoal dark:text-white line-clamp-2 group-hover:text-forest-green dark:group-hover:text-warm-yellow transition-colors">
                          {prod.title}
                        </h3>

                        <p className="text-xs text-muted-green dark:text-gray-400 line-clamp-2">
                          {prod.description}
                        </p>
                      </div>

                      {/* Seller & Price / Actions */}
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-green dark:text-gray-400">
                          <UserCheck className="w-3.5 h-3.5 text-forest-green" />
                          <span className="truncate">{prod.seller}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-extrabold text-deep-green dark:text-warm-yellow">
                                ₹{prod.price}
                              </span>
                              {prod.originalPrice > prod.price && (
                                <span className="text-xs text-gray-400 line-through">
                                  ₹{prod.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              प्रति {prod.unit}
                            </span>
                          </div>

                          <button
                            onClick={() => addToCart(prod)}
                            className="flex items-center gap-2 bg-green-gradient hover:bg-forest-green text-cream px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                          >
                            <ShoppingBag className="w-4 h-4 text-warm-yellow" />
                            <span>कार्ट में जोड़ें</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📊 VIEW 2: ADMIN MANAGEMENT CRUD TABLE                                   */}
      {/* ========================================================================= */}
      {activeTab === 'admin' && (
        <div className="bg-white dark:bg-[#121B16] rounded-3xl shadow-sm border border-gray-200/80 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-charcoal dark:text-white">
                इन्वेंटरी व उत्पाद प्रबंधन सूची (CRUD Management)
              </h2>
              <p className="text-xs text-muted-green dark:text-gray-400">
                यहाँ से आप उत्पादों को जोड़, संपादित, स्टॉक नियंत्रित और हटा सकते हैं।
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => refetch()}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-soft-beige dark:bg-gray-800 text-charcoal dark:text-gray-200 rounded-xl font-semibold hover:bg-warm-yellow/20 transition-colors"
                title="API सिंक करें"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>सिंक (Sync)</span>
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal dark:text-gray-200">
              <thead className="bg-soft-beige/80 dark:bg-gray-800/80 text-muted-green dark:text-gray-400 font-bold uppercase text-[11px] tracking-wider border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="py-4 px-6">उत्पाद (Product)</th>
                  <th className="py-4 px-4">श्रेणी (Category)</th>
                  <th className="py-4 px-4">मूल्य (Price)</th>
                  <th className="py-4 px-4">स्टॉक (Stock)</th>
                  <th className="py-4 px-4">विक्रेता/फार्म</th>
                  <th className="py-4 px-6 text-right">कार्य (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    className="hover:bg-soft-beige/30 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DUMMY_IMAGES[0].url;
                          }}
                        />
                        <div>
                          <p className="font-bold text-sm text-charcoal dark:text-white line-clamp-1">
                            {prod.title}
                          </p>
                          <p className="text-[11px] text-muted-green dark:text-gray-400">
                            इकाई: {prod.unit} • रेटिंग: ⭐ {prod.rating}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-forest-green dark:text-emerald-400 bg-light-green dark:bg-forest-green/20 px-2.5 py-1 rounded-md text-[11px]">
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-sm text-deep-green dark:text-warm-yellow">
                        ₹{prod.price}
                      </div>
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{prod.originalPrice}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="py-4 px-4">
                      {prod.stock <= 10 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400">
                          कम स्टॉक ({prod.stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
                          उपलब्ध ({prod.stock})
                        </span>
                      )}
                    </td>

                    {/* Seller */}
                    <td className="py-4 px-4 text-[11px] text-muted-green dark:text-gray-400 max-w-[160px] truncate">
                      {prod.seller}
                    </td>

                    {/* Actions: Edit, Quick View, Delete */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setQuickViewProduct(prod)}
                          className="p-2 rounded-xl text-gray-500 hover:text-charcoal hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title="विवरण देखें"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors font-bold"
                          title="संपादित करें (Edit)"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(prod)}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors font-bold"
                          title="हटाएँ (Delete)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📝 MODAL: ADD / EDIT PRODUCT                                             */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#121B16] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-charcoal dark:text-white">
                  {editingProduct ? '✏️ उत्पाद संपादित करें (Edit Product)' : '✨ नया उत्पाद जोड़ें (Add Product)'}
                </h3>
                <p className="text-xs text-muted-green dark:text-gray-400">
                  कृपया उत्पाद के सभी आवश्यक विवरण भरें।
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                  उत्पाद का नाम (Product Name) *
                </label>
                <input
                  {...register('title')}
                  placeholder="उदा. शुद्ध A2 गाय का घी (1 लीटर)"
                  className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                />
                {errors.title && (
                  <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Category & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                  >
                    {CATEGORIES.filter((c) => c !== 'सभी श्रेणियाँ').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                    इकाई / माप (Unit / Packaging)
                  </label>
                  <input
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="उदा. 1 लीटर, 500 ग्राम, 1 पीस"
                    className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                    विक्रय मूल्य (₹ Price) *
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                    मूल मूल्य (₹ MRP)
                  </label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                    उपलब्ध स्टॉक (Quantity)
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Seller & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                    विक्रेता / किसान / समूह (Seller)
                  </label>
                  <input
                    value={formSeller}
                    onChange={(e) => setFormSeller(e.target.value)}
                    placeholder="उदा. रामेश्वर जैविक फार्म, सूर्यपुरा"
                    className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                    बैज / टैग (Badge)
                  </label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                  >
                    <option value="100% जैविक">100% जैविक (Organic)</option>
                    <option value="बेस्टसेलर ★">बेस्टसेलर ★ (Bestseller)</option>
                    <option value="हस्तनिर्मित">हस्तनिर्मित (Handmade)</option>
                    <option value="नया उत्पाद">नया उत्पाद (New)</option>
                    <option value="इको-फ्रेंडली">इको-फ्रेंडली (Eco-Friendly)</option>
                  </select>
                </div>
              </div>

              {/* Dummy Image Preset Selector */}
              <div>
                <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                  उत्पाद छवि चुनें (Select Preset Image) या कस्टम URL
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                  {DUMMY_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.url}
                      onClick={() => setFormImage(img.url)}
                      className={`relative h-14 rounded-xl overflow-hidden border-2 transition-transform ${
                        formImage === img.url
                          ? 'border-warm-yellow scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded-xl bg-soft-beige dark:bg-gray-800 text-xs border border-transparent focus:border-forest-green text-charcoal dark:text-white font-mono"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-charcoal dark:text-gray-200 mb-1.5">
                  उत्पाद विवरण (Description)
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="उत्पाद की विशेषताएँ, जैविक शुद्धता और लाभ के बारे में लिखें..."
                  className="w-full px-4 py-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 border border-transparent focus:border-forest-green text-sm focus:outline-none text-charcoal dark:text-white font-medium"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  रद्द करें (Cancel)
                </button>

                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-6 py-2.5 bg-green-gradient hover:bg-forest-green text-cream rounded-xl text-xs font-bold shadow-green transition-all active:scale-95 disabled:opacity-50"
                >
                  {createMutation.isPending
                    ? 'सेव हो रहा है...'
                    : editingProduct
                    ? 'अपडेट करें (Update)'
                    : 'उत्पाद प्रकाशित करें (Publish)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🔍 MODAL: QUICK VIEW PRODUCT DETAILS                                      */}
      {/* ========================================================================= */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#121B16] rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden bg-soft-beige dark:bg-gray-800">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-forest-green bg-light-green px-2.5 py-0.5 rounded-full">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-xl font-bold text-charcoal dark:text-white">
                    {quickViewProduct.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{quickViewProduct.rating} / 5.0</span>
                    <span className="text-gray-400 font-normal">
                      ({quickViewProduct.reviewsCount} सत्यापित ग्राहक समीक्षाएं)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-deep-green dark:text-warm-yellow">
                    ₹{quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{quickViewProduct.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-muted-green font-medium">
                    (प्रति {quickViewProduct.unit})
                  </span>
                </div>

                <p className="text-xs text-muted-green dark:text-gray-300 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="p-3 rounded-xl bg-soft-beige dark:bg-gray-800/80 text-xs space-y-1">
                  <p className="font-semibold text-charcoal dark:text-white flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-forest-green" />
                    <span>उत्पादक: {quickViewProduct.seller}</span>
                  </p>
                  <p className="text-muted-green text-[11px]">
                    📦 स्टॉक में उपलब्ध: {quickViewProduct.stock} पैकेट्स
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 bg-green-gradient text-cream font-bold text-xs rounded-xl shadow-green flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <ShoppingBag className="w-4 h-4 text-warm-yellow" />
                    <span>कार्ट में जोड़ें</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🗑️ MODAL: DELETE CONFIRMATION                                             */}
      {/* ========================================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#121B16] rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-800 p-6 space-y-4 text-center">
            <div className="w-14 h-14 bg-rose-100 dark:bg-rose-950/50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-charcoal dark:text-white">
              क्या आप इस उत्पाद को हटाना चाहते हैं?
            </h3>
            <p className="text-xs text-muted-green dark:text-gray-400">
              "{deleteTarget.title}" को हटाने के बाद यह स्टोर और इन्वेंटरी से हमेशा के लिए हट जाएगा।
            </p>
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                रद्द करें
              </button>
              <button
                onClick={() => deleteMutation.mutate(deleteTarget.id)}
                disabled={deleteMutation.isPending}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                {deleteMutation.isPending ? 'हटाया जा रहा है...' : 'हाँ, हटाएँ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🛒 DRAWER: SHOPPING CART & CHECKOUT SIMULATION                            */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-[#121B16] shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col justify-between">
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBasket className="w-5 h-5 text-deep-green dark:text-warm-yellow" />
                  <h3 className="font-bold text-lg text-charcoal dark:text-white">
                    आपकी शॉपिंग कार्ट ({cartItemsCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 bg-soft-beige dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-muted-green">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-charcoal dark:text-white">आपकी कार्ट खाली है</p>
                    <p className="text-xs text-muted-green">
                      गाँव के ताज़ा और शुद्ध उत्पादों को देखने के लिए स्टोर ब्राउज़ करें।
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-soft-beige/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-charcoal dark:text-white truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-[11px] font-extrabold text-forest-green dark:text-warm-yellow mt-0.5">
                          ₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateCartQty(item.product.id, -1)}
                            className="w-6 h-6 rounded-md bg-gray-200 dark:bg-gray-700 font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.product.id, 1)}
                            className="w-6 h-6 rounded-md bg-gray-200 dark:bg-gray-700 font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => updateCartQty(item.product.id, -item.quantity)}
                        className="text-gray-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer / Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-soft-beige/30 dark:bg-gray-800/30 space-y-4">
                  <div className="space-y-1.5 text-xs text-muted-green dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>उत्पादों का कुल मूल्य</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>डिलीवरी शुल्क (गाँव में)</span>
                      <span>मुफ़्त (FREE)</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-charcoal dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span>कुल देय राशि</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOrderPlaced(true);
                      setCart([]);
                    }}
                    className="w-full py-3.5 bg-green-gradient hover:bg-forest-green text-cream font-bold text-sm rounded-2xl shadow-green flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <span>ऑर्डर प्लेस करें (Place Order)</span>
                    <ArrowRight className="w-4 h-4 text-warm-yellow" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🎉 MODAL: ORDER SUCCESSFUL CELEBRATION */}
      {isOrderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#121B16] rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-800 p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal dark:text-white">
              बधाई हो! ऑर्डर दर्ज हो गया है 🎉
            </h3>
            <p className="text-xs text-muted-green dark:text-gray-300 leading-relaxed">
              सूर्यपुरा ग्राम हाट से खरीदारी करने के लिए धन्यवाद। आपका ऑर्डर सीधे स्थानीय किसान एवं
              उत्पादक समूह को भेज दिया गया है।
            </p>
            <div className="p-3 bg-light-green dark:bg-forest-green/20 rounded-xl text-forest-green dark:text-warm-yellow text-xs font-bold">
              📦 डिलीवरी: अगले 24 घंटों में आपके पते पर
            </div>
            <button
              onClick={() => {
                setIsOrderPlaced(false);
                setIsCartOpen(false);
              }}
              className="w-full py-3 bg-deep-green text-cream font-bold text-xs rounded-xl shadow-md"
            >
              शॉपिंग जारी रखें
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
