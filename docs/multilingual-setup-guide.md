# 🌐 Multi-Language README Configuration Guide

This guide provides detailed instructions for implementing and managing multi-language README files in your blog project, along with proper repository variable configuration.

## 📋 Overview

This project now supports five languages:
- **English** (`README.md`) - Primary/canonical version
- **Simplified Chinese** (`README-zhCN.md`)
- **Traditional Chinese** (`README-zhTW.md`)
- **Japanese** (`README-JP.md`)
- **Korean** (`README-ko.md`)

## 🚀 Quick Implementation

### Step 1: Verify Multi-Language Files

Ensure all language versions are present in your repository root:

```bash
# Check if all README files exist
ls -la README*.md

# Expected output:
# README.md          (English - Primary)
# README-zhCN.md     (Simplified Chinese)
# README-zhTW.md     (Traditional Chinese)
# README-JP.md       (Japanese)
# README-ko.md       (Korean)
```

### Step 2: Update Repository Variables

Navigate to your GitHub repository: **Settings > Secrets and variables > Actions > Variables**

#### Required Variables

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `SITE_TITLE` | Website title | `My Personal Blog` |
| `SITE_SUBTITLE` | Website subtitle | `Recording life, sharing technology` |
| `SITE_DESCRIPTION` | Website description | `Personal blog based on Hexo and AnZhiYu theme` |
| `AUTHOR_NAME` | Author name | `Your Name` |
| `SITE_URL` | Website URL | `https://yourusername.github.io/blog` |
| `SITE_ROOT` | Root path | `/blog/` |
| `SITE_LANGUAGE` | Default language | `en` (or `zh-CN`, `zh-TW`, `ja`, `ko`) |
| `TIMEZONE` | Timezone | `UTC` (or `Asia/Shanghai`, `Asia/Tokyo`, etc.) |

#### Optional Variables for Enhanced Features

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `SITE_KEYWORDS` | SEO keywords | `blog,hexo,anzhiyu,personal` |
| `GITHUB_USERNAME` | GitHub username | `yourusername` |
| `AVATAR_URL` | Avatar image URL | `https://avatars.githubusercontent.com/u/xxx` |

### Step 3: Configure Comment System (Optional)

If you want to enable comments, add these to **Secrets** (not Variables):

#### For Valine
- `VALINE_APP_ID`: Your LeanCloud App ID
- `VALINE_APP_KEY`: Your LeanCloud App Key

#### For Waline
- `WALINE_SERVER_URL`: Your Waline server URL

#### For Giscus
- `GISCUS_REPO`: Repository in format `owner/repo`
- `GISCUS_REPO_ID`: Repository ID from Giscus
- `GISCUS_CATEGORY_ID`: Category ID from Giscus

## 🔧 Advanced Configuration

### Language-Specific Customization

Each README file can be customized for its target audience:

1. **Cultural Adaptation**: Adjust examples and references to be culturally relevant
2. **Technical Terms**: Use appropriate technical terminology for each language
3. **Contact Information**: Provide language-specific support channels if available

### Automated Language Detection

You can enhance the user experience by adding language detection:

```html
<!-- Add to your blog's header -->
<script>
function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const langMap = {
        'zh-CN': 'README-zhCN.md',
        'zh-TW': 'README-zhTW.md',
        'ja': 'README-JP.md',
        'ko': 'README-ko.md'
    };
    
    if (langMap[userLang] && window.location.pathname.includes('README.md')) {
        // Suggest appropriate language version
        console.log(`Consider viewing: ${langMap[userLang]}`);
    }
}
</script>
```

## 🔐 Security Best Practices

### Variables vs Secrets

**Use Variables for:**
- Public information (site title, author name, URLs)
- Non-sensitive configuration data
- Information that can be visible in logs

**Use Secrets for:**
- API keys and tokens
- Database credentials
- Private configuration data

### Variable Naming Convention

Follow these conventions for consistency:
- Use `UPPERCASE_WITH_UNDERSCORES`
- Prefix related variables (e.g., `SITE_*`, `VALINE_*`)
- Keep names descriptive but concise

## 📝 Maintenance Guidelines

### Keeping Translations Updated

1. **Primary Language**: Always update `README.md` (English) first
2. **Translation Updates**: Update other language versions to match
3. **Version Control**: Use git tags to track translation versions

### Content Synchronization

Create a checklist for updates:

```markdown
## Update Checklist
- [ ] Update README.md (English)
- [ ] Update README-zhCN.md (Simplified Chinese)
- [ ] Update README-zhTW.md (Traditional Chinese)
- [ ] Update README-JP.md (Japanese)
- [ ] Update README-ko.md (Korean)
- [ ] Verify all links work in each language
- [ ] Test deployment with new content
```

### Quality Assurance

1. **Language Review**: Have native speakers review translations
2. **Link Testing**: Ensure all links work in each language version
3. **Format Consistency**: Maintain consistent formatting across all versions

## 🚨 Migration from Old Variables

### Important Variable Changes

If you're migrating from an older version, note these changes:

**Old Variable** → **New Variable**
- `GITHUB_URL` → Use `GITHUB_USERNAME` instead
- `REPO_NAME` → Derived from repository settings
- `DEPLOY_REPO` → Auto-configured from repository

### Migration Steps

1. **Backup Current Variables**:
   ```bash
   # Export current variables (manual backup)
   # Go to Settings > Secrets and variables > Actions
   # Document all current variables
   ```

2. **Update Variable Names**:
   - Remove deprecated variables
   - Add new required variables
   - Update any custom scripts that reference old variables

3. **Test Deployment**:
   ```bash
   # Trigger a test deployment
   git commit --allow-empty -m "Test deployment with new variables"
   git push origin main
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Missing Language Files**
   ```bash
   # Error: README-xx.md not found
   # Solution: Ensure all language files are committed to repository
   git add README-*.md
   git commit -m "Add missing language files"
   ```

2. **Variable Not Found**
   ```bash
   # Error: Variable SITE_TITLE not defined
   # Solution: Add variable in GitHub repository settings
   ```

3. **Encoding Issues**
   ```bash
   # Ensure all files use UTF-8 encoding
   file -bi README-*.md
   ```

### Debug Mode

Enable debug mode in your deployment:

```yaml
# In .github/workflows/deploy.yml
- name: Debug Variables
  run: |
    echo "SITE_TITLE: ${{ vars.SITE_TITLE }}"
    echo "AUTHOR_NAME: ${{ vars.AUTHOR_NAME }}"
    echo "SITE_URL: ${{ vars.SITE_URL }}"
```

## 📞 Support

If you encounter issues with multi-language setup:

1. **Check Documentation**: Review this guide and project documentation
2. **GitHub Issues**: Search existing issues or create a new one
3. **Community Support**: Join discussions for community help

## 🎯 Next Steps

After implementing multi-language support:

1. **SEO Optimization**: Add language meta tags to your blog
2. **Analytics**: Track usage by language
3. **Content Strategy**: Plan language-specific content
4. **Community Building**: Engage with international users

## 🛠️ Implementation Tutorial

### Complete Step-by-Step Setup

#### Phase 1: Repository Preparation

1. **Fork and Clone the Repository**
   ```bash
   # Fork the repository on GitHub first
   git clone https://github.com/yourusername/blog.git
   cd blog
   ```

2. **Verify Multi-Language Files**
   ```bash
   # Check if all README files are present
   ls -la README*.md

   # If any are missing, they should be created automatically
   # or you can copy them from the original repository
   ```

#### Phase 2: GitHub Repository Configuration

1. **Access Repository Settings**
   - Go to your GitHub repository
   - Click on **Settings** tab
   - Navigate to **Secrets and variables** → **Actions**

2. **Configure Repository Variables**

   Click on **Variables** tab and add the following:

   **Basic Configuration:**
   ```
   SITE_TITLE = "Your Blog Title"
   SITE_SUBTITLE = "Your Blog Subtitle"
   SITE_DESCRIPTION = "Your blog description"
   AUTHOR_NAME = "Your Name"
   SITE_URL = "https://yourusername.github.io/blog"
   SITE_ROOT = "/blog/"
   ```

   **Localization Settings:**
   ```
   SITE_LANGUAGE = "en"  # or zh-CN, zh-TW, ja, ko
   TIMEZONE = "UTC"      # or Asia/Shanghai, Asia/Tokyo, etc.
   ```

   **Optional SEO Variables:**
   ```
   SITE_KEYWORDS = "blog,hexo,anzhiyu,personal,technology"
   GITHUB_USERNAME = "yourusername"
   ```

#### Phase 3: Comment System Setup (Optional)

If you want to enable comments, configure in **Secrets** tab:

1. **For Valine (LeanCloud)**
   ```
   VALINE_APP_ID = "your_leancloud_app_id"
   VALINE_APP_KEY = "your_leancloud_app_key"
   ```

2. **For Waline**
   ```
   WALINE_SERVER_URL = "https://your-waline-server.vercel.app"
   ```

3. **For Giscus (GitHub Discussions)**
   ```
   GISCUS_REPO = "yourusername/blog"
   GISCUS_REPO_ID = "your_repo_id"
   GISCUS_CATEGORY_ID = "your_category_id"
   ```

#### Phase 4: Enable GitHub Pages

1. **Configure GitHub Pages**
   - In repository Settings → Pages
   - Source: Select **GitHub Actions**
   - Save the configuration

2. **Verify Workflow File**
   ```bash
   # Check if .github/workflows/deploy.yml exists
   ls -la .github/workflows/
   ```

#### Phase 5: Deploy and Test

1. **Initial Deployment**
   ```bash
   # Make a small change to trigger deployment
   echo "# Multi-language blog setup complete" >> DEPLOYMENT_LOG.md
   git add .
   git commit -m "feat: enable multi-language documentation"
   git push origin main
   ```

2. **Monitor Deployment**
   - Go to **Actions** tab in your repository
   - Watch the deployment process
   - Check for any errors in the logs

3. **Verify Multi-Language Support**
   - Visit your blog: `https://yourusername.github.io/blog`
   - Check that all README files are accessible
   - Test language switching functionality

### 🔧 Advanced Customization

#### Custom Language Selector

Add a language selector to your blog:

```html
<!-- Language Selector Component -->
<div class="language-selector">
  <select onchange="switchLanguage(this.value)">
    <option value="en">English</option>
    <option value="zh-CN">简体中文</option>
    <option value="zh-TW">繁體中文</option>
    <option value="ja">日本語</option>
    <option value="ko">한국어</option>
  </select>
</div>

<script>
function switchLanguage(lang) {
  const langMap = {
    'en': '/README.md',
    'zh-CN': '/README-zhCN.md',
    'zh-TW': '/README-zhTW.md',
    'ja': '/README-JP.md',
    'ko': '/README-ko.md'
  };

  if (langMap[lang]) {
    window.open(langMap[lang], '_blank');
  }
}
</script>
```

#### Language-Specific Configuration

Create language-specific configuration files:

```yaml
# _config.en.yml
title: "My Personal Blog"
description: "Recording life, sharing technology"

# _config.zh-CN.yml
title: "我的个人博客"
description: "记录生活，分享技术"

# _config.ja.yml
title: "私の個人ブログ"
description: "生活を記録し、技術を共有"
```

## 📊 Analytics and Monitoring

### Track Multi-Language Usage

1. **Google Analytics Setup**
   ```javascript
   // Track language preference
   gtag('config', 'GA_MEASUREMENT_ID', {
     custom_map: {'custom_parameter_1': 'language'}
   });

   gtag('event', 'page_view', {
     'custom_parameter_1': document.documentElement.lang
   });
   ```

2. **Language Usage Metrics**
   - Monitor which language versions are most popular
   - Track user engagement by language
   - Identify content gaps in specific languages

### Performance Monitoring

```yaml
# Add to .github/workflows/deploy.yml
- name: Performance Check
  run: |
    echo "Checking README file sizes..."
    ls -lh README*.md

    echo "Validating UTF-8 encoding..."
    file -bi README*.md

    echo "Checking for broken links..."
    # Add link checker tool here
```

---

**Happy blogging in multiple languages!** 🌍
