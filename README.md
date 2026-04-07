# 🗓️ Wall Calendar – Interactive Date Planner

A professional, artistically crafted interactive wall calendar built with **Next.js 14**, **Framer Motion**, and **jsPDF**. Designed to feel like a premium physical object with advanced 3D animations.

## ✨ Features

- **3D Page Flip Navigation** – The entire calendar card performs a realistic 3D flip over binder rings when switching months.
- **Smooth Selection Animation** – Date selection squares appear with a fluid, 180-degree quintic-out spin, triggering only on click for a tactical feel.
- **Hover Selection Preview** – A static shadow square follows the mouse during selection for clear user feedback.
- **Multi-Range Note System** – Select multiple independent date ranges; each generates its own animated note popup.
- **Unified PDF Export** – Download a professionally formatted PDF containing every selected range and note.
- **Interactive Binder Rings** – 12 static rings serve as instant jumpers to any month of the year.
- **Live Clock** – A real-time, hover-responsive digital clock in the top sidebar.
- **Custom Local Assets** – Automatically loads `1.jpg` through `12.jpg` from the `/public` folder for monthly hero images.

## 🎨 Development Choices

- **Vanilla CSS + 3D Transforms**: Used for maximum performance and explicit control over the perspective and rotation of the calendar "paper".
- **Framer Motion Orchestration**: Manages the complex layering of the page-flip transition and the stacking behavior of multiple note popups.
- **Quintic Out Easing**: Chosen for the selection animation to provide a "premium/organic" feel that settles without bouncing.
- **Next.js App Router**: Leveraged for clean component separation and fast server-side initial paints.

## 🚀 Getting Started

1. Copy and Install:

   ```bash
   npm install
   ```

2. Add Assets:

   Place your image assets in the `public/` folder, named `1.jpg`, `2.jpg`, ... up to `12.jpg`.

3. Run Development Server:

   ```bash
   npm run dev
   ```

4. View App:

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deploy

```bash
npm run build    # Production build
npm run start    # Start production server
```

## 📁 Key File Structure

- `app/globals.css` – Core design tokens, 3D math, and all component styles.
- `components/Calendar/CalendarApp.tsx` – Central state and animation orchestrator.
- `components/Calendar/DayCell.tsx` – Logic for click vs hover selection states.
- `components/Calendar/RangeNotePopup.tsx` – Multi-range PDF generation logic.
- `hooks/useCalendar.ts` – State management for ranges and navigation.

## 🖥️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Framer Motion** (Animations)
- **jsPDF** (PDF Generation)
- **date-fns** (Date Utilities)
- **Vanilla CSS** (Full design control)
