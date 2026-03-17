# WishMe — Celebrity Engagement Platform

## Overview
WishMe is a full-featured Expo mobile app targeting the Indian celebrity engagement market. Users can book personalized video/voice messages from celebrities, use an AI music studio, manage a wallet (INR), refer friends for commission, and upgrade their subscription plan.

## Architecture

### Monorepo Structure (pnpm workspaces)
- `artifacts/mobile/` — Main Expo mobile app (React Native + Expo Router)
- `artifacts/api-server/` — Express API server (port 8080)
- `artifacts/mockup-sandbox/` — Vite preview server for component mockups

### Mobile App Stack
- **Framework**: Expo 54 + Expo Router v6 (file-based routing)
- **Navigation**: 5-tab bar — Home, Celebrities, Voice Call (center FAB), AI Music, Profile
- **Styling**: Global design system (no hardcoded hex/fonts anywhere)
- **State**: React Context (ThemeContext + AuthContext) + TanStack Query
- **Storage**: AsyncStorage (auth, theme preference)
- **Fonts**: Inter (UI), Playfair Display (headlines), Dancing Script (decorative)
- **Icons**: @expo/vector-icons (Feather)
- **Gradients**: expo-linear-gradient
- **Haptics**: expo-haptics

## Design System

### Color Tokens
- Light primary: `#FF6B33` / Dark primary: `#FF7F4D`
- Secondary purple: `#B44CFF` / `#C266FF`
- Backgrounds, cards, text all from `constants/theme.ts`
- All colors accessed via `useTheme().colors` — zero hardcoded hex in components

### Font Families
- `Inter_*` — All UI text, buttons, labels, body
- `PlayfairDisplay_*` — Hero headings, display text, prices
- `DancingScript_*` — Decorative accents (logo, greetings)
- Loaded in `app/_layout.tsx` via `useFonts()`
- All variants exported from `constants/fonts.ts` as `fontVariants.*`

### Theme
- Light/dark/system modes persisted to AsyncStorage
- `contexts/ThemeContext.tsx` — `useTheme()` hook
- `contexts/AuthContext.tsx` — local auth with wallet

## Screens Built

### Tabs (5)
- `(tabs)/index.tsx` — Home: banners, quick actions, celebrity grid, referral CTA, AI assistant FAB
- `(tabs)/celebrities.tsx` — Search/filter grid with category chips (12 celebrities)
- `(tabs)/voice-call.tsx` — Celebrity voice call booking with availability
- `(tabs)/music.tsx` — AI Music Studio (TTS, AI Music, SFX, Voice Clone, Convert, Isolate)
- `(tabs)/profile.tsx` — Plan badge, completion bar, wallet, referrals, menu, sign out

### Auth Flow
- `(auth)/login.tsx` — Email/password login
- `(auth)/signup.tsx` — Signup with password strength meter
- `(auth)/verify-otp.tsx` — 6-digit OTP verification
- `(auth)/select-plan.tsx` — Free/Silver/Gold/Platinum plan cards
- `(auth)/complete-profile.tsx` — Multi-step profile wizard

### Features
- `celebrity/[id].tsx` — Celebrity detail: hero image, About/Services/Reviews tabs
- `booking/[id].tsx` — 5-step booking flow: Request → Delivery → Script → Review → Checkout
- `wallet.tsx` — Wallet balance, add money, transaction history
- `messages.tsx` — Conversation list
- `chat/[id].tsx` — Real-time chat UI
- `bookings.tsx` — Booking history with status filters
- `referrals.tsx` — Referral code sharing, 2-level commission tracking
- `loved-ones.tsx` — CRUD for family/friends with birthday reminders
- `photo-wish.tsx` — AI-generated photo wishes with templates
- `greeting-cards.tsx` — Free greeting card generator
- `wish-celebrity.tsx` — Send public wishes to celebrities
- `wish-orders.tsx` — History of all wish-type orders
- `occasions.tsx` — Upcoming occasion reminders & browse by occasion
- `settings.tsx` — Dark mode, notifications, security

## Business Logic

### Plans & Commissions
| Plan     | Price   | L1 Referral | L2 Referral | Booking Discount |
|----------|---------|-------------|-------------|-----------------|
| Free     | ₹0      | 5%          | 2%          | 0%              |
| Silver   | ₹299/mo | 7%          | 3%          | 5%              |
| Gold     | ₹599/mo | 8%          | 4%          | 10%             |
| Platinum | ₹999/mo | 10%         | 5%          | 15%             |

### Wallet (INR)
- Signup bonus: ₹500
- Top-up via Razorpay (simulated)
- Deductions for bookings and AI generation
- Transaction history with type filters

### AI Music Studio Pricing
| Feature       | Cost  |
|---------------|-------|
| Text to Speech | ₹50  |
| AI Music       | ₹200 |
| Sound Effects  | ₹100 |
| Voice Clone    | ₹300 |
| Voice Convert  | ₹150 |
| Audio Isolate  | ₹150 |

## Packages Installed
- `@expo-google-fonts/inter` — UI font
- `@expo-google-fonts/playfair-display` — Display font
- `@expo-google-fonts/dancing-script` — Script/decorative font
- `expo-linear-gradient` — Gradient backgrounds and buttons
- `expo-haptics` — Haptic feedback
- `expo-image-picker` — Photo uploads
- `expo-clipboard` — Referral code copy
- `@react-native-async-storage/async-storage` — Persistence
- `@supabase/supabase-js` — Installed (not yet wired to backend)
- `@tanstack/react-query` — Data fetching/caching
- `react-native-gesture-handler` — Gestures
- `react-native-reanimated` — Animations
- `react-native-safe-area-context` — Safe areas

## Development Notes
- Web insets: 67px top, 34px bottom on `Platform.OS === 'web'`
- Auth is local AsyncStorage only (no backend wired yet)
- All celebrity data is mocked — ready for Supabase integration
- AI generation is simulated with `setTimeout` — ready for ElevenLabs/Suno API wiring
- Razorpay payment is simulated — ready for real SDK integration
