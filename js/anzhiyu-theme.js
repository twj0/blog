// 安知鱼主题 JavaScript 功能

document.addEventListener('DOMContentLoaded', function() {
    
    // 导航栏滚动效果
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(13, 17, 23, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(13, 17, 23, 0.8)';
            nav.style.boxShadow = 'none';
        }
        
        // 导航栏隐藏/显示
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // 移动端菜单切换
    const menuBtn = document.querySelector('.menu-btn');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    
    if (menuBtn && mobileSidebar) {
        menuBtn.addEventListener('click', () => {
            mobileSidebar.classList.toggle('active');
        });
        
        // 点击外部关闭侧边栏
        document.addEventListener('click', (e) => {
            if (!mobileSidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileSidebar.classList.remove('active');
            }
        });
    }
    
    // 主题切换功能
    const themeBtn = document.querySelector('.theme-btn');
    const html = document.documentElement;
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // 更新图标
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'icon-theme' : 'icon-sun';
            }
        });
        
        // 加载保存的主题
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
    }
    
    // 搜索功能
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            // 这里可以添加搜索功能
            alert('搜索功能开发中...');
        });
    }
    
    // AI摘要切换
    const aiToggle = document.querySelector('.ai-toggle');
    const aiContent = document.querySelector('.ai-content');
    
    if (aiToggle && aiContent) {
        aiToggle.addEventListener('click', () => {
            const isHidden = aiContent.style.display === 'none';
            aiContent.style.display = isHidden ? 'block' : 'none';
            aiToggle.textContent = isHidden ? '收起' : '展开';
        });
    }
    
    // AI语音播放
    const aiVoice = document.querySelector('.ai-voice');
    
    if (aiVoice) {
        aiVoice.addEventListener('click', () => {
            const text = document.querySelector('.ai-content').textContent;
            
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'zh-CN';
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            } else {
                alert('您的浏览器不支持语音播放功能');
            }
        });
    }
    
    // AI操作按钮
    const aiActions = document.querySelectorAll('.ai-actions button');
    
    aiActions.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.textContent;
            
            switch(true) {
                case action.includes('介绍自己'):
                    alert('你好！我是安知鱼，一个热爱技术和生活的博主。欢迎来到我的博客！');
                    break;
                case action.includes('生成本文简介'):
                    alert('本文介绍了如何创建真正的安知鱼主题风格博客，包括深色主题设计和丰富的交互功能。');
                    break;
                case action.includes('推荐相关文章'):
                    alert('相关文章：\n1. Hexo博客搭建指南\n2. 主题自定义教程\n3. 前端开发技巧');
                    break;
                case action.includes('前往主页'):
                    window.location.href = '/';
                    break;
            }
        });
    });
    
    // 返回顶部功能
    const topBtn = document.querySelector('.bottom-tools .tool-item:last-child');
    
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 显示/隐藏返回顶部按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                topBtn.style.opacity = '1';
                topBtn.style.visibility = 'visible';
            } else {
                topBtn.style.opacity = '0';
                topBtn.style.visibility = 'hidden';
            }
        });
    }
    
    // 目录高亮
    const tocLinks = document.querySelectorAll('.toc-content a');
    const headings = document.querySelectorAll('.post-content h2, .post-content h3');
    
    if (tocLinks.length && headings.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 100) {
                    current = heading.textContent.replace(/[🎨🚀🛠️]/g, '').trim();
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.textContent.includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // 代码复制功能
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(code => {
        const pre = code.parentElement;
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '复制';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--anzhiyu-main);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        pre.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(code.textContent);
                copyBtn.textContent = '已复制';
                setTimeout(() => {
                    copyBtn.textContent = '复制';
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
            }
        });
    });
    
    // 文章阅读进度
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 60px;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--anzhiyu-main);
        z-index: 999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchBtn?.click();
        }
        
        // ESC 关闭侧边栏
        if (e.key === 'Escape') {
            mobileSidebar?.classList.remove('active');
        }
        
        // T 切换主题
        if (e.key === 't' || e.key === 'T') {
            themeBtn?.click();
        }
    });
    
    console.log('🌟 安知鱼主题加载完成！');
});
