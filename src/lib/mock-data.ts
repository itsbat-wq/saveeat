// ============================================================
// SaveEat - Comprehensive Mock Data for Demo/Presentation
// ============================================================

import {
  User,
  Merchant,
  MysteryBag,
  Order,
  Review,
  Favorite,
  Notification,
  ImpactStats,
  Badge,
  UserStats,
  MerchantAnalytics,
  DailyStats,
  MockMerchant,
} from "@/types";

// -------------------------------------------------------
// Demo Credentials
// -------------------------------------------------------

export const DEMO_CREDENTIALS = {
  student: { email: "student@saveeat.id", password: "demo1234" },
  merchant: { email: "merchant@saveeat.id", password: "demo1234" },
};

// -------------------------------------------------------
// Mock Users
// -------------------------------------------------------

export const MOCK_USERS: User[] = [
  {
    id: "user-student-001",
    email: "student@saveeat.id",
    name: "Ariel Mahasiswa",
    role: "student",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ariel",
    created_at: "2024-01-15T08:00:00Z",
  },
  {
    id: "user-student-002",
    email: "budi@saveeat.id",
    name: "Budi Santoso",
    role: "student",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    created_at: "2024-01-20T09:30:00Z",
  },
  {
    id: "user-student-003",
    email: "sari@saveeat.id",
    name: "Sari Dewi",
    role: "student",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sari",
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "user-merchant-001",
    email: "merchant@saveeat.id",
    name: "Pemilik Kopi Kenangan",
    role: "merchant",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Merchant",
    created_at: "2024-01-10T07:00:00Z",
  },
];

// -------------------------------------------------------
// Mock Merchants
// -------------------------------------------------------

export const MOCK_MERCHANTS: MockMerchant[] = [
  {
    id: "merchant-001",
    user_id: "user-merchant-001",
    store_name: "Kopi Kenangan Kampus",
    store_description:
      "Kopi susu kekinian dengan cita rasa premium. Tersedia berbagai pilihan minuman kopi, teh, dan snack. Mystery Bag kami berisi minuman + pastri eksklusif senilai jauh lebih tinggi!",
    store_image_url:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    address: "Jl. Raya Kampus No. 12, Depok",
    distance_from_campus: "400m",
    latitude: -6.3612,
    longitude: 106.8227,
    operating_hours: "08:00 - 21:00",
    rating: 4.8,
    total_reviews: 234,
    is_active: true,
    created_at: "2024-01-10T07:00:00Z",
    mystery_bag: {} as MysteryBag,
    tags: ["Kopi", "Minuman", "Pastri", "Snack"],
    food_types: ["Minuman Kopi", "Teh", "Pastri", "Sandwich"],
    image_hint: "coffee shop modern",
  },
  {
    id: "merchant-002",
    user_id: "user-merchant-002",
    store_name: "Roti'O Bakery",
    store_description:
      "Bakery premium dengan aneka roti, kue, dan pastri segar setiap hari. Mystery Bag berisi assorted roti dan kue yang dipanggang hari ini!",
    store_image_url:
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
    address: "Jl. Margonda Raya No. 45, Depok",
    distance_from_campus: "650m",
    latitude: -6.3725,
    longitude: 106.8341,
    operating_hours: "07:00 - 20:30",
    rating: 4.5,
    total_reviews: 187,
    is_active: true,
    created_at: "2024-01-12T06:00:00Z",
    mystery_bag: {} as MysteryBag,
    tags: ["Bakery", "Roti", "Kue", "Pastri"],
    food_types: ["Roti", "Croissant", "Kue", "Bun"],
    image_hint: "bakery bread pastry",
  },
  {
    id: "merchant-003",
    user_id: "user-merchant-003",
    store_name: "Warung Steak Abang",
    store_description:
      "Steak lokal dengan cita rasa internasional. Daging segar, saus spesial, dan side dish lezat. Mystery Bag berisi steak set lengkap!",
    store_image_url:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    address: "Jl. Beji No. 8, Depok",
    distance_from_campus: "300m",
    latitude: -6.3598,
    longitude: 106.8198,
    operating_hours: "11:00 - 21:00",
    rating: 4.7,
    total_reviews: 312,
    is_active: true,
    created_at: "2024-01-08T10:00:00Z",
    mystery_bag: {} as MysteryBag,
    tags: ["Steak", "Western", "Daging", "Makan Besar"],
    food_types: ["Steak", "Nasi", "Kentang Goreng", "Salad"],
    image_hint: "steak restaurant food",
  },
  {
    id: "merchant-004",
    user_id: "user-merchant-004",
    store_name: "Tous Les Jours",
    store_description:
      "Bakery & Café asal Korea dengan pastri premium, kue ulang tahun, dan minuman specialty. Mystery Bag berisi assorted pastri Korea eksklusif!",
    store_image_url:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80",
    address: "Jl. Margonda Raya No. 100, Depok",
    distance_from_campus: "1.2km",
    latitude: -6.3801,
    longitude: 106.829,
    operating_hours: "09:00 - 22:00",
    rating: 4.9,
    total_reviews: 521,
    is_active: true,
    created_at: "2024-01-05T08:00:00Z",
    mystery_bag: {} as MysteryBag,
    tags: ["Korean", "Bakery", "Kue", "Premium"],
    food_types: ["Croissant", "Kue Korea", "Pastri", "Minuman"],
    image_hint: "korean bakery cafe premium",
  },
  {
    id: "merchant-005",
    user_id: "user-merchant-005",
    store_name: "Janji Jiwa Coffee",
    store_description:
      'Kopi Indonesia dengan konsep "Jiwa yang Baik". Biji kopi pilihan nusantara dengan harga terjangkau. Mystery Bag berisi kopi + jajanan lokal!',
    store_image_url:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    address: "Jl. Kenanga No. 5, Depok",
    distance_from_campus: "500m",
    latitude: -6.3654,
    longitude: 106.8251,
    operating_hours: "08:00 - 21:30",
    rating: 4.6,
    total_reviews: 298,
    is_active: true,
    created_at: "2024-01-14T07:30:00Z",
    mystery_bag: {} as MysteryBag,
    tags: ["Kopi Lokal", "Indonesia", "Snack", "Terjangkau"],
    food_types: ["Kopi", "Minuman Susu", "Snack Lokal", "Roti"],
    image_hint: "coffee local Indonesia",
  },
  {
    id: "merchant-006",
    user_id: "user-merchant-006",
    store_name: "Pizza Hut Kampus",
    store_description:
      "Pizza legendaris dengan berbagai topping premium. Mystery Bag berisi 1 pizza medium + minuman + dessert dengan nilai hebat!",
    store_image_url:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    address: "Jl. Raya Kampus No. 55, Depok",
    distance_from_campus: "800m",
    latitude: -6.3745,
    longitude: 106.8312,
    operating_hours: "10:00 - 22:00",
    rating: 4.3,
    total_reviews: 156,
    is_active: true,
    created_at: "2024-02-01T09:00:00Z",
    mystery_bag: {} as MysteryBag,
    tags: ["Pizza", "Fast Food", "Italia", "Keluarga"],
    food_types: ["Pizza", "Pasta", "Minuman", "Dessert"],
    image_hint: "pizza restaurant italian",
  },
];

// -------------------------------------------------------
// Mock Mystery Bags
// -------------------------------------------------------

export const MOCK_MYSTERY_BAGS: MysteryBag[] = [
  {
    id: "bag-001",
    merchant_id: "merchant-001",
    original_price: 45000,
    discount_price: 15000,
    discount_percentage: 67,
    stock_available: 3,
    pickup_start_time: "20:00",
    pickup_end_time: "21:00",
    status: "available",
    created_at: new Date().toISOString(),
    merchant: MOCK_MERCHANTS[0],
  },
  {
    id: "bag-002",
    merchant_id: "merchant-002",
    original_price: 60000,
    discount_price: 20000,
    discount_percentage: 67,
    stock_available: 5,
    pickup_start_time: "19:30",
    pickup_end_time: "20:30",
    status: "available",
    created_at: new Date().toISOString(),
    merchant: MOCK_MERCHANTS[1],
  },
  {
    id: "bag-003",
    merchant_id: "merchant-003",
    original_price: 50000,
    discount_price: 18000,
    discount_percentage: 64,
    stock_available: 2,
    pickup_start_time: "20:00",
    pickup_end_time: "21:00",
    status: "available",
    created_at: new Date().toISOString(),
    merchant: MOCK_MERCHANTS[2],
  },
  {
    id: "bag-004",
    merchant_id: "merchant-004",
    original_price: 80000,
    discount_price: 25000,
    discount_percentage: 69,
    stock_available: 4,
    pickup_start_time: "21:00",
    pickup_end_time: "22:00",
    status: "available",
    created_at: new Date().toISOString(),
    merchant: MOCK_MERCHANTS[3],
  },
  {
    id: "bag-005",
    merchant_id: "merchant-005",
    original_price: 40000,
    discount_price: 12000,
    discount_percentage: 70,
    stock_available: 6,
    pickup_start_time: "20:30",
    pickup_end_time: "21:30",
    status: "available",
    created_at: new Date().toISOString(),
    merchant: MOCK_MERCHANTS[4],
  },
  {
    id: "bag-006",
    merchant_id: "merchant-006",
    original_price: 95000,
    discount_price: 30000,
    discount_percentage: 68,
    stock_available: 0,
    pickup_start_time: "21:00",
    pickup_end_time: "22:00",
    status: "sold_out",
    created_at: new Date().toISOString(),
    merchant: MOCK_MERCHANTS[5],
  },
];

// Attach bags to merchants
MOCK_MERCHANTS[0].mystery_bag = MOCK_MYSTERY_BAGS[0];
MOCK_MERCHANTS[1].mystery_bag = MOCK_MYSTERY_BAGS[1];
MOCK_MERCHANTS[2].mystery_bag = MOCK_MYSTERY_BAGS[2];
MOCK_MERCHANTS[3].mystery_bag = MOCK_MYSTERY_BAGS[3];
MOCK_MERCHANTS[4].mystery_bag = MOCK_MYSTERY_BAGS[4];
MOCK_MERCHANTS[5].mystery_bag = MOCK_MYSTERY_BAGS[5];

// -------------------------------------------------------
// Mock Orders
// -------------------------------------------------------

export const MOCK_ORDERS: Order[] = [
  {
    id: "order-001",
    user_id: "user-student-001",
    mystery_bag_id: "bag-001",
    merchant_id: "merchant-001",
    quantity: 1,
    total_price: 15000,
    commission_amount: 2250,
    qr_code_data: JSON.stringify({
      order_id: "order-001",
      user_id: "user-student-001",
      merchant_id: "merchant-001",
      mystery_bag_id: "bag-001",
      total_price: 15000,
      timestamp: "2024-03-10T20:00:00Z",
      signature: "SE-ABCD1234",
    }),
    status: "picked_up",
    pickup_time: "2024-03-10T20:30:00Z",
    created_at: "2024-03-10T19:00:00Z",
    merchant: MOCK_MERCHANTS[0],
    mystery_bag: MOCK_MYSTERY_BAGS[0],
  },
  {
    id: "order-002",
    user_id: "user-student-001",
    mystery_bag_id: "bag-002",
    merchant_id: "merchant-002",
    quantity: 2,
    total_price: 40000,
    commission_amount: 6000,
    qr_code_data: JSON.stringify({
      order_id: "order-002",
      user_id: "user-student-001",
      merchant_id: "merchant-002",
      mystery_bag_id: "bag-002",
      total_price: 40000,
      timestamp: "2024-03-09T19:30:00Z",
      signature: "SE-EFGH5678",
    }),
    status: "picked_up",
    pickup_time: "2024-03-09T19:45:00Z",
    created_at: "2024-03-09T18:00:00Z",
    merchant: MOCK_MERCHANTS[1],
    mystery_bag: MOCK_MYSTERY_BAGS[1],
  },
  {
    id: "order-003",
    user_id: "user-student-001",
    mystery_bag_id: "bag-004",
    merchant_id: "merchant-004",
    quantity: 1,
    total_price: 25000,
    commission_amount: 3750,
    qr_code_data: JSON.stringify({
      order_id: "order-003",
      user_id: "user-student-001",
      merchant_id: "merchant-004",
      mystery_bag_id: "bag-004",
      total_price: 25000,
      timestamp: "2024-03-08T21:00:00Z",
      signature: "SE-IJKL9012",
    }),
    status: "confirmed",
    created_at: "2024-03-08T20:00:00Z",
    merchant: MOCK_MERCHANTS[3],
    mystery_bag: MOCK_MYSTERY_BAGS[3],
  },
  {
    id: "order-004",
    user_id: "user-student-001",
    mystery_bag_id: "bag-003",
    merchant_id: "merchant-003",
    quantity: 1,
    total_price: 18000,
    commission_amount: 2700,
    qr_code_data: JSON.stringify({
      order_id: "order-004",
      user_id: "user-student-001",
      merchant_id: "merchant-003",
      mystery_bag_id: "bag-003",
      total_price: 18000,
      timestamp: new Date().toISOString(),
      signature: "SE-MNOP3456",
    }),
    status: "pending",
    created_at: new Date().toISOString(),
    merchant: MOCK_MERCHANTS[2],
    mystery_bag: MOCK_MYSTERY_BAGS[2],
  },
  {
    id: "order-005",
    user_id: "user-student-001",
    mystery_bag_id: "bag-005",
    merchant_id: "merchant-005",
    quantity: 1,
    total_price: 12000,
    commission_amount: 1800,
    qr_code_data: JSON.stringify({
      order_id: "order-005",
      user_id: "user-student-001",
      merchant_id: "merchant-005",
      mystery_bag_id: "bag-005",
      total_price: 12000,
      timestamp: "2024-03-07T20:30:00Z",
      signature: "SE-QRST7890",
    }),
    status: "picked_up",
    pickup_time: "2024-03-07T20:45:00Z",
    created_at: "2024-03-07T19:30:00Z",
    merchant: MOCK_MERCHANTS[4],
    mystery_bag: MOCK_MYSTERY_BAGS[4],
  },
  // Merchant's incoming orders (for merchant dashboard)
  {
    id: "order-m-001",
    user_id: "user-student-002",
    mystery_bag_id: "bag-001",
    merchant_id: "merchant-001",
    quantity: 1,
    total_price: 15000,
    commission_amount: 2250,
    qr_code_data: JSON.stringify({
      order_id: "order-m-001",
      user_id: "user-student-002",
      merchant_id: "merchant-001",
      mystery_bag_id: "bag-001",
      total_price: 15000,
      timestamp: new Date().toISOString(),
      signature: "SE-UVWX1234",
    }),
    status: "pending",
    created_at: new Date().toISOString(),
    user: MOCK_USERS[1],
    mystery_bag: MOCK_MYSTERY_BAGS[0],
  },
  {
    id: "order-m-002",
    user_id: "user-student-003",
    mystery_bag_id: "bag-001",
    merchant_id: "merchant-001",
    quantity: 2,
    total_price: 30000,
    commission_amount: 4500,
    qr_code_data: JSON.stringify({
      order_id: "order-m-002",
      user_id: "user-student-003",
      merchant_id: "merchant-001",
      mystery_bag_id: "bag-001",
      total_price: 30000,
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      signature: "SE-YZAB5678",
    }),
    status: "confirmed",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    user: MOCK_USERS[2],
    mystery_bag: MOCK_MYSTERY_BAGS[0],
  },
];

// -------------------------------------------------------
// Mock Reviews
// -------------------------------------------------------

export const MOCK_REVIEWS: Review[] = [
  {
    id: "review-001",
    order_id: "order-001",
    user_id: "user-student-001",
    merchant_id: "merchant-001",
    rating: 5,
    comment:
      "Keren banget! Dapet 2 minuman kopi susu + 3 croissant cuma 15rb. Worth it abis, pasti order lagi!",
    created_at: "2024-03-10T21:00:00Z",
    user: MOCK_USERS[0],
  },
  {
    id: "review-002",
    order_id: "order-005",
    user_id: "user-student-002",
    merchant_id: "merchant-001",
    rating: 5,
    comment:
      "Surprise banget isinya! Kopi dan snack yang biasanya mahal jadi super hemat. Recommended!",
    created_at: "2024-03-09T21:30:00Z",
    user: MOCK_USERS[1],
  },
  {
    id: "review-003",
    order_id: "order-002",
    user_id: "user-student-003",
    merchant_id: "merchant-002",
    rating: 4,
    comment:
      "Rotinya masih fresh dan enak! Ada croissant, roti keju, dan brownies. Lumayan buat sarapan besok.",
    created_at: "2024-03-08T20:00:00Z",
    user: MOCK_USERS[2],
  },
  {
    id: "review-004",
    order_id: "order-003",
    user_id: "user-student-001",
    merchant_id: "merchant-003",
    rating: 5,
    comment:
      "Steak dapet yang premium! Sausnya nampol, plus kentang goreng + minuman. Value gila!",
    created_at: "2024-03-07T21:00:00Z",
    user: MOCK_USERS[0],
  },
  {
    id: "review-005",
    order_id: "order-004",
    user_id: "user-student-002",
    merchant_id: "merchant-004",
    rating: 5,
    comment:
      "Tous Les Jours selalu bintang 5! Pastri Koreanya premium banget, packaging rapi, rasa luar biasa!",
    created_at: "2024-03-06T22:30:00Z",
    user: MOCK_USERS[1],
  },
  {
    id: "review-006",
    order_id: "order-001",
    user_id: "user-student-003",
    merchant_id: "merchant-005",
    rating: 4,
    comment:
      "Janji Jiwa selalu konsisten. Kopi lokalnya enak, snacknya beragam. Hemat dan berkualitas!",
    created_at: "2024-03-05T21:45:00Z",
    user: MOCK_USERS[2],
  },
];

// -------------------------------------------------------
// Mock Notifications (Customer)
// -------------------------------------------------------

export const MOCK_NOTIFICATIONS_CUSTOMER: Notification[] = [
  {
    id: "notif-c-001",
    user_id: "user-student-001",
    title: "Mystery Bag Baru!",
    message:
      "Kopi Kenangan Kampus baru aja publish 3 Mystery Bag! Buruan sebelum habis!",
    type: "bag_available",
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "notif-c-002",
    user_id: "user-student-001",
    title: "Pesanan Dikonfirmasi!",
    message:
      "Pesananmu di Tous Les Jours sudah dikonfirmasi. Ambil antara 21:00 - 22:00.",
    type: "order_pickup",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "notif-c-003",
    user_id: "user-student-001",
    title: "Jangan Lupa Pickup!",
    message:
      "Pesananmu di Roti'O Bakery akan expired dalam 30 menit. Segera ambil!",
    type: "order_pickup",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "notif-c-004",
    user_id: "user-student-001",
    title: "Promo Spesial Hari Ini!",
    message:
      "Warung Steak Abang diskon ekstra 10% untuk pemesanan pertama hari ini!",
    type: "promo",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "notif-c-005",
    user_id: "user-student-001",
    title: "Badge Baru Terbuka!",
    message:
      'Selamat! Kamu mendapatkan badge "Food Hero" setelah 10 pesanan. Lanjutkan!',
    type: "promo",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// -------------------------------------------------------
// Mock Notifications (Merchant)
// -------------------------------------------------------

export const MOCK_NOTIFICATIONS_MERCHANT: Notification[] = [
  {
    id: "notif-m-001",
    user_id: "user-merchant-001",
    title: "Pesanan Baru!",
    message: "Budi Santoso baru saja memesan 1 Mystery Bag. Total Rp 15.000.",
    type: "order_new",
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "notif-m-002",
    user_id: "user-merchant-001",
    title: "Pesanan Baru!",
    message: "Sari Dewi memesan 2 Mystery Bag. Total Rp 30.000.",
    type: "order_new",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "notif-m-003",
    user_id: "user-merchant-001",
    title: "Pickup Selesai",
    message:
      "Ariel Mahasiswa sudah mengambil Mystery Bag-nya. Transaksi selesai!",
    type: "order_pickup",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "notif-m-004",
    user_id: "user-merchant-001",
    title: "Review Baru!",
    message:
      "Ariel memberikan rating ⭐⭐⭐⭐⭐ dengan komentar positif. Pertahankan!",
    type: "order_pickup",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "notif-m-005",
    user_id: "user-merchant-001",
    title: "Laporan Mingguan",
    message:
      "35 bag terjual minggu ini! Pendapatan bersih Rp 446.250. Naik 12% dari minggu lalu!",
    type: "promo",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

// -------------------------------------------------------
// Mock Favorites
// -------------------------------------------------------

export const MOCK_FAVORITES: Favorite[] = [
  {
    id: "fav-001",
    user_id: "user-student-001",
    merchant_id: "merchant-001",
    created_at: "2024-03-01T10:00:00Z",
    merchant: {
      ...MOCK_MERCHANTS[0],
      mystery_bag: MOCK_MYSTERY_BAGS[0],
      is_favorited: true,
    },
  },
  {
    id: "fav-002",
    user_id: "user-student-001",
    merchant_id: "merchant-004",
    created_at: "2024-03-02T11:00:00Z",
    merchant: {
      ...MOCK_MERCHANTS[3],
      mystery_bag: MOCK_MYSTERY_BAGS[3],
      is_favorited: true,
    },
  },
  {
    id: "fav-003",
    user_id: "user-student-001",
    merchant_id: "merchant-005",
    created_at: "2024-03-03T12:00:00Z",
    merchant: {
      ...MOCK_MERCHANTS[4],
      mystery_bag: MOCK_MYSTERY_BAGS[4],
      is_favorited: true,
    },
  },
];

// -------------------------------------------------------
// Mock Impact Stats
// -------------------------------------------------------

export const MOCK_IMPACT_STATS: ImpactStats = {
  id: "impact-001",
  total_food_saved_kg: 1204.5,
  total_co2_prevented_kg: 3011.25,
  total_money_saved_idr: 45180000,
  total_bags_sold: 2450,
  updated_at: new Date().toISOString(),
};

// -------------------------------------------------------
// Mock Badges
// -------------------------------------------------------

export const ALL_BADGES: Badge[] = [
  {
    id: "eco_starter",
    name: "Eco Starter",
    description: "Pesan Mystery Bag pertamamu dan mulai perjalanan hijau!",
    icon: "Leaf",
    required_bags: 1,
    color: "#10b981",
    unlocked: true,
    unlocked_at: "2024-01-16T10:00:00Z",
  },
  {
    id: "food_hero",
    name: "Food Hero",
    description: "Sudah memesan 10 Mystery Bag. Kamu pahlawan makanan!",
    icon: "Medal",
    required_bags: 10,
    color: "#3b82f6",
    unlocked: true,
    unlocked_at: "2024-02-20T18:00:00Z",
  },
  {
    id: "planet_saver",
    name: "Planet Saver",
    description: "50 bag dipesan! Kamu sudah menyelamatkan bumi secara nyata.",
    icon: "Globe",
    required_bags: 50,
    color: "#8b5cf6",
    unlocked: false,
  },
  {
    id: "streak_master",
    name: "Streak Master",
    description: "Pesan 7 hari berturut-turut tanpa henti!",
    icon: "Flame",
    required_bags: 7,
    color: "#f97316",
    unlocked: false,
  },
  {
    id: "first_order",
    name: "First Bite",
    description: "Selamat datang di SaveEat! Pesanan pertamamu berhasil.",
    icon: "PartyPopper",
    required_bags: 1,
    color: "#f59e0b",
    unlocked: true,
    unlocked_at: "2024-01-16T10:00:00Z",
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Kamu adalah salah satu pengguna pertama SaveEat!",
    icon: "Bird",
    required_bags: 0,
    color: "#06b6d4",
    unlocked: true,
    unlocked_at: "2024-01-15T08:00:00Z",
  },
  {
    id: "super_saver",
    name: "Super Saver",
    description: "Total tabunganmu sudah melampaui Rp 100.000!",
    icon: "PiggyBank",
    required_bags: 20,
    color: "#eab308",
    unlocked: false,
  },
  {
    id: "review_writer",
    name: "Review Writer",
    description: "Sudah memberikan 5 ulasan. Bantu komunitas SaveEat!",
    icon: "PenTool",
    required_bags: 5,
    color: "#ec4899",
    unlocked: false,
  },
];

// -------------------------------------------------------
// Mock User Stats
// -------------------------------------------------------

export const MOCK_USER_STATS: UserStats = {
  total_bags_ordered: 12,
  total_money_saved: 285000,
  total_co2_prevented: 14.4,
  total_food_saved_kg: 6.0,
  current_streak: 3,
  longest_streak: 7,
  badges: ALL_BADGES.filter((b) => b.unlocked),
  next_badge: ALL_BADGES.find((b) => !b.unlocked),
  progress_to_next_badge: 24, // 12/50 bags * 100 = 24%
};

// -------------------------------------------------------
// Mock Merchant Analytics
// -------------------------------------------------------

const generateDailyStats = (days: number): DailyStats[] => {
  const stats: DailyStats[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const bagsSold = Math.floor(Math.random() * 8) + 2;
    stats.push({
      date: date.toISOString().split("T")[0],
      bags_sold: bagsSold,
      revenue: bagsSold * 15000 * 0.875, // after 12.5% commission
      bags_available: bagsSold + Math.floor(Math.random() * 3),
    });
  }
  return stats;
};

export const MOCK_MERCHANT_ANALYTICS: MerchantAnalytics = {
  total_bags_sold: 342,
  total_revenue: 4492500,
  average_daily_sales: 4.9,
  average_rating: 4.8,
  weekly_data: generateDailyStats(7),
  monthly_data: generateDailyStats(30),
  total_reviews: 234,
};

// -------------------------------------------------------
// Merchant Today Stats (for dashboard)
// -------------------------------------------------------

export const MOCK_MERCHANT_TODAY = {
  bags_sold_today: 7,
  revenue_today: 91875,
  stock_remaining: 3,
  pending_orders: 2,
  confirmed_orders: 3,
  picked_up_orders: 2,
};

// -------------------------------------------------------
// Helper Functions
// -------------------------------------------------------

export function getMerchantById(id: string): MockMerchant | undefined {
  return MOCK_MERCHANTS.find((m) => m.id === id);
}

export function getBagByMerchantId(merchantId: string): MysteryBag | undefined {
  return MOCK_MYSTERY_BAGS.find((b) => b.merchant_id === merchantId);
}

export function getOrdersByUserId(userId: string): Order[] {
  return MOCK_ORDERS.filter((o) => o.user_id === userId);
}

export function getOrdersByMerchantId(merchantId: string): Order[] {
  return MOCK_ORDERS.filter((o) => o.merchant_id === merchantId);
}

export function getReviewsByMerchantId(merchantId: string): Review[] {
  return MOCK_REVIEWS.filter((r) => r.merchant_id === merchantId);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDistance(distance: string): string {
  return distance;
}

export function calculatePickupCountdown(pickupEndTime: string): number {
  const now = new Date();
  const [hours, minutes] = pickupEndTime.split(":").map(Number);
  const pickupEnd = new Date();
  pickupEnd.setHours(hours, minutes, 0, 0);
  if (pickupEnd < now) {
    pickupEnd.setDate(pickupEnd.getDate() + 1);
  }
  return Math.max(0, pickupEnd.getTime() - now.getTime());
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "available":
      return "text-brand-success";
    case "sold_out":
      return "text-brand-danger";
    case "expired":
      return "text-brand-muted";
    case "pending":
      return "text-yellow-400";
    case "confirmed":
      return "text-brand-primary";
    case "picked_up":
      return "text-brand-success";
    case "cancelled":
      return "text-brand-danger";
    default:
      return "text-brand-muted";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "available":
      return "Tersedia";
    case "sold_out":
      return "Habis";
    case "expired":
      return "Kedaluwarsa";
    case "pending":
      return "Menunggu";
    case "confirmed":
      return "Dikonfirmasi";
    case "picked_up":
      return "Sudah Diambil";
    case "cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
}
