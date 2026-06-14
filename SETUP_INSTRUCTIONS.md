# AI Engineer Path - Setup Instructions

## Prerequisites

You need to install Node.js before running this project.

### Install Node.js

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Recommended: Node.js 18.x or 20.x

2. **Install Node.js**
   - Run the installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" option

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   Both commands should return version numbers.

---

## Quick Start (After Node.js is installed)

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

## Project Setup (Detailed)

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Zustand (state management)
- React Router
- Markdown rendering libraries
- Syntax highlighting
- Icons and charts

### 2. Development

```bash
npm run dev
```

- Opens at `http://localhost:5173`
- Hot reload enabled
- Changes reflect immediately

### 3. Build for Production

```bash
npm run build
```

- Creates optimized build in `/dist` folder
- Ready for deployment

### 4. Preview Production Build

```bash
npm run preview
```

- Test production build locally

---

## Deployment

### Option 1: Netlify (Recommended)

1. Push code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

### Option 2: Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Vercel auto-detects Vite settings
5. Deploy!

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

---

## Project Structure

```
ai-engineer-path/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── data/           # Roadmap JSON files
│   ├── stores/         # Zustand stores
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   ├── utils/          # Helper functions
│   ├── pages/          # Route pages
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind config
└── vite.config.ts      # Vite config
```

---

## Features

✅ **Learning Dashboard** - Track progress across 14 phases
✅ **90+ Topics** - Detailed educational content
✅ **Progress Tracking** - localStorage persistence
✅ **Notes System** - Markdown editor per topic
✅ **Portfolio Tracker** - Manage your projects
✅ **Career Milestones** - Timeline view
✅ **Search** - Full-text search
✅ **Responsive** - Mobile and desktop
✅ **No Backend** - Runs entirely in browser

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors

```bash
# Check Node.js version
node --version  # Should be 18.x or 20.x

# Update npm
npm install -g npm@latest

# Try clean install
npm ci
```

---

## Development Tips

### Hot Reload
- Save any file to see changes instantly
- No need to refresh browser

### TypeScript
- Type errors show in terminal and VS Code
- Fix type errors before building

### Tailwind CSS
- Use utility classes: `className="flex items-center gap-4"`
- Check docs: https://tailwindcss.com/docs

### State Management
- Use Zustand stores for global state
- Changes persist to localStorage automatically

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. 🎉 Start learning AI engineering!

---

## Support

- **Documentation**: See planning docs in root directory
- **Issues**: Check console for errors
- **Updates**: Pull latest changes from repository
