# 📋 Configuration Priority and Deployment Guide

This guide explains the configuration file hierarchy and deployment methods in your Hexo blog project.

## 🏗️ Configuration File Priority

### 1. **Root Configuration** (`_config.yml`) - **HIGHEST PRIORITY**
- **Location**: Project root directory
- **Purpose**: Hexo core configuration
- **Controls**: Site-wide settings, URL structure, plugins, deployment
- **Overrides**: Any conflicting settings in theme configuration

### 2. **Theme Configuration** (`themes/anzhiyu/_config.yml`) - **LOWER PRIORITY**
- **Location**: Theme directory
- **Purpose**: Theme-specific settings
- **Controls**: Appearance, features, theme plugins, UI components
- **Overridden by**: Root configuration file

### Configuration Hierarchy Example:
```
_config.yml (ROOT)           ← HIGHEST PRIORITY
├── Site settings
├── URL configuration  
├── Plugin settings
└── Deployment settings

themes/anzhiyu/_config.yml   ← LOWER PRIORITY
├── Theme appearance
├── Menu configuration
├── Comment systems
└── Theme features
```

## 🚀 Deployment Methods Comparison

### Current Setup: GitHub Actions Deployment

Your project uses **GitHub Actions** for deployment, which is more modern and automated.

#### How it works:
1. **Trigger**: Push to `main` branch
2. **Process**: GitHub Actions workflow (`.github/workflows/deploy.yml`)
3. **Build**: Generates static files in the cloud
4. **Deploy**: Directly to GitHub Pages
5. **Branch**: No `gh-pages` branch needed

#### Advantages:
- ✅ Fully automated
- ✅ No local build required
- ✅ Environment variables support
- ✅ Better security (secrets management)
- ✅ Build logs and error tracking

### Traditional Deployment (Not Currently Used)

The `deploy` section in `_config.yml` is for traditional deployment:

```yaml
deploy:
  type: git
  repo: https://github.com/twj0/blog.git
  branch: gh-pages
```

#### How it would work:
1. **Command**: `hexo deploy` (manual)
2. **Process**: Local build and push
3. **Build**: Generates files locally
4. **Deploy**: Pushes to `gh-pages` branch
5. **Branch**: Requires `gh-pages` branch

#### Disadvantages:
- ❌ Manual process
- ❌ Requires local environment setup
- ❌ No environment variables
- ❌ Less secure (credentials on local machine)

## 🔧 Configuration Best Practices

### 1. **Root Configuration (`_config.yml`)**

Use for site-wide settings:

```yaml
# Site Information
title: Your Blog Title
subtitle: Your Subtitle
description: Your Description
author: Your Name
language: en
timezone: UTC

# URL Configuration
url: https://yourusername.github.io/blog
root: /blog/
permalink: :year/:month/:day/:title/

# Theme Selection
theme: anzhiyu

# Deployment (for reference only with GitHub Actions)
deploy:
  type: git
  repo: https://github.com/yourusername/blog.git
  branch: gh-pages
```

### 2. **Theme Configuration (`themes/anzhiyu/_config.yml`)**

Use for theme-specific settings:

```yaml
# Menu Configuration
menu:
  Home: / || fas fa-home
  Archives: /archives/ || fas fa-archive
  Tags: /tags/ || fas fa-tags
  Categories: /categories/ || fas fa-folder-open
  About: /about/ || fas fa-heart

# Social Links
social:
  GitHub: https://github.com/yourusername || fab fa-github
  Email: mailto:your@email.com || fas fa-envelope

# Comment System
comments:
  use: valine
  # ... other comment settings

# Theme Colors
theme_color:
  enable: true
  main: "#49b1f5"
  paginator: "#00c4b6"
```

## 🔄 Migration from Traditional to GitHub Actions

If you were previously using traditional deployment:

### Step 1: Backup Current Setup
```bash
# Backup your current configuration
cp _config.yml _config.yml.backup
cp themes/anzhiyu/_config.yml themes/anzhiyu/_config.yml.backup
```

### Step 2: Update Repository Settings
1. Go to **Settings > Pages**
2. Change Source from "Deploy from a branch" to "GitHub Actions"
3. Save settings

### Step 3: Configure Environment Variables
1. Go to **Settings > Secrets and variables > Actions**
2. Add required variables (see multilingual setup guide)

### Step 4: Remove Manual Deployment
```bash
# Remove hexo-deployer-git if installed
npm uninstall hexo-deployer-git --save
```

### Step 5: Test GitHub Actions Deployment
```bash
# Make a test commit
git add .
git commit -m "test: switch to GitHub Actions deployment"
git push origin main
```

## 🔍 Troubleshooting Configuration Issues

### Common Problems:

1. **Settings Not Taking Effect**
   ```bash
   # Clear Hexo cache
   hexo clean
   
   # Regenerate
   hexo generate
   ```

2. **Theme Settings Override Site Settings**
   - Check if the same setting exists in both files
   - Move important settings to root `_config.yml`

3. **Deployment Configuration Confusion**
   - With GitHub Actions: `deploy` section in `_config.yml` is ignored
   - For manual deployment: Use `hexo deploy` command

### Debug Configuration:
```bash
# Check current configuration
hexo config

# Validate YAML syntax
npx js-yaml _config.yml
npx js-yaml themes/anzhiyu/_config.yml
```

## 📊 Configuration Override Examples

### Example 1: URL Configuration
```yaml
# _config.yml (ROOT) - WINS
url: https://yourusername.github.io/blog
root: /blog/

# themes/anzhiyu/_config.yml - IGNORED if same setting exists in root
url: https://example.com  # This will be ignored
```

### Example 2: Language Settings
```yaml
# _config.yml (ROOT) - WINS
language: en

# themes/anzhiyu/_config.yml - IGNORED
language: zh-CN  # This will be ignored
```

### Example 3: Theme-Specific Settings
```yaml
# _config.yml (ROOT) - No theme-specific settings here

# themes/anzhiyu/_config.yml - ACTIVE
menu:
  Home: / || fas fa-home
  About: /about/ || fas fa-heart
```

## 🎯 Recommendations

### For Your Current Setup:

1. **Keep GitHub Actions Deployment** - It's more modern and reliable
2. **Use Root Config for Site Settings** - Title, URL, author, etc.
3. **Use Theme Config for Appearance** - Menu, colors, features
4. **Document Your Changes** - Keep track of customizations
5. **Test Thoroughly** - Always test after configuration changes

### Configuration Checklist:
- [ ] Site information in `_config.yml`
- [ ] Theme selection in `_config.yml`
- [ ] Menu and navigation in theme config
- [ ] Social links in theme config
- [ ] Comment system in theme config
- [ ] GitHub Actions workflow configured
- [ ] Environment variables set in GitHub
- [ ] Local testing works
- [ ] Deployment successful

---

**Remember**: With GitHub Actions deployment, the `deploy` section in `_config.yml` is for reference only and not actively used!
