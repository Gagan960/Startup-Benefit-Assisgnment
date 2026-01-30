

# 🚀 Startup Benefits & Partnerships Platform

A full-stack web platform that helps **early-stage startups** discover and claim **exclusive SaaS deals**, with clear access control for public vs. locked benefits.

This project demonstrates **full-stack engineering**, **product thinking**, and **clean system design** rather than feature overload.

---

## ✨ Features

* 🔐 JWT-based authentication (signup & login)
* 🧭 Browse public and locked SaaS deals
* 🔒 Verification-gated deal claiming
* 📌 Claim tracking with status (`pending / approved`)
* 🎨 Premium SaaS-style UI with smooth animations
* ♻️ Reused & extended production-style backend

---

## 🧱 Tech Stack

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* Tailwind CSS
* Framer Motion (animations)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* REST APIs
* JWT authentication


---

## 📁 Repository Structure

```
copy folder/
├── Backend/        # Express + MongoDB backend (reused & extended)
└── frontend/       # Next.js App Router frontend
```

### Backend (Express)

```
Backend/src/
├── controllers/
├── middlewares/
├── repositories/
├── routes/
│   └── V1/
├── Schema/
├── services/
├── utils/
└── validators/
```

### Frontend (Next.js App Router)

```
frontend/src/
├── app/
│   ├── page.tsx
│   ├── deals/
│   ├── dashboard/
│   ├── login/
│   └── signup/
├── components/
└── lib/
```

---

## ♻️ Backend Reuse Strategy

This project follows MVC architecture


---

## 🔐 Authentication Flow

1. User signs in from the frontend
2. Frontend calls `POST /api/v1/user/signin`
3. Backend returns a JWT
4. Token stored in **localStorage**
5. Requests include:

   ```
   Authorization: Bearer <token>
   ```
6. Backend middleware:

   * Verifies JWT
   * Loads user
   * Attaches `req.user` (with `isVerified`)

---

## 🔒 Locked vs Unlocked Deals

* Deals have `isLocked: true | false`
* Anyone can **browse** all deals
* **Claiming locked deals requires verification**

Backend rule:

```
if (deal.isLocked && !user.isVerified)
→ 403 Forbidden
```

Error message:

> “This deal is locked. Verification required.”

---

## 📌 Deal Claiming Logic

* Claims are **unique per user + deal**
* Enforced using a compound unique index
* Claim flow:

  1. Validate deal ID
  2. Check deal existence
  3. Enforce verification for locked deals
  4. Prevent duplicate claims (`409 Conflict`)
  5. Create claim with status `pending`

Dashboard shows:

* Claimed deals
* Current status (`pending / approved`)

---

## 🎨 Frontend Experience

### Pages

* **Landing Page** – Premium SaaS layout with animated hero
* **Deals Page** – Search, filters, locked indicators
* **Deal Details** – Eligibility, partner info, claim CTA
* **Dashboard** – Profile + claimed deals

### Motion & UX

* Page transitions
* Hover micro-interactions
* Button feedback
* Skeleton loaders
* Smooth layout animations

Animations are used intentionally to improve clarity.

---

## ▶️ Run Locally

### Backend

```bash
cd Backend
npm install
npm start
```

Optional seed data:

```bash
npm run seed:deals
```

---

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev:3001
```

Open:
👉 **[http://localhost:3001](http://localhost:3001)**

---

## ⚠️ Known Limitations

* No user verification UI
  (for testing, manually set `isVerified: true` in MongoDB)
* No admin dashboard for deal or claim management
* Rate limiting inherited from the existing backend

---

## 🚀 Production Improvements

* Restrict CORS origins
* Add pagination & caching to `/deals`
* Structured logging & request IDs
* Refresh token rotation
* Use httpOnly cookies for auth
* Stronger validation & error codes

---

## 🧠 Design Philosophy

> **Clarity over complexity**
> **Product flow over feature count**
> **Real-world constraints over greenfield assumptions**



