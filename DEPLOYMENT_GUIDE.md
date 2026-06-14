# 🚀 Deployment Guide - AI Engineer Path

This guide covers deploying your AI Engineer Path dashboard to Netlify or Vercel. Both are free for personal projects and offer excellent performance.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ App runs locally without errors (`npm run dev`)
- ✅ Build completes successfully (`npm run build`)
- ✅ Git repository is initialized
- ✅ Code is committed to GitHub/GitLab/Bitbucket

---

## 🔧 Build Your App Locally (Test First)

```bash
cd ai-engineer-path
npm run build
```

This creates a `dist/` folder with optimized production files. If this succeeds, deployment will work.

**Preview the production build locally:**
```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

---

## 🌐 Option 1: Deploy to Netlify (Recommended)

### Method A: Netlify CLI (Fastest)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```
   This opens your browser to authenticate.

3. **Deploy from project directory:**
   ```bash
   cd ai-engineer-path
   netlify deploy --prod
   ```

4. **Follow prompts:**
   - Create & configure a new site? **Yes**
   - Team: Select your team
   - Site name: `ai-engineer-path` (or your preferred name)
   - Publish directory: `dist`

5. **Done!** You'll get a live URL like: `https://ai-engineer-path.netlify.app`

### Method B: Netlify Dashboard (GUI)

1. **Push code to GitHub:**
   ```bash
   cd ai-engineer-path
   git init
   git add .
   git commit -m "Initial commit - AI Engineer Path"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-engineer-path.git
   git push -u origin main
   ```

2. **Go to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**

3. **Connect GitHub:**
   - Authorize Netlify to access your GitHub
   - Select your `ai-engineer-path` repository

4. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18 (auto-detected from `netlify.toml`)

5. **Deploy!**
   - Click **"Deploy site"**
   - Wait 2-3 minutes for build
   - Get your live URL: `https://YOUR_SITE_NAME.netlify.app`

### Netlify Features You Get:

- ✅ **Automatic deployments** on every git push
- ✅ **Free SSL certificate** (HTTPS)
- ✅ **CDN** for fast global loading
- ✅ **Deploy previews** for pull requests
- ✅ **Custom domain** support (optional)
- ✅ **Rollback** to previous deployments

---

## ⚡ Option 2: Deploy to Vercel

### Method A: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd ai-engineer-path
   vercel --prod
   ```

4. **Follow prompts:**
   - Set up and deploy? **Yes**
   - Scope: Select your account
   - Link to existing project? **No**
   - Project name: `ai-engineer-path`
   - Directory: `./` (current directory)
   - Override settings? **No** (uses `vercel.json`)

5. **Done!** URL: `https://ai-engineer-path.vercel.app`

### Method B: Vercel Dashboard

1. **Push to GitHub** (same as Netlify Method B, step 1)

2. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click **"Add New..."** → **"Project"**

3. **Import repository:**
   - Connect GitHub account
   - Select `ai-engineer-path` repository
   - Click **"Import"**

4. **Configure (auto-detected):**
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

5. **Deploy!**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Live at: `https://ai-engineer-path.vercel.app`

### Vercel Features:

- ✅ **Instant deployments** on git push
- ✅ **Free SSL** (HTTPS)
- ✅ **Edge network** for speed
- ✅ **Preview deployments** for branches
- ✅ **Analytics** (optional)
- ✅ **Custom domains**

---

## 🔄 Continuous Deployment (Auto-Deploy on Push)

Both Netlify and Vercel automatically redeploy when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main
```

**Within 2-3 minutes**, your live site updates automatically! 🎉

---

## 🌍 Custom Domain (Optional)

### On Netlify:
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `aipath.yourdomain.com`)
4. Follow DNS configuration instructions

### On Vercel:
1. Go to **Project Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain
4. Configure DNS records as shown

Both platforms provide free SSL certificates for custom domains.

---

## 📊 Post-Deployment Checklist

After deployment, verify:

- ✅ **Homepage loads** correctly
- ✅ **Navigation works** (all routes accessible)
- ✅ **Practice Console** loads Pyodide successfully
- ✅ **Search functionality** works
- ✅ **localStorage persists** progress/notes
- ✅ **Responsive design** works on mobile
- ✅ **All links** open correctly

**Test on multiple devices:**
- Desktop browser
- Mobile browser
- Tablet (if available)

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Command failed: npm run build"**

**Solution:**
```bash
# Test build locally first
npm run build

# If it fails locally, fix errors, then redeploy
```

### Routes Don't Work (404 on Refresh)

**Problem:** Refreshing `/portfolio` gives 404

**Solution:** Already configured in `netlify.toml` and `vercel.json`
- Netlify: Redirects configured
- Vercel: Rewrites configured

If still broken, check deployment logs.

### Pyodide Doesn't Load

**Problem:** Practice Console shows loading forever

**Solution:**
1. Check browser console for errors
2. Ensure CDN access isn't blocked
3. Pyodide loads from `https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js`
4. Some corporate networks block CDNs - test on personal network

### localStorage Not Persisting

**Problem:** Progress resets on page refresh

**Solution:**
- localStorage works per-domain
- If you change domains, data won't transfer
- This is expected behavior (data stays local to each deployment)

---

## 🔒 Security Notes

Your app is **secure by default**:

- ✅ **No backend** - fully client-side
- ✅ **No API keys** exposed (none used)
- ✅ **No user data** sent to servers
- ✅ **localStorage only** - data stays in browser
- ✅ **HTTPS** enforced by Netlify/Vercel
- ✅ **Security headers** configured

**Privacy:** All progress, notes, and data stay in the user's browser. Nothing is tracked or sent anywhere.

---

## 📈 Performance Optimization

Already configured for you:

- ✅ **Code splitting** (Vite automatic)
- ✅ **Asset caching** (31536000s = 1 year)
- ✅ **Minification** (production build)
- ✅ **Tree shaking** (unused code removed)
- ✅ **Lazy loading** (React.lazy for routes)

**Lighthouse Score Target:** 90+ on all metrics

---

## 🎯 Deployment Comparison

| Feature | Netlify | Vercel |
|---------|---------|--------|
| **Free tier** | ✅ 100GB bandwidth | ✅ 100GB bandwidth |
| **Build minutes** | ✅ 300/month | ✅ 6000/month |
| **Custom domains** | ✅ Unlimited | ✅ Unlimited |
| **SSL** | ✅ Free | ✅ Free |
| **Deploy previews** | ✅ Yes | ✅ Yes |
| **Rollbacks** | ✅ Yes | ✅ Yes |
| **Analytics** | 💰 Paid | 💰 Paid |
| **Edge functions** | ✅ Yes | ✅ Yes |
| **Best for** | Static sites | Next.js/React |

**Recommendation:** Both are excellent. Choose based on preference:
- **Netlify:** Slightly simpler UI, great for static sites
- **Vercel:** Faster builds, better for React/Next.js

---

## 🚀 Quick Deploy Commands

### Netlify (One Command):
```bash
cd ai-engineer-path
netlify deploy --prod
```

### Vercel (One Command):
```bash
cd ai-engineer-path
vercel --prod
```

---

## 📝 Environment Variables (If Needed Later)

Currently, your app doesn't use environment variables. If you add API keys later:

### Netlify:
```bash
netlify env:set API_KEY "your-key-here"
```

Or in dashboard: **Site settings** → **Environment variables**

### Vercel:
```bash
vercel env add API_KEY
```

Or in dashboard: **Project Settings** → **Environment Variables**

**Important:** Prefix with `VITE_` to expose to client:
```
VITE_API_KEY=your-key
```

Access in code:
```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## 🎉 You're Live!

After deployment, share your learning dashboard:

- 📱 **Mobile-friendly** - works on all devices
- 🔒 **Secure** - HTTPS by default
- ⚡ **Fast** - CDN-powered globally
- 💾 **Persistent** - localStorage saves progress
- 🐍 **Python-ready** - Pyodide works in production

**Example URLs:**
- Netlify: `https://ai-engineer-path.netlify.app`
- Vercel: `https://ai-engineer-path.vercel.app`
- Custom: `https://learn.yourdomain.com`

---

## 📚 Additional Resources

- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)

---

**Need help?** Check deployment logs in Netlify/Vercel dashboard for detailed error messages.

**Happy deploying! 🚀**