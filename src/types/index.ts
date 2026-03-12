// ============================================================
// SaveEat - Core TypeScript Types
// ============================================================

// -------------------------------------------------------
// Auth & User Types
// -------------------------------------------------------

export type UserRole = 'student' | 'merchant';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  store_name?: string; // required if role is merchant
}

// -------------------------------------------------------
// Merchant Types
// -------------------------------------------------------

export interface Merchant {
  id: string;
  user_id: string;
  store_name: string;
  store_description?: string;
  store_image_url?: string;
  address: string;
  distance_from_campus?: string;
  latitude?: number;
  longitude?: number;
  operating_hours?: string;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  created_at: string;
}

export interface MerchantWithBag extends Merchant {
  mystery_bag?: MysteryBag;
  active_bag?: MysteryBag;
  is_favorited?: boolean;
}

// -------------------------------------------------------
// Mystery Bag Types
// -------------------------------------------------------

export type BagStatus = 'available' | 'sold_out' | 'expired';

export interface MysteryBag {
  id: string;
  merchant_id: string;
  original_price: number;
  discount_price: number;
  discount_percentage: number;
  stock_available: number;
  pickup_start_time: string; // HH:MM
  pickup_end_time: string;   // HH:MM
  status: BagStatus;
  created_at: string;
  // Joined data
  merchant?: Merchant;
}

export interface MysteryBagFormData {
  quantity: number;
  original_price: number;
  discount_percentage: number;
  discount_price: number;
  pickup_start_time: string;
  pickup_end_time: string;
}

// -------------------------------------------------------
// Order Types
// -------------------------------------------------------

export type OrderStatus = 'pending' | 'confirmed' | 'picked_up' | 'cancelled';

export interface Order {
  id: string;
  user_id: string;
  mystery_bag_id: string;
  merchant_id: string;
  quantity: number;
  total_price: number;
  commission_amount: number;
  qr_code_data: string;
  status: OrderStatus;
  pickup_time?: string;
  created_at: string;
  // Joined data
  mystery_bag?: MysteryBag;
  merchant?: Merchant;
  user?: User;
}

export interface CreateOrderPayload {
  mystery_bag_id: string;
  merchant_id: string;
  quantity: number;
  total_price: number;
}

// -------------------------------------------------------
// Review Types
// -------------------------------------------------------

export interface Review {
  id: string;
  order_id: string;
  user_id: string;
  merchant_id: string;
  rating: number; // 1-5
  comment?: string;
  created_at: string;
  // Joined data
  user?: User;
  merchant?: Merchant;
  order?: Order;
}

export interface CreateReviewPayload {
  order_id: string;
  merchant_id: string;
  rating: number;
  comment?: string;
}

// -------------------------------------------------------
// Favorite Types
// -------------------------------------------------------

export interface Favorite {
  id: string;
  user_id: string;
  merchant_id: string;
  created_at: string;
  // Joined data
  merchant?: MerchantWithBag;
}

// -------------------------------------------------------
// Notification Types
// -------------------------------------------------------

export type NotificationType = 'order_new' | 'order_pickup' | 'bag_available' | 'promo';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
}

// -------------------------------------------------------
// Impact Stats Types
// -------------------------------------------------------

export interface ImpactStats {
  id: string;
  total_food_saved_kg: number;
  total_co2_prevented_kg: number;
  total_money_saved_idr: number;
  total_bags_sold: number;
  updated_at: string;
}

// -------------------------------------------------------
// Gamification / Badge Types
// -------------------------------------------------------

export type BadgeId =
  | 'eco_starter'
  | 'food_hero'
  | 'planet_saver'
  | 'streak_master'
  | 'first_order'
  | 'early_bird'
  | 'super_saver'
  | 'review_writer';

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  required_bags: number;
  color: string;
  unlocked: boolean;
  unlocked_at?: string;
}

export interface UserStats {
  total_bags_ordered: number;
  total_money_saved: number;
  total_co2_prevented: number;
  total_food_saved_kg: number;
  current_streak: number;
  longest_streak: number;
  badges: Badge[];
  next_badge?: Badge;
  progress_to_next_badge: number; // 0-100
}

// -------------------------------------------------------
// Merchant Analytics Types
// -------------------------------------------------------

export interface DailyStats {
  date: string;
  bags_sold: number;
  revenue: number;
  bags_available: number;
}

export interface MerchantAnalytics {
  total_bags_sold: number;
  total_revenue: number;
  average_daily_sales: number;
  average_rating: number;
  weekly_data: DailyStats[];
  monthly_data: DailyStats[];
  total_reviews: number;
}

// -------------------------------------------------------
// UI / Component State Types
// -------------------------------------------------------

export type ViewMode = 'grid' | 'map';

export type SortOption =
  | 'distance'
  | 'price_low'
  | 'price_high'
  | 'rating'
  | 'stock';

export type FilterOption = {
  sort: SortOption;
  maxPrice?: number;
  minRating?: number;
  maxDistance?: string;
  showOnlyAvailable: boolean;
};

export interface MarketplaceFilters {
  search: string;
  sort: SortOption;
  maxPrice?: number;
  minRating?: number;
  showOnlyAvailable: boolean;
}

export interface ToastOptions {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  type?: 'confirm' | 'info' | 'qr' | 'review' | 'share';
  data?: unknown;
}

// -------------------------------------------------------
// QR Code Types
// -------------------------------------------------------

export interface QRCodeData {
  order_id: string;
  user_id: string;
  merchant_id: string;
  mystery_bag_id: string;
  total_price: number;
  timestamp: string;
  signature: string; // simple hash for validation
}

// -------------------------------------------------------
// Map / Location Types
// -------------------------------------------------------

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  merchant: MerchantWithBag;
}

export interface LocationCoords {
  lat: number;
  lng: number;
}

// -------------------------------------------------------
// Mock Data Types (for demo/presentation)
// -------------------------------------------------------

export interface MockMerchant extends Merchant {
  mystery_bag: MysteryBag;
  tags: string[];
  food_types: string[];
  image_hint: string;
}

// -------------------------------------------------------
// API Response Types
// -------------------------------------------------------

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

// -------------------------------------------------------
// Supabase Realtime Types
// -------------------------------------------------------

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

export interface RealtimePayload<T> {
  eventType: RealtimeEvent;
  new: T;
  old: Partial<T>;
  table: string;
  schema: string;
}

// -------------------------------------------------------
// Navigation Types
// -------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  active?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// -------------------------------------------------------
// Form Types
// -------------------------------------------------------

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ProfileUpdateForm {
  name: string;
  avatar_url?: string;
}

export interface MerchantProfileForm {
  store_name: string;
  store_description?: string;
  store_image_url?: string;
  address: string;
  distance_from_campus?: string;
  operating_hours?: string;
  latitude?: number;
  longitude?: number;
}
