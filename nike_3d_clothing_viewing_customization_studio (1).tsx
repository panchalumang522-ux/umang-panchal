import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  ShoppingBag, 
  Heart, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Layers, 
  Palette, 
  Type as TypeIcon, 
  Grid, 
  Sliders, 
  Maximize2, 
  Check, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  Zap, 
  Share2, 
  Camera, 
  ChevronRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  SlidersHorizontal,
  Upload,
  Image as ImageIcon,
  Hash,
  Move,
  Star,
  User,
  Lock,
  Mail,
  MessageSquare,
  ThumbsUp,
  Award,
  Search,
  MapPin,
  CreditCard,
  FileText,
  Navigation,
  Smartphone,
  CheckCircle2,
  QrCode,
  ShieldAlert
} from 'lucide-react';

// ==========================================
// CONSTANTS & DATASETS
// ==========================================
const GARMENT_TYPES = [
  { id: 'tshirt', name: 'Nike Pro Dri-FIT Tee', category: 'T-Shirts', gender: 'Men', basePrice: 2499, icon: '👕' },
  { id: 'oversized', name: 'Nike Sportswear Oversized Tee', category: 'T-Shirts', gender: 'Unisex', basePrice: 2899, icon: '👕' },
  { id: 'hoodie', name: 'Nike Club Fleece Hoodie', category: 'Hoodies', gender: 'Men', basePrice: 4999, icon: '🧥' },
  { id: 'jacket', name: 'Nike Windrunner Trail Jacket', category: 'Jackets', gender: 'Men', basePrice: 6999, icon: '🧥' },
  { id: 'tracksuit', name: 'Nike Dri-FIT Academy Tracksuit', category: 'Tracksuits', gender: 'Men', basePrice: 7499, icon: '🎽' },
  { id: 'joggers', name: 'Nike Tech Fleece Joggers', category: 'Pants', gender: 'Men', basePrice: 5499, icon: '👖' },
  { id: 'cargopants', name: 'Nike Sportswear Utility Cargo', category: 'Pants', gender: 'Men', basePrice: 6299, icon: '👖' },
  { id: 'shorts', name: 'Nike Challenger Running Shorts', category: 'Shorts', gender: 'Men', basePrice: 2199, icon: '🩳' },
  { id: 'compression', name: 'Nike Pro Compression Tights', category: 'Tights', gender: 'Men', basePrice: 3299, icon: '👖' },
  { id: 'shoes', name: "Nike Air Force 1 '07", category: 'Footwear', gender: 'Unisex', basePrice: 9695, icon: '👟' },
  { id: 'jordan', name: 'Nike Air Jordan 1 Retro High', category: 'Footwear', gender: 'Unisex', basePrice: 16995, icon: '👟' },
  { id: 'zoomx', name: 'Nike ZoomX Vaporfly Marathon', category: 'Footwear', gender: 'Unisex', basePrice: 22995, icon: '👟' },
  { id: 'cleats', name: 'Nike Mercurial Vapor Elite FG', category: 'Footwear', gender: 'Unisex', basePrice: 20495, icon: '⚽' },
  { id: 'hightop', name: 'Nike Blazer Mid 77 Vintage', category: 'Footwear', gender: 'Unisex', basePrice: 8995, icon: '👟' },
  { id: 'bag', name: 'Nike Brasilia Training Duffel', category: 'Bags', gender: 'Unisex', basePrice: 3499, icon: '🎒' },
  { id: 'backpack', name: 'Nike Utility Elite Backpack', category: 'Bags', gender: 'Unisex', basePrice: 4799, icon: '🎒' },
  { id: 'airpods', name: 'Nike Pulse True Wireless Earbuds', category: 'Accessories', gender: 'Unisex', basePrice: 12999, icon: '🎧' },
  { id: 'cap', name: 'Nike Club Metal Swoosh Cap', category: 'Accessories', gender: 'Unisex', basePrice: 1795, icon: '🧢' },
  { id: 'womens_tank', name: 'Nike Dri-FIT ADV Women Tank', category: 'Women', gender: 'Women', basePrice: 2299, icon: '🎽' },
  { id: 'womens_sportsbra', name: 'Nike Alate Medium-Support Bra', category: 'Women', gender: 'Women', basePrice: 3199, icon: '👚' },
  { id: 'womens_hoodie', name: 'Nike Phoenix Fleece Crop Hoodie', category: 'Women', gender: 'Women', basePrice: 5299, icon: '🧥' },
  { id: 'womens_leggings', name: 'Nike Zenvy Gentle Support Leggings', category: 'Women', gender: 'Women', basePrice: 4499, icon: '👖' },
];

const COLOR_PALETTE = [
  { id: 'black', name: 'Obsidian Black', hex: '#111111' },
  { id: 'volt', name: 'Volt Neon', hex: '#CCFF00' },
  { id: 'orange', name: 'Total Orange', hex: '#FF5A00' },
  { id: 'white', name: 'Pure White', hex: '#FAFAFA' },
  { id: 'blue', name: 'Royal Hyper Blue', hex: '#0047AB' },
  { id: 'crimson', name: 'Bright Crimson', hex: '#DC143C' },
  { id: 'purple', name: 'Court Purple', hex: '#4B0082' },
  { id: 'pink', name: 'Laser Pink', hex: '#FF1493' },
  { id: 'grey', name: 'Cool Wolf Grey', hex: '#8C92AC' },
  { id: 'gold', name: 'Metallic Gold', hex: '#D4AF37' },
];

const MATERIALS = [
  { id: 'cotton', name: 'Premium Organic Cotton', roughness: 0.8, metalness: 0.0, clearcoat: 0.0 },
  { id: 'poly', name: 'Dri-FIT High Performance Poly', roughness: 0.4, metalness: 0.1, clearcoat: 0.2 },
  { id: 'nylon', name: 'Water-Resistant Ripstop Nylon', roughness: 0.25, metalness: 0.3, clearcoat: 0.5 },
  { id: 'leather', name: 'Full-Grain Athletic Leather', roughness: 0.35, metalness: 0.15, clearcoat: 0.4 },
];

const PATTERNS = [
  { id: 'none', name: 'Solid Clean' },
  { id: 'stripes', name: 'Speed Stripes' },
  { id: 'camo', name: 'Urban Camo' },
  { id: 'gradients', name: 'Sunset Fade' },
  { id: 'dots', name: 'Matrix Dots' },
];

const FONTS = [
  { id: 'sans', name: 'Nike Bold Sans' },
  { id: 'mono', name: 'Aero Digital Mono' },
  { id: 'serif', name: 'Vintage Varsity' },
];

const PRESET_LOGOS = [
  { id: 'swoosh', name: 'Cyber Swoosh', symbol: '⚡' },
  { id: 'crest', name: 'Volt Crest', symbol: '🛡️' },
  { id: 'wings', name: 'Stealth Wings', symbol: '🦅' },
  { id: 'shield', name: 'Apex Shield', symbol: '🔷' },
  { id: 'crown', name: 'King Crown', symbol: '👑' },
];

const MEN_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const WOMEN_SIZES = ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18'];

const REVIEWS_DATA = [
  { id: 1, name: 'Virat K.', location: 'Mumbai, India', rating: 5, date: '2 days ago', verified: true, product: 'Nike Air Jordan 1 Retro High', comment: 'Absolute perfection! The 3D customizer lets you preview every color detail precisely before ordering.', avatar: '⭐', helpful: 42 },
  { id: 2, name: 'P.V. Sindhu', location: 'Hyderabad, India', rating: 5, date: '1 week ago', verified: true, product: 'Nike Pro Dri-FIT ADV', comment: 'Super breathable fabric and the custom monogram rendering on the sleeve is world-class.', avatar: '🔥', helpful: 31 },
  { id: 3, name: 'Neeraj C.', location: 'Chandigarh, India', rating: 5, date: '2 weeks ago', verified: true, product: 'Nike ZoomX Vaporfly', comment: 'Lightning fast GPS shipping and stellar app interface. 10/10 Nike experience!', avatar: '⚡', helpful: 19 },
];

// ==========================================
// CUSTOM TEXTURE GENERATOR HELPER
// ==========================================
function generateCustomTexture(options) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = options.color;
  ctx.fillRect(0, 0, 1024, 1024);

  if (options.pattern === 'stripes') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 1024; i += 80) {
      ctx.fillRect(i, 0, 30, 1024);
    }
  } else if (options.pattern === 'camo') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 1024, 120 + Math.random() * 150, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (options.pattern === 'dots') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let x = 40; x < 1024; x += 80) {
      for (let y = 40; y < 1024; y += 80) {
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (options.pattern === 'gradients') {
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, 'rgba(255, 90, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);
  }

  if (options.logoImg) {
    ctx.save();
    ctx.translate(512, 380);
    ctx.scale(options.logoScale, options.logoScale);
    ctx.rotate(options.logoRotation);
    ctx.globalAlpha = options.logoOpacity;
    ctx.drawImage(options.logoImg, -120, -120, 240, 240);
    ctx.restore();
  } else if (options.presetLogo) {
    ctx.save();
    ctx.font = 'bold 90px sans-serif';
    ctx.fillStyle = '#FF5A00';
    ctx.textAlign = 'center';
    ctx.fillText(options.presetLogo.symbol, 512, 380);
    ctx.restore();
  }

  if (options.customText) {
    ctx.save();
    ctx.fillStyle = options.textColor || '#ffffff';
    ctx.font = '900 64px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.customText.toUpperCase(), 512, 620);
    ctx.restore();
  }

  if (options.jerseyNumber) {
    ctx.save();
    ctx.fillStyle = options.textColor || '#ffffff';
    ctx.font = '900 180px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(options.jerseyNumber, 512, 820);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// ==========================================
// THREE.JS MESH CREATOR
// ==========================================
function buildClothingMesh(type, materialOptions, texture) {
  const group = new THREE.Group();

  const mat = new THREE.MeshPhysicalMaterial({
    map: texture,
    roughness: materialOptions.roughness,
    metalness: materialOptions.metalness,
    clearcoat: materialOptions.clearcoat || 0,
    clearcoatRoughness: materialOptions.clearcoatRoughness || 0.1,
    side: THREE.DoubleSide,
  });

  const accentMatLocal = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.3,
    metalness: 0.8,
  });

  const neonMatLocal = new THREE.MeshStandardMaterial({
    color: 0xFF5A00,
    emissive: 0xFF5A00,
    emissiveIntensity: 0.7,
    roughness: 0.1,
  });

  switch (type) {
    case 'tshirt':
    case 'oversized':
    case 'tank':
    case 'womens_tank':
    case 'womens_sportsbra': {
      const isOversized = type === 'oversized';
      const scaleX = isOversized ? 1.3 : 1.05;
      const scaleY = isOversized ? 1.15 : 1.0;

      const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.85 * scaleX, 0.72 * scaleX, 2.3 * scaleY, 48, 16), mat);
      torsoMesh.castShadow = true;
      group.add(torsoMesh);

      const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.9, 24), mat);
      leftSleeve.position.set(-0.95 * scaleX, 0.7, 0);
      leftSleeve.rotation.z = Math.PI / 4;
      
      const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.9, 24), mat);
      rightSleeve.position.set(0.95 * scaleX, 0.7, 0);
      rightSleeve.rotation.z = -Math.PI / 4;
      group.add(leftSleeve, rightSleeve);
      break;
    }

    case 'hoodie':
    case 'womens_hoodie': {
      const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.85, 2.4, 48), mat);
      group.add(bodyMesh);

      const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.3, 1.3, 24), mat);
      leftSleeve.position.set(-1.05, 0.5, 0);
      leftSleeve.rotation.z = Math.PI / 5;
      
      const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.3, 1.3, 24), mat);
      rightSleeve.position.set(1.05, 0.5, 0);
      rightSleeve.rotation.z = -Math.PI / 5;
      group.add(leftSleeve, rightSleeve);
      break;
    }

    case 'jacket': {
      const jacketBody = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.9, 2.45, 48), mat);
      group.add(jacketBody);
      break;
    }

    case 'tracksuit': {
      const topBody = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.82, 2.3, 48), mat);
      group.add(topBody);
      break;
    }

    case 'compression':
    case 'womens_leggings':
    case 'tights': {
      const tightBody = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.72, 2.3, 48), mat);
      group.add(tightBody);
      break;
    }

    case 'shorts': {
      const shortsMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.95, 1.2, 48), mat);
      shortsMesh.position.y = -0.5;
      group.add(shortsMesh);
      break;
    }

    case 'joggers':
    case 'cargopants': {
      const pantL = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.2, 2.2, 24), mat);
      pantL.position.set(-0.35, -1.1, 0);
      const pantR = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.2, 2.2, 24), mat);
      pantR.position.set(0.35, -1.1, 0);
      group.add(pantL, pantR);
      break;
    }

    case 'shoes':
    case 'jordan':
    case 'zoomx':
    case 'cleats':
    case 'hightop': {
      const soleMesh = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.35, 2.6), accentMatLocal);
      soleMesh.position.set(0, -0.6, 0.05);

      const upperMesh = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.75, 2.3), mat);
      upperMesh.position.set(0, -0.1, 0.05);

      group.add(soleMesh, upperMesh);
      break;
    }

    case 'bag':
    case 'backpack': {
      const bagMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 2.5, 32), mat);
      bagMesh.rotateZ(Math.PI / 2);
      group.add(bagMesh);
      break;
    }

    case 'airpods': {
      const caseMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 0.6), mat);
      group.add(caseMesh);
      break;
    }

    case 'cap': {
      const capDome = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), mat);
      group.add(capDome);
      break;
    }

    default: {
      const defaultBody = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.75, 2.3, 32), mat);
      group.add(defaultBody);
      break;
    }
  }

  return group;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  const [selectedGarment, setSelectedGarment] = useState(GARMENT_TYPES[0]);
  const [targetGender, setTargetGender] = useState('All');
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedPattern, setSelectedPattern] = useState(PATTERNS[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [customText, setCustomText] = useState('NIKE PRO');
  const [jerseyNumber, setJerseyNumber] = useState('23');
  const [fontStyle, setFontStyle] = useState(FONTS[0].id);
  const [textPosition, setTextPosition] = useState('chest');
  const [textColor, setTextColor] = useState('#ffffff');
  const [showMannequin, setShowMannequin] = useState(true);

  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [logoImageObj, setLogoImageObj] = useState(null);
  const [selectedPresetLogo, setSelectedPresetLogo] = useState(PRESET_LOGOS[0]);
  const [logoScale, setLogoScale] = useState(1);
  const [logoRotation, setLogoRotation] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(1);

  const [activeTab, setActiveTab] = useState('customize');
  const [cameraView, setCameraView] = useState('front');
  const [isTurntableActive, setIsTurntableActive] = useState(false);
  const [mainViewMode, setMainViewMode] = useState('studio');

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGpsOpen, setIsGpsOpen] = useState(false);
  const [gpsLocation, setGpsLocation] = useState('Detecting current location...');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [policyType, setPolicyType] = useState('privacy');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBackgroundLightOn, setIsBackgroundLightOn] = useState(false);

  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const garmentGroupRef = useRef(null);
  const rendererRef = useRef(null);

  const totalPrice = useMemo(() => {
    let extra = 0;
    if (customText.trim()) extra += 499;
    if (jerseyNumber.trim()) extra += 499;
    if (uploadedLogo || selectedPresetLogo) extra += 799;
    if (selectedPattern.id !== 'none') extra += 699;
    if (selectedMaterial.id === 'nylon') extra += 1299;
    return selectedGarment.basePrice + extra;
  }, [selectedGarment, customText, jerseyNumber, uploadedLogo, selectedPresetLogo, selectedPattern, selectedMaterial]);

  const triggerToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail) return;
    setUser({ name: authName || authEmail.split('@')[0] || 'Athlete', email: authEmail });
    setIsAuthOpen(false);
    triggerToast(authMode === 'login' ? `Welcome back, ${authEmail.split('@')[0]}!` : 'Account created & verified successfully!');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const newRev = {
      id: Date.now(),
      name: user ? user.name : 'Verified Customer',
      location: 'India',
      rating: newReviewRating,
      date: 'Just now',
      verified: true,
      product: selectedGarment.name,
      comment: newReviewText,
      avatar: '⭐',
      helpful: 0,
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewText('');
    triggerToast('Thank you for your review!');
  };

  const handleViewChange = (view) => {
    setCameraView(view);
    if (view === 'turntable') {
      setIsTurntableActive(true);
      return;
    }
    setIsTurntableActive(false);

    if (!cameraRef.current || !controlsRef.current || !garmentGroupRef.current) return;
    garmentGroupRef.current.rotation.y = 0;
    const cam = cameraRef.current;

    switch (view) {
      case 'front': cam.position.set(0, 0.5, 5.5); break;
      case 'back': cam.position.set(0, 0.5, -5.5); break;
      case 'left': cam.position.set(-5.5, 0.5, 0); break;
      case 'right': cam.position.set(5.5, 0.5, 0); break;
      case 'top': cam.position.set(0, 6.0, 0.1); break;
      default: break;
    }
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setLogoImageObj(img);
        setUploadedLogo(event.target.result);
        setSelectedPresetLogo(null);
        triggerToast('Custom brand logo uploaded!');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    const newItem = {
      id: Date.now(),
      garment: selectedGarment,
      color: selectedColor,
      material: selectedMaterial,
      pattern: selectedPattern,
      size: selectedSize,
      customText,
      jerseyNumber,
      logoName: uploadedLogo ? 'Uploaded Logo' : selectedPresetLogo?.name || 'None',
      price: totalPrice,
      quantity: 1,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    triggerToast('Added to custom shopping cart!');
  };

  const handleDetectGps = () => {
    setGpsLocation('Acquiring satellite lock in Ahmedabad, GJ...');
    setTimeout(() => {
      setGpsLocation('Ahmedabad Flagship Store • 2.4 km away (Delivery ETA: 24h)');
    }, 1200);
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  };

  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const toggleWishlist = () => {
    const exists = wishlist.some((item) => item.id === selectedGarment.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== selectedGarment.id));
      triggerToast('Item removed from wishlist');
    } else {
      setWishlist((prev) => [...prev, selectedGarment]);
      triggerToast('Item added to wishlist');
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isBackgroundLightOn ? 0xf0f0f0 : 0x020202);
    sceneRef.current = scene;

    const gridHelper = new THREE.GridHelper(30, 30, 0xFF5A00, isBackgroundLightOn ? 0xd0d0d0 : 0x1a1a1a);
    gridHelper.position.y = -1.8;
    scene.add(gridHelper);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, isBackgroundLightOn ? 1.5 : 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isBackgroundLightOn ? 2.0 : 1.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      if (garmentGroupRef.current) {
        garmentGroupRef.current.rotation.y += isTurntableActive ? 0.015 : 0.005;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isBackgroundLightOn, isTurntableActive]);

  useEffect(() => {
    if (!sceneRef.current) return;
    if (garmentGroupRef.current) {
      sceneRef.current.remove(garmentGroupRef.current);
    }

    const dynamicTexture = generateCustomTexture({
      color: selectedColor.hex,
      pattern: selectedPattern.id,
      customText,
      jerseyNumber,
      textPosition,
      textColor,
      fontStyle,
      logoImg: logoImageObj,
      presetLogo: selectedPresetLogo,
      logoScale,
      logoRotation,
      logoOpacity,
    });

    const newGarment = buildClothingMesh(selectedGarment.id, selectedMaterial, dynamicTexture);

    if (showMannequin) {
      const mannequinGroup = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.8 });
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), bodyMat);
      head.position.y = 1.85;
      mannequinGroup.add(head);
      newGarment.add(mannequinGroup);
    }

    garmentGroupRef.current = newGarment;
    sceneRef.current.add(newGarment);
  }, [
    selectedGarment,
    selectedColor,
    selectedMaterial,
    selectedPattern,
    customText,
    jerseyNumber,
    textPosition,
    textColor,
    fontStyle,
    logoImageObj,
    selectedPresetLogo,
    logoScale,
    logoRotation,
    logoOpacity,
    showMannequin,
  ]);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[#FF5A00] selection:text-black">
      {notification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-900 border border-[#FF5A00] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 backdrop-blur-md animate-bounce">
          <Zap className="w-5 h-5 text-[#FF5A00]" />
          <span className="text-xs font-bold uppercase tracking-wider">{notification}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setMainViewMode('studio')}>
          <div className="bg-[#FF5A00] text-black font-black p-2 rounded-xl text-xl w-10 h-10 flex items-center justify-center shadow-lg shadow-[#FF5A00]/30">
            ⚡
          </div>
          <div>
            <h1 className="font-black text-xl tracking-wider text-white uppercase">
              NIKE <span className="text-[#FF5A00]">3D CUSTOM LAB</span>
            </h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Official Nike Products & Customization</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
          <button onClick={() => setMainViewMode('studio')} className={`hover:text-[#FF5A00] py-1 ${mainViewMode === 'studio' ? 'text-[#FF5A00]' : 'text-zinc-400'}`}>3D Studio</button>
          <button onClick={() => setMainViewMode('showroom')} className={`hover:text-[#FF5A00] py-1 ${mainViewMode === 'showroom' ? 'text-[#FF5A00]' : 'text-zinc-400'}`}>Showroom</button>
          <button onClick={() => setMainViewMode('reviews')} className={`hover:text-[#FF5A00] py-1 ${mainViewMode === 'reviews' ? 'text-[#FF5A00]' : 'text-zinc-400'}`}>Reviews</button>
        </nav>

        <div className="flex items-center space-x-3">
          <button onClick={() => setIsSearchOpen(true)} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2 text-xs">
            <Search className="w-4 h-4 text-[#FF5A00]" />
            <span className="hidden sm:inline">Search...</span>
          </button>
          <button onClick={() => { setIsGpsOpen(true); handleDetectGps(); }} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
            <MapPin className="w-4 h-4 text-[#FF5A00]" />
          </button>
          <button onClick={() => setIsAuthOpen(true)} className="flex items-center space-x-2 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 rounded-xl">
            <User className="w-4 h-4 text-[#FF5A00]" />
            <span>{user ? user.name : 'Sign In'}</span>
          </button>
          <button onClick={toggleWishlist} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-500">
            <Heart className={`w-4 h-4 ${wishlist.some((i) => i.id === selectedGarment.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button onClick={() => setIsCartOpen(true)} className="flex items-center space-x-2 bg-[#FF5A00] text-black font-black px-4 py-2.5 rounded-xl text-xs uppercase shadow-lg shadow-[#FF5A00]/20">
            <ShoppingBag className="w-4 h-4" />
            <span>Cart ({cart.reduce((a, c) => a + c.quantity, 0)})</span>
          </button>
        </div>
      </header>

      {/* VIEW RENDERER */}
      {mainViewMode === 'reviews' ? (
        <main className="max-w-6xl mx-auto py-12 px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#FF5A00] uppercase tracking-widest">Verified Customer Feedback</span>
            <h2 className="text-4xl font-black text-white uppercase">Athlete Reviews & Ratings</h2>
          </div>
          <form onSubmit={handleAddReview} className="bg-zinc-950 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-black text-white uppercase">Write a Customer Review</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-zinc-400">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setNewReviewRating(star)} className="p-1">
                  <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-[#FF5A00] text-[#FF5A00]' : 'text-zinc-700'}`} />
                </button>
              ))}
            </div>
            <textarea rows={3} value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} placeholder="Share your experience..." className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-[#FF5A00]" />
            <button type="submit" className="bg-[#FF5A00] text-black font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider">Submit Review</button>
          </form>
          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="bg-zinc-950 border border-zinc-800 p-6 rounded-3xl space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">{rev.avatar}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <p className="text-[10px] text-zinc-500">{rev.location} • {rev.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FF5A00] text-[#FF5A00]" />)}
                  </div>
                </div>
                <p className="text-sm text-zinc-300">{rev.comment}</p>
              </div>
            ))}
          </div>
        </main>
      ) : mainViewMode === 'showroom' ? (
        <main className="max-w-7xl mx-auto py-12 px-6 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-[#FF5A00] uppercase tracking-widest">Complete Catalog</span>
              <h2 className="text-3xl font-black text-white uppercase">Nike 3D Product Showroom</h2>
            </div>
            <div className="flex gap-1 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
              {['All', 'Men', 'Women'].map((g) => (
                <button key={g} onClick={() => setTargetGender(g)} className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${targetGender === g ? 'bg-[#FF5A00] text-black' : 'text-zinc-400'}`}>{g}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GARMENT_TYPES.filter((item) => targetGender === 'All' || item.gender === targetGender || item.gender === 'Unisex').map((prod) => (
              <div key={prod.id} onClick={() => { setSelectedGarment(prod); setMainViewMode('studio'); }} className="bg-zinc-950 border border-zinc-800 hover:border-[#FF5A00] rounded-3xl p-6 space-y-4 cursor-pointer group transition flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-zinc-900 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{prod.category}</span>
                  <span className="text-2xl">{prod.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase group-hover:text-[#FF5A00]">{prod.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{prod.gender} • Fully 3D Customizable</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-900">
                  <span className="text-base font-black text-[#FF5A00]">₹{prod.basePrice.toLocaleString('en-IN')}</span>
                  <span className="bg-[#FF5A00]/10 text-[#FF5A00] px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1 group-hover:bg-[#FF5A00] group-hover:text-black">
                    Customize <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <main className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
          <div className="lg:col-span-8 relative bg-black flex flex-col justify-between min-h-[500px]">
            <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab" />
            <div className="relative z-10 p-6 flex justify-between items-start">
              <span className="bg-[#FF5A00]/10 text-[#FF5A00] border border-[#FF5A00]/30 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase">Live WebGL 3D Studio</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsBackgroundLightOn(!isBackgroundLightOn)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${isBackgroundLightOn ? 'bg-amber-400 text-black border-amber-500' : 'bg-zinc-900 text-zinc-300 border-zinc-800'}`}>
                  BG Light: {isBackgroundLightOn ? 'ON ☀️' : 'OFF 🌙'}
                </button>
                <button onClick={() => setShowMannequin(!showMannequin)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${showMannequin ? 'bg-[#FF5A00] text-black border-[#FF5A00]' : 'bg-zinc-900 text-zinc-300 border-zinc-800'}`}>
                  Mannequin: {showMannequin ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
            <div className="relative z-10 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 bg-black/85 border border-zinc-800 p-1.5 rounded-2xl backdrop-blur-md">
                {['front', 'back', 'left', 'right', 'top', 'turntable'].map((v) => (
                  <button key={v} onClick={() => handleViewChange(v)} className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase ${cameraView === v ? 'bg-[#FF5A00] text-black' : 'text-zinc-400 hover:text-white'}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-black p-6 overflow-y-auto max-h-[calc(100vh-73px)] space-y-6 flex flex-col justify-between border-l border-zinc-900">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#FF5A00] uppercase font-bold tracking-widest">Official Nike Gear</span>
                <h2 className="text-2xl font-black text-white uppercase">{selectedGarment.name}</h2>
                <div className="text-2xl font-black text-[#FF5A00] mt-1">₹{totalPrice.toLocaleString('en-IN')}</div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-zinc-400 mb-2 block">Select Product Catalog</label>
                <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                  {GARMENT_TYPES.map((item) => (
                    <button key={item.id} onClick={() => setSelectedGarment(item)} className={`p-3 rounded-2xl border text-left flex items-center space-x-2 ${selectedGarment.id === item.id ? 'border-[#FF5A00] bg-[#FF5A00]/10 text-white' : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'}`}>
                      <span className="text-lg">{item.icon}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold truncate">{item.name}</div>
                        <div className="text-[10px] text-[#FF5A00]">₹{item.basePrice.toLocaleString('en-IN')}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-1 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
                {[
                  { id: 'customize', label: 'Color', icon: Palette },
                  { id: 'logo', label: 'Logo', icon: ImageIcon },
                  { id: 'decal', label: 'Print', icon: TypeIcon },
                  { id: 'details', label: 'Specs', icon: SlidersHorizontal },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center py-2 rounded-xl text-[10px] font-bold ${activeTab === tab.id ? 'bg-[#FF5A00] text-black' : 'text-zinc-400'}`}>
                      <IconComp className="w-4 h-4 mb-1" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'customize' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase text-zinc-400 mb-2 block">Color Theme</label>
                    <div className="grid grid-cols-5 gap-2.5">
                      {COLOR_PALETTE.map((col) => (
                        <button key={col.id} onClick={() => setSelectedColor(col)} className={`h-9 rounded-xl border-2 ${selectedColor.id === col.id ? 'border-[#FF5A00] scale-110' : 'border-zinc-800'}`} style={{ backgroundColor: col.hex }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-zinc-400 mb-2 block">Select Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {MEN_SIZES.map((sz) => (
                        <button key={sz} onClick={() => setSelectedSize(sz)} className={`py-2.5 rounded-xl border text-xs font-bold ${selectedSize === sz ? 'border-[#FF5A00] bg-[#FF5A00]/10 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}>{sz}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'logo' && (
                <div className="space-y-6">
                  <label className="border-2 border-dashed border-zinc-800 hover:border-[#FF5A00] bg-zinc-900 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-6 h-6 text-zinc-500 mb-2" />
                    <span className="text-xs font-bold text-white">Click to upload Brand Logo</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESET_LOGOS.map((pl) => (
                      <button key={pl.id} onClick={() => { setSelectedPresetLogo(pl); setUploadedLogo(null); }} className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 ${selectedPresetLogo?.id === pl.id ? 'border-[#FF5A00] bg-[#FF5A00]/10 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}>
                        <span className="text-xl">{pl.symbol}</span>
                        <span className="text-[10px]">{pl.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'decal' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">Custom Text</label>
                    <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A00]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">Jersey Number</label>
                    <input type="text" value={jerseyNumber} onChange={(e) => setJerseyNumber(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A00]" />
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase">Material Texture</h4>
                  <div className="space-y-2">
                    {MATERIALS.map((mat) => (
                      <button key={mat.id} onClick={() => setSelectedMaterial(mat)} className={`w-full text-left p-3 rounded-2xl border text-xs font-bold flex justify-between items-center ${selectedMaterial.id === mat.id ? 'border-[#FF5A00] bg-[#FF5A00]/10 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}>
                        <span>{mat.name}</span>
                        {selectedMaterial.id === mat.id && <CheckCircle2 className="w-4 h-4 text-[#FF5A00]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-900 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Legal:</span>
                <div className="space-x-3">
                  <button onClick={() => { setPolicyType('privacy'); setIsPolicyOpen(true); }} className="text-[#FF5A00] hover:underline">Privacy Policy</button>
                  <button onClick={() => { setPolicyType('terms'); setIsPolicyOpen(true); }} className="text-[#FF5A00] hover:underline">Terms</button>
                </div>
              </div>
              <button onClick={handleAddToCart} className="w-full bg-[#FF5A00] hover:bg-[#e04f00] text-black py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-[#FF5A00]/25 flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Add to Cart • ₹{totalPrice.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* MODALS & DRAWERS */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-white uppercase">{authMode === 'login' ? 'Sign In' : 'Register'}</h3>
              <button onClick={() => setIsAuthOpen(false)} className="hover:text-[#FF5A00]"><X className="w-6 h-6 text-zinc-400" /></button>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <input type="text" required value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Full Name" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white" />
              )}
              <input type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="athlete@nike.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white" />
              <input type="password" required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Password" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white" />
              <button type="submit" className="w-full bg-[#FF5A00] text-black font-black py-3.5 rounded-2xl text-xs uppercase shadow-lg shadow-[#FF5A00]/20">{authMode === 'login' ? 'Sign In' : 'Register'}</button>
            </form>
            <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="w-full text-center text-xs text-zinc-400 hover:text-[#FF5A00]">
              {authMode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      )}

      {isGpsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-white uppercase flex items-center gap-2"><MapPin className="text-[#FF5A00]" /> GPS Store Locator</h3>
              <button onClick={() => setIsGpsOpen(false)}><X className="w-6 h-6 text-zinc-400" /></button>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-2">
              <Navigation className="w-8 h-8 text-[#FF5A00] mx-auto animate-pulse" />
              <p className="text-xs text-[#FF5A00] font-mono">{gpsLocation}</p>
            </div>
            <button onClick={() => setIsGpsOpen(false)} className="w-full bg-[#FF5A00] text-black font-black py-3.5 rounded-2xl text-xs uppercase">Confirm Location</button>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 backdrop-blur-md pt-24 p-6">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <Search className="w-5 h-5 text-[#FF5A00]" />
              <input type="text" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Nike products..." className="w-full bg-transparent text-sm text-white focus:outline-none" />
              <button onClick={() => setIsSearchOpen(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {GARMENT_TYPES.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((prod) => (
                <div key={prod.id} onClick={() => { setSelectedGarment(prod); setIsSearchOpen(false); setSearchQuery(''); }} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{prod.icon}</span>
                    <h4 className="text-xs font-bold text-white">{prod.name}</h4>
                  </div>
                  <span className="text-xs font-black text-[#FF5A00]">₹{prod.basePrice.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isPolicyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-white uppercase">{policyType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</h3>
              <button onClick={() => setIsPolicyOpen(false)}><X className="w-6 h-6 text-zinc-400" /></button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {policyType === 'privacy' ? 'Welcome to Nike 3D Custom Lab. Your privacy is critically important. We protect all user credentials, customization details, and personal data under secure encryption protocols.' : 'By placing an order on Nike 3D Custom Lab, you agree to our terms. Custom personalized items are final sale unless defective upon arrival.'}
            </p>
            <button onClick={() => setIsPolicyOpen(false)} className="w-full bg-[#FF5A00] text-black font-black py-3 rounded-2xl text-xs uppercase">Close</button>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-white uppercase">Secure Payment System</h3>
              <button onClick={() => setIsCheckoutOpen(false)}><X className="w-6 h-6 text-zinc-400" /></button>
            </div>
            <div className="space-y-3">
              {[
                { id: 'upi', name: 'UPI (Google Pay / PhonePe)', icon: QrCode },
                { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                { id: 'cod', name: 'Cash on Delivery', icon: Truck },
              ].map((m) => {
                const IconC = m.icon;
                return (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`w-full p-3.5 rounded-2xl border text-left flex items-center space-x-3 ${paymentMethod === m.id ? 'border-[#FF5A00] bg-[#FF5A00]/10 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400'}`}>
                    <IconC className={`w-5 h-5 ${paymentMethod === m.id ? 'text-[#FF5A00]' : 'text-zinc-500'}`} />
                    <span className="text-xs font-bold">{m.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="bg-zinc-900 p-4 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-400">Total:</span>
              <span className="text-base font-black text-[#FF5A00]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <button onClick={() => { setIsCheckoutOpen(false); setCart([]); triggerToast('Order placed successfully!'); }} className="w-full bg-[#FF5A00] text-black font-black py-4 rounded-2xl text-xs uppercase shadow-xl shadow-[#FF5A00]/20">Confirm Order</button>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-900 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white uppercase">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6 text-zinc-400" /></button>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.garment.name}</h4>
                    <p className="text-[10px] text-zinc-400">Size: {item.size} • Qty: {item.quantity}</p>
                    <p className="text-xs text-[#FF5A00] font-black mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                  <button onClick={() => updateCartQuantity(item.id, -1)} className="p-2 hover:bg-zinc-800 rounded-lg"><Trash2 className="w-4 h-4 text-zinc-500 hover:text-red-400" /></button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-900">
                <div className="flex justify-between text-sm font-bold">
                  <span>Subtotal</span>
                  <span className="text-[#FF5A00]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} className="w-full bg-[#FF5A00] text-black font-black py-4 rounded-2xl text-xs uppercase shadow-lg shadow-[#FF5A00]/20">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}