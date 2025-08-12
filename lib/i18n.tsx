"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Locale = "en" | "ar"
type Direction = "ltr" | "rtl"

interface I18nContextType {
  locale: Locale
  direction: Direction
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    "nav.electronics": "Electronics",
    "nav.fashion": "Fashion",
    "nav.home-garden": "Home & Garden",
    "nav.search": "Search",
    "nav.signin": "Sign In",
    "nav.signup": "Sign Up",
    "nav.account": "My Account",
    "nav.orders": "Orders",
    "nav.wishlist": "Wishlist",
    "nav.signout": "Sign Out",
    "nav.cart": "Cart",

    // Homepage
    "home.hero.title": "Discover Amazing Products.",
    "home.hero.subtitle": "Shop with Confidence.",
    "home.hero.description":
      "Your one-stop destination for quality products, exceptional service, and unbeatable prices.",
    "home.hero.shop-now": "Shop Now",
    "home.hero.browse-collections": "Browse Collections",
    "home.hero.free-shipping": "Free shipping over $50",
    "home.hero.returns": "30-day returns",

    "home.collections.title": "Featured Collections",
    "home.collections.description": "Discover our curated selection of premium products across various categories.",
    "home.collections.electronics": "Electronics",
    "home.collections.electronics.desc": "Latest gadgets and tech essentials for modern living.",
    "home.collections.fashion": "Fashion",
    "home.collections.fashion.desc": "Trendy clothing and accessories for every style.",
    "home.collections.home-garden": "Home & Garden",
    "home.collections.home-garden.desc": "Beautiful items to make your house a home.",
    "home.collections.shop": "Shop",

    "home.why-choose.title": "Why Choose Us",
    "home.why-choose.description": "Experience the difference with our commitment to excellence",
    "home.why-choose.shipping.title": "Fast & Free Shipping",
    "home.why-choose.shipping.desc": "Free shipping on orders over $50. Express delivery available.",
    "home.why-choose.secure.title": "Secure Shopping",
    "home.why-choose.secure.desc": "Your data is protected with industry-leading security measures.",
    "home.why-choose.support.title": "24/7 Support",
    "home.why-choose.support.desc": "Our customer service team is here to help you anytime.",

    "home.newsletter.title": "Stay in the Loop",
    "home.newsletter.description":
      "Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration.",
    "home.newsletter.placeholder": "Enter your email",
    "home.newsletter.subscribe": "Subscribe",

    // Authentication
    "auth.signin.title": "Welcome back",
    "auth.signin.description": "Sign in to your account to continue shopping",
    "auth.signin.email": "Email",
    "auth.signin.password": "Password",
    "auth.signin.remember": "Remember me",
    "auth.signin.forgot": "Forgot your password?",
    "auth.signin.submit": "Sign In",
    "auth.signin.signup-link": "Don't have an account? Sign up",

    "auth.signup.title": "Create your account",
    "auth.signup.description": "Join ShopHub and start shopping today",
    "auth.signup.name": "Full Name",
    "auth.signup.email": "Email",
    "auth.signup.password": "Password",
    "auth.signup.confirm-password": "Confirm Password",
    "auth.signup.terms": "I agree to the Terms and Conditions and Privacy Policy",
    "auth.signup.submit": "Create Account",
    "auth.signup.signin-link": "Already have an account? Sign in",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.empty.description": "Looks like you haven't added anything to your cart yet.",
    "cart.continue-shopping": "Continue Shopping",
    "cart.items": "items in your cart",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.tax": "Tax",
    "cart.total": "Total",
    "cart.free-shipping": "Free shipping on orders over $50",
    "cart.checkout": "Proceed to Checkout",
    "cart.add-to-cart": "Add to Cart",
    "cart.out-of-stock": "Out of Stock",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.price": "Price",
    "common.rating": "Rating",
    "common.reviews": "Reviews",
    "common.new": "New",
    "common.sale": "Sale",
  },
  ar: {
    // Navigation
    "nav.electronics": "الإلكترونيات",
    "nav.fashion": "الأزياء",
    "nav.home-garden": "المنزل والحديقة",
    "nav.search": "البحث",
    "nav.signin": "تسجيل الدخول",
    "nav.signup": "إنشاء حساب",
    "nav.account": "حسابي",
    "nav.orders": "الطلبات",
    "nav.wishlist": "المفضلة",
    "nav.signout": "تسجيل الخروج",
    "nav.cart": "السلة",

    // Homepage
    "home.hero.title": "اكتشف منتجات مذهلة.",
    "home.hero.subtitle": "تسوق بثقة.",
    "home.hero.description": "وجهتك الشاملة للمنتجات عالية الجودة والخدمة الاستثنائية والأسعار التي لا تُقاوم.",
    "home.hero.shop-now": "تسوق الآن",
    "home.hero.browse-collections": "تصفح المجموعات",
    "home.hero.free-shipping": "شحن مجاني للطلبات أكثر من 50 دولار",
    "home.hero.returns": "إرجاع خلال 30 يوم",

    "home.collections.title": "المجموعات المميزة",
    "home.collections.description": "اكتشف مجموعتنا المختارة من المنتجات المميزة عبر فئات متنوعة.",
    "home.collections.electronics": "الإلكترونيات",
    "home.collections.electronics.desc": "أحدث الأجهزة والتقنيات الأساسية للحياة العصرية.",
    "home.collections.fashion": "الأزياء",
    "home.collections.fashion.desc": "ملابس وإكسسوارات عصرية لكل الأذواق.",
    "home.collections.home-garden": "المنزل والحديقة",
    "home.collections.home-garden.desc": "قطع جميلة لتجعل منزلك أكثر دفئاً.",
    "home.collections.shop": "تسوق",

    "home.why-choose.title": "لماذا تختارنا",
    "home.why-choose.description": "اختبر الفرق مع التزامنا بالتميز",
    "home.why-choose.shipping.title": "شحن سريع ومجاني",
    "home.why-choose.shipping.desc": "شحن مجاني للطلبات أكثر من 50 دولار. توصيل سريع متاح.",
    "home.why-choose.secure.title": "تسوق آمن",
    "home.why-choose.secure.desc": "بياناتك محمية بأحدث معايير الأمان.",
    "home.why-choose.support.title": "دعم على مدار الساعة",
    "home.why-choose.support.desc": "فريق خدمة العملاء متاح لمساعدتك في أي وقت.",

    "home.newsletter.title": "ابق على اطلاع",
    "home.newsletter.description": "اشترك في نشرتنا الإخبارية للحصول على عروض حصرية ومنتجات جديدة وإلهام الأناقة.",
    "home.newsletter.placeholder": "أدخل بريدك الإلكتروني",
    "home.newsletter.subscribe": "اشتراك",

    // Authentication
    "auth.signin.title": "مرحباً بعودتك",
    "auth.signin.description": "سجل دخولك إلى حسابك لمتابعة التسوق",
    "auth.signin.email": "البريد الإلكتروني",
    "auth.signin.password": "كلمة المرور",
    "auth.signin.remember": "تذكرني",
    "auth.signin.forgot": "نسيت كلمة المرور؟",
    "auth.signin.submit": "تسجيل الدخول",
    "auth.signin.signup-link": "ليس لديك حساب؟ أنشئ حساب",

    "auth.signup.title": "أنشئ حسابك",
    "auth.signup.description": "انضم إلى ShopHub وابدأ التسوق اليوم",
    "auth.signup.name": "الاسم الكامل",
    "auth.signup.email": "البريد الإلكتروني",
    "auth.signup.password": "كلمة المرور",
    "auth.signup.confirm-password": "تأكيد كلمة المرور",
    "auth.signup.terms": "أوافق على الشروط والأحكام وسياسة الخصوصية",
    "auth.signup.submit": "إنشاء حساب",
    "auth.signup.signin-link": "لديك حساب بالفعل؟ سجل دخولك",

    // Cart
    "cart.title": "سلة التسوق",
    "cart.empty": "سلتك فارغة",
    "cart.empty.description": "يبدو أنك لم تضف أي شيء إلى سلتك بعد.",
    "cart.continue-shopping": "متابعة التسوق",
    "cart.items": "عناصر في سلتك",
    "cart.subtotal": "المجموع الفرعي",
    "cart.shipping": "الشحن",
    "cart.tax": "الضريبة",
    "cart.total": "المجموع",
    "cart.free-shipping": "شحن مجاني للطلبات أكثر من 50 دولار",
    "cart.checkout": "إتمام الطلب",
    "cart.add-to-cart": "أضف إلى السلة",
    "cart.out-of-stock": "غير متوفر",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.edit": "تعديل",
    "common.delete": "حذف",
    "common.close": "إغلاق",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.sort": "ترتيب",
    "common.price": "السعر",
    "common.rating": "التقييم",
    "common.reviews": "المراجعات",
    "common.new": "جديد",
    "common.sale": "تخفيض",
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    // Load locale from localStorage
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale) setLocale(savedLocale)
  }, [])

  useEffect(() => {
    // Apply direction to document
    const direction: Direction = locale === "ar" ? "rtl" : "ltr"
    document.documentElement.dir = direction
    document.documentElement.lang = locale

    // Save to localStorage
    localStorage.setItem("locale", locale)
  }, [locale])

  const direction: Direction = locale === "ar" ? "rtl" : "ltr"

  const t = (key: string): string => {
    return translations[locale][key as keyof (typeof translations)[typeof locale]] || key
  }

  return <I18nContext.Provider value={{ locale, direction, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
