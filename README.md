# Potnuru Samita - Interactive Personal Portfolio

A sleek, premium, and fully responsive developer portfolio built with React 19, TypeScript, Vite, Framer Motion, and Tailwind CSS. The design focuses on high-impact visual aesthetics, micro-interactions, clean scroll-spying navigation, and seamless accessibility.

---

## 🚀 Live Demo & Local Setup

Follow these simple instructions to download and run the portfolio on your local machine.

### Prerequisites
Before running the application, make sure you have the following installed on your laptop:
- **Node.js** (v18 or higher recommended) — [Download Node.js](https://nodejs.org/)
- **npm** (comes packaged with Node.js) or **Yarn**

### Step-by-Step Local Run Instructions

1. **Open your Terminal / Command Prompt**
   Navigate to the directory where you want to download or have extracted this project:
   ```bash
   cd path/to/project-directory
   ```

2. **Install Project Dependencies**
   Run the following command to download and install all necessary npm packages (such as React, Framer Motion, Lenis, and Tailwind):
   ```bash  
   npm install
   ```

3. **Start the Development Server**
   Launch the local Vite server using:
   ```bash
   npm run dev
   ```
   *Vite will start up rapidly. Look for the local URL in the console output (typically `http://localhost:5173/` or `http://localhost:5174/`).*

4. **View the App**
   Open your preferred web browser and navigate to the URL displayed in your console.

5. **Build for Production (Optional)**
   To bundle the application into highly optimized, minified static assets ready for deployment:
   ```bash
   npm run build
   ```
   *The resulting build will be placed inside the `dist/` directory.*

6. **Preview Production Build locally (Optional)**
   Verify the built static assets locally using:
   ```bash
   npm run preview
   ```

---

## 🛠️ Technology Stack

- **Frontend Core:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vite.dev/) (lightning-fast module bundling)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (modern responsive utility styling)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (smooth card height/opacity transitions)
- **Scroll Behavior:** [Lenis](https://lenis.darkroom.engineering/) (luxurious smooth scrolling interpolation)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ✨ Features

- **Interactive Hover & Click Accordions:** Content cards in the Education, Internships, Projects, Competitions, and Responsibilities sections automatically expand to show deeper details on mouse hover or tap/click.
- **Categorized Skill Universe:** A component-driven interactive filter dashboard displaying technical skills across categories like Frontend, Backend, Databases, Tools, and Expertise.
- **Scroll Spy Navigation:** A sticky left sidebar displaying personal details and an active indicators navigation menu that highlights sections dynamically based on scroll position.
- **Premium Aesthetics:** Features a mouse-following spotlight radial gradient glow, subtle ambient grain overlay, and glassmorphism styling.
- **SEO & Responsiveness:** Clean metadata, Open Graph sharing cards, structured semantic headings, and a layout that adjusts seamlessly from mobile screens to ultra-wide desktop monitors.

---

## 📂 Project Structure

```text
├── public/                 # Static assets (favicons, manifest)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── SkillUniverse.tsx  # Dynamic interactive skills filter board
│   │   └── Preloader.tsx      # Legacy loading animation assets
│   ├── App.tsx             # Main page container and state router
│   ├── main.tsx            # Application entrypoint
│   └── index.css           # Styling configuration and custom animations
├── index.html              # HTML shell & SEO meta configuration
├── package.json            # Scripts & dependencies
└── tsconfig.json           # TypeScript configuration
```
