# AI Engineer Path 🚀

A comprehensive local learning dashboard for mastering AI engineering, built with React, TypeScript, and Tailwind CSS.

## 📋 Project Status

**Current State:** ✅ Project structure and core files created

### ✅ Completed
- Project configuration (Vite, TypeScript, Tailwind CSS)
- Type definitions and interfaces
- Zustand stores (Progress, Notes, Portfolio, Career, UI)
- Global styles and CSS setup
- Main app structure and routing setup

### ⏳ Next Steps (Requires Node.js)
1. Install Node.js (see setup instructions below)
2. Install dependencies with `npm install`
3. Create component files
4. Generate educational content (14 phases, 90+ topics)
5. Build UI components
6. Test and deploy

---

## 🎯 Features

### Learning Dashboard
- **14 Phases** covering Python fundamentals through advanced AI engineering
- **90+ Topics** with detailed educational content (300-500 words each)
- **Progress Tracking** with localStorage persistence
- **Streak System** to maintain learning momentum
- **Time Tracking** showing hours invested and remaining

### Personal Tools
- **Notes Panel** - Markdown editor for personal notes per topic
- **Portfolio Tracker** - Manage 4 pre-seeded AI projects
- **Career Milestones** - Timeline view of 9 career goals
- **Search** - Full-text search across all content and notes

### UI/UX
- Three-column responsive layout
- Tree navigation with expandable phases
- Progress visualizations (rings, bars, charts)
- Syntax-highlighted code blocks
- Editorial design aesthetic
- Smooth animations

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router v6** for navigation
- **localStorage** for persistence (no backend needed)

### Key Libraries
- `react-markdown` + `remark-gfm` - Markdown rendering
- `react-syntax-highlighter` - Code highlighting
- `@uiw/react-md-editor` - Markdown editor
- `lucide-react` - Icons
- `recharts` - Charts and visualizations
- `date-fns` - Date utilities

---

## 📦 Installation

### Prerequisites

**You must install Node.js first!**

1. Download Node.js from https://nodejs.org/
2. Install the LTS version (18.x or 20.x recommended)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Setup

```bash
# Navigate to project directory
cd ai-engineer-path

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

---

## 📁 Project Structure

```
ai-engineer-path/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components (to be created)
│   │   ├── layout/       # MainLayout, sidebars, nav
│   │   ├── dashboard/    # Home page components
│   │   ├── topic/        # Topic detail components
│   │   ├── portfolio/    # Portfolio tracker
│   │   ├── career/       # Career milestones
│   │   ├── navigation/   # Tree nodes, search
│   │   ├── notes/        # Notes panel
│   │   └── common/       # Reusable UI components
│   ├── data/             # Roadmap JSON files (to be created)
│   │   └── roadmap/      # phase-0.json through phase-14.json
│   ├── pages/            # Route pages (to be created)
│   ├── stores/           # ✅ Zustand stores
│   │   ├── useProgressStore.ts
│   │   ├── useNotesStore.ts
│   │   ├── usePortfolioStore.ts
│   │   ├── useCareerStore.ts
│   │   └── useUIStore.ts
│   ├── hooks/            # Custom React hooks (to be created)
│   ├── types/            # ✅ TypeScript interfaces
│   │   └── index.ts
│   ├── utils/            # Helper functions (to be created)
│   ├── App.tsx           # ✅ Main app component
│   ├── main.tsx          # ✅ Entry point
│   └── index.css         # ✅ Global styles
├── ✅ package.json       # Dependencies
├── ✅ tsconfig.json      # TypeScript config
├── ✅ vite.config.ts     # Vite config
├── ✅ tailwind.config.js # Tailwind config
└── ✅ index.html         # HTML template
```

---

## 🎓 Content Outline

### Phase 0: Setup & Environment (3 topics)
Python installation, Git basics, virtual environments

### Phase 1: Python Foundations (12 topics)
Variables, data types, loops, functions, OOP basics

### Phase 2: Developer Tools & Workflow (6 topics)
Terminal, VS Code, Git workflow, debugging

### Phase 3: APIs & Web Fundamentals (4 topics)
HTTP, REST APIs, requests library, authentication

### Phase 4: LLM API Mastery (8 topics)
Claude/OpenAI APIs, prompt engineering, streaming, token economics

### Phase 5: RAG (11 topics)
Document loading, chunking, embeddings, vector search, generation

### Phase 6: Vector Databases (5 topics)
ChromaDB, Pinecone, metadata filtering, scaling

### Phase 7: LangChain & AI Frameworks (5 topics)
Document loaders, LCEL, memory, retrieval chains

### Phase 8: Building & Shipping Products (6 topics)
Streamlit, AI agents, tool use, multi-agent systems

### Phase 9: Data Science Foundations (4 topics)
NumPy, Pandas, visualization, ML basics

### Phase 10: Deployment & Production (4 topics)
Streamlit Cloud, secrets management, FastAPI, Docker

### Phase 11: Mathematics for ML (4 topics)
Linear algebra, statistics, calculus, neural networks from scratch

### Phase 12: Advanced AI Engineering (5 topics)
Fine-tuning, multi-agent patterns, security, evaluation

### Phase 13: Software Engineering Practices (6 topics)
Clean code, testing, code review, design patterns, logging, CI/CD

### Phase 14: Interview Preparation (6 topics)
DSA refresher, system design, ML concepts, behavioral prep

**Total: ~90 topics across 14 phases**

---

## 💾 Data Persistence

All user data is stored in localStorage:

```
ai-engineer-path-progress    # Topic completion, streak, last viewed
ai-engineer-path-notes       # User notes per topic
ai-engineer-path-portfolio   # Project tracking
ai-engineer-path-career      # Career milestones
ai-engineer-path-ui          # UI preferences
```

No backend required - everything runs in the browser!

---

## 🚀 Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

### Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Vercel auto-detects Vite settings
5. Deploy!

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📚 Documentation

- **SETUP_INSTRUCTIONS.md** - Detailed setup guide
- **ARCHITECTURE_PLAN.md** - Complete technical specification
- **SYSTEM_ARCHITECTURE.md** - Visual diagrams and data flows
- **IMPLEMENTATION_GUIDE.md** - Code examples and patterns

---

## 🎨 Design System

### Typography
- **Headings**: Crimson Pro (serif, editorial)
- **Body**: Inter (clean, readable)
- **Code**: JetBrains Mono

### Colors
- **Primary**: Indigo-600 (accent)
- **Success**: Green-500 (completed)
- **Warning**: Orange-500 (in progress)
- **Neutral**: Grey-500 (not started)

---

## 🤝 Contributing

This is a personal learning project, but feel free to:
- Fork and customize for your own learning journey
- Suggest improvements via issues
- Share your progress and learnings

---

## 📝 License

MIT License - Feel free to use this for your own learning!

---

## 🎯 Learning Goals

This project helps you:
- ✅ Master React, TypeScript, and modern web development
- ✅ Learn AI engineering from fundamentals to advanced topics
- ✅ Build a portfolio of real AI projects
- ✅ Track your progress and maintain learning momentum
- ✅ Prepare for AI engineering interviews
- ✅ Transition from SAP to AI engineering career

---

## 🚦 Getting Started

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Choose LTS version

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   - Navigate to http://localhost:5173
   - Start learning!

---

## 📞 Support

- Check `SETUP_INSTRUCTIONS.md` for detailed setup help
- Review planning docs for architecture details
- Open issues for bugs or questions

---

**Built with ❤️ for aspiring AI engineers**

Start your AI engineering journey today! 🚀