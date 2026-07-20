export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

export interface ChatSession {
  id: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_phone?: string;
  messages: ChatMessage[];
}

export interface VehicleInfo {
  name: string;
  type: string;
  capacity: number;
  pricePerDay: number;
  description: string;
  features: string[];
}

export interface TourPackageInfo {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  highlights: string[];
}

export interface MustikaKnowledgeBase {
  companyName: string;
  city: string;
  operatingHours: string;
  whatsappNumber: string;
  services: string[];
  armadas: VehicleInfo[];
  tourPackages: TourPackageInfo[];
  faqs: { question: string; answer: string }[];
}

// Database schema representation for Supabase
export interface SupabaseChatMessageRow {
  id: string;
  session_id: string;
  role: MessageRole;
  content: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface SupabaseChatSessionRow {
  id: string;
  user_name?: string;
  user_phone?: string;
  created_at: string;
  updated_at: string;
}
