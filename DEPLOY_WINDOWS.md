# 🚀 Windows Deployment Guide - AI Engineer Path

**Quick deployment guide specifically for Windows PowerShell users.**

---

## ⚡ Fastest Method: GitHub + Netlify Dashboard (No CLI Needed)

This is the **easiest way** to deploy on Windows - no command line issues!

### Step 1: Push to GitHub

```powershell
# Navigate to project
cd ai-engineer-path

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Engineer Path"

# Create main branch
git branch -M main
```

**Now create a GitHub repository:**
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ai-engineer-path`
3. Keep it **Public** (or Private if you prefer)
4. **Don't** initialize with README (we already have files)
5. Click **"Create repository"**

**Push your code:**
```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ai-engineer-path.git
git push -u origin main
```

### Step 2: Deploy on Netlify

1. **Go to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign up/login (use GitHub account for easy connection)

2. **Import Project:**
   - Click **"Add new site"** button
   - Select **"Import an existing project"**
   - Click **"Deploy with GitHub"**

3. **Authorize & Select:**
   - Authorize Netlify to access GitHub
   - Find and select your `ai-engineer-path` repository

4. **Configure Build (Auto-detected):**
   - **Build command:** `npm run build` ✅ (auto-filled)
   - **Publish directory:** `dist` ✅ (auto-filled)
   - **Branch:** `main` ✅
   
   These are automatically detected from your `netlify.toml` file!

5. **Deploy:**
   - Click **"Deploy ai-engineer-path"**
   - Wait 2-3 minutes for build
   - ✅ **Done!** Your site is live!

**You'll get a URL like:**
```
https://ai-engineer-path-abc123.netlify.app
```

---

## 🎯 Alternative: Vercel Dashboard (Also Easy)

### Step 1: Push to GitHub (Same as Above)

If you already pushed to GitHub for Netlify, skip this step.

### Step 2: Deploy on Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Click **"Import Git Repository"**
   - Select your `ai-engineer-path` repository

3. **Configure (Auto-detected):**
   - **Framework Preset:** Vite ✅
   - **Build Command:** `npm run build` ✅
   - **Output Directory:** `dist` ✅
   - **Install Command:** `npm install` ✅
   
   All auto-detected from `vercel.json`!

4. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - ✅ **Live!**

**You'll get a URL like:**
```
https://ai-engineer-path.vercel.app
```

---

## 🔄 Automatic Updates

After initial deployment, every time you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Update content"
git push origin main
```

**Netlify/Vercel automatically rebuilds and deploys!** 🎉

No manual deployment needed - just push to GitHub.

---

## 🛠️ If You Want to Use CLI (Optional)

If you prefer command line, here's the Windows-compatible way:

### Netlify CLI (PowerShell)

```powershell
# Install globally
npm install -g netlify-cli

# Navigate to project
cd ai-engineer-path

# Login (opens browser)
npx netlify login

# Deploy
npx netlify deploy --prod
```

**Note:** Use `npx netlify` instead of just `netlify` on Windows if PATH issues occur.

### Vercel CLI (PowerShell)

```powershell
# Install globally
npm install -g vercel

# Navigate to project
cd ai-engineer-path

# Login
npx vercel login

# Deploy
npx vercel --prod
```

---

## ✅ Verify Deployment

After deployment, test these:

1. **Homepage loads** - Progress ring visible
2. **Navigation works** - Click phases/topics
3. **Practice Console** - Click green button, wait for Pyodide
4. **Search** - Type in search bar
5. **Notes** - Write notes, refresh page (should persist)
6. **Mobile** - Open on phone browser

---

## 🎨 Customize Your Site

### Change Site Name (Netlify)

1. Go to **Site settings**
2. Click **"Change site name"**
3. Enter new name: `my-ai-learning`
4. New URL: `https://my-ai-learning.netlify.app`

### Change Site Name (Vercel)

1. Go to **Project Settings**
2. Click **"Domains"**
3. Add custom domain or change project name

---

## 🐛 Troubleshooting

### Build Fails

**Test locally first:**
```powershell
cd ai-engineer-path
npm run build
```

If this works locally, deployment will work.

### "Command not found" Errors

Use `npx` prefix:
- ❌ `netlify login`
- ✅ `npx netlify login`

### PowerShell `&&` Error

PowerShell doesn't support `&&`. Use separate commands:
```powershell
# Instead of: cd folder && command
# Do this:
cd folder
command
```

Or use semicolon:
```powershell
cd folder; command
```

---

## 📊 Deployment Comparison

| Method | Difficulty | Time | Best For |
|--------|-----------|------|----------|
| **GitHub + Netlify Dashboard** | ⭐ Easy | 5 min | Windows users |
| **GitHub + Vercel Dashboard** | ⭐ Easy | 5 min | Windows users |
| **Netlify CLI** | ⭐⭐ Medium | 3 min | CLI lovers |
| **Vercel CLI** | ⭐⭐ Medium | 3 min | CLI lovers |

**Recommendation for Windows:** Use GitHub + Dashboard method (easiest, no CLI issues).

---

## 🎉 You're Live!

After deployment:

- ✅ **Share your URL** with anyone
- ✅ **Access from any device** (mobile, tablet, desktop)
- ✅ **Progress saves** in browser localStorage
- ✅ **Auto-deploys** on every git push
- ✅ **Free SSL** (HTTPS) included
- ✅ **Fast CDN** delivery worldwide

---

## 📝 Quick Reference

### Push Updates
```powershell
git add .
git commit -m "Your message"
git push origin main
```

### Check Deployment Status
- **Netlify:** [app.netlify.com](https://app.netlify.com) → Your site → Deploys
- **Vercel:** [vercel.com/dashboard](https://vercel.com/dashboard) → Your project → Deployments

### View Live Site
- Click the URL in Netlify/Vercel dashboard
- Or visit: `https://your-site-name.netlify.app`

---

## 🆘 Need Help?

1. **Check deployment logs** in Netlify/Vercel dashboard
2. **Test build locally:** `npm run build`
3. **Check GitHub** - code pushed successfully?
4. **Browser console** - any errors on live site?

---

**Happy deploying! 🚀**

Your AI learning dashboard will be live and accessible worldwide in minutes!