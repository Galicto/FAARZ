# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
FAARZ is a proximity-based surplus food redistribution platform connecting restaurants, NGOs, and volunteers via real-time geolocation. It aims to reduce food waste and hunger with an enterprise-grade, secure, and highly-performant system featuring modern aesthetics and rich animations (60fps).

## Goals
1. Provide a scalable mobile application (React Native/Expo) for Restaurants, NGOs, and Volunteers.
2. Provide a futuristic Web Admin Dashboard (Next.js) for monitoring and approval.
3. Facilitate fast geolocation-based matching (Google Maps Platform).
4. Implement a robust backend using Firebase (Firestore, Cloud Functions, Authentication, FCM).
5. Build an engaging, eco-modern UI (TailwindCSS, Framer Motion, Reanimated) with gamification (Impact metrics).

## Non-Goals (Out of Scope)
- Platform assumes connector role, not food certifier (liability disclaimer provided).
- Complex 3D GPU-intensive rendering (keep three.js lightweight).
- Custom backend auth over Auth0/Firebase Authentication.

## Users
- **1️⃣ Restaurant / Food Donor**: Registers, verifies location, donates food via structured forms, tracks impact.
- **2️⃣ NGO / Shelter**: Logs in, maps nearby donations, filters, accepts and confirms pickup.
- **3️⃣ Volunteer**: Views pickup tasks, navigates to location, marks complete with delivery proof.
- **4️⃣ Admin (Web Only)**: Approves NGOs, verifies restaurants, monitors live donations, suspends accounts, views analytics.

## Constraints
- **Performance targets**: < 2.5s load time, lazy loading, offline fallback, 60fps animations.
- **UI design constraints**: Dark Mode default, futuristic minimalism, deep green + neon, glassmorphism.
- **Map & Routing**: Google Maps SDK must be used.
- **Footer**: Subtle "Made with love by Aamina" on login/dashboard.

## Success Criteria
- [ ] Restaurant can successfully post a food donation.
- [ ] NGO / Volunteer can successfully locate and accept a donation tracking its states.
- [ ] Notifications triggered at each major status change.
- [ ] Admin dashboard displays key impact metrics.
- [ ] 60fps scrolling and animated transitions function smoothly across web and mobile.
