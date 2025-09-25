# 🚀 개인 블로그 템플릿

[![Deploy Status](https://github.com/twj0/blog/workflows/Deploy%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/twj0/blog/actions)
[![Hexo Version](https://img.shields.io/badge/Hexo-7.3.0-blue)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-AnZhiYu-orange)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Hexo** + **AnZhiYu** 테마 기반의 개인 블로그 템플릿으로, **GitHub Actions** 자동 배포를 지원하여 나만의 개인 블로그를 빠르게 구축할 수 있습니다!

## 🌐 다국어 문서

- [English](README.md)
- [简体中文](README-zhCN.md)
- [繁體中文](README-zhTW.md)
- [日本語](README-JP.md)
- [한국어](README-ko.md) (현재)

## ✨ 특징

- 🎨 **모던한 디자인** - AnZhiYu 테마 기반의 아름답고 세련된 인터페이스
- 🚀 **멀티플랫폼 자동 배포** - GitHub Pages와 Cloudflare Pages에 동시 배포
- 🌐 **듀얼 CDN 가속** - 글로벌 액세스 최적화, 다중 배포 대상
- 📱 **반응형 레이아웃** - 데스크톱과 모바일 기기에 완벽 대응
- 💬 **다중 댓글 시스템** - Valine, Waline, Giscus 등 지원
- 🔍 **검색 기능** - 내장 로컬 검색으로 콘텐츠 빠른 검색
- 📊 **데이터 통계** - 다양한 웹사이트 분석 도구 지원
- 🌙 **다크 모드** - 다크/라이트 테마 자동 전환
- ⚡ **성능 최적화** - 이미지 지연 로딩, 코드 하이라이팅 등 최적화
- 🔄 **콘텐츠 동기화** - 모든 플랫폼에서 콘텐츠 자동 동기화

## 🎯 빠른 시작

### 방법 1: 원클릭 배포 (권장)

1. **이 저장소 포크**
   ```bash
   우측 상단의 "Fork" 버튼 클릭
   ```

2. **개인 정보 설정**
   ```bash
   # 로컬에 클론
   git clone https://github.com/twj0/blog.git
   cd blog
   
   # 의존성 설치
   npm install
   
   # 설정 마법사 실행
   npm run setup
   ```

3. **GitHub Pages 활성화**
   - 저장소 Settings > Pages로 이동
   - Source에서 "GitHub Actions" 선택
   - 설정 저장

4. **코드 푸시하여 자동 배포**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

5. **블로그 접속**
   ```
   https://yourusername.github.io/blog
   ```

### 방법 2: 수동 설정

<details>
<summary>수동 설정 단계 펼치기</summary>

1. **저장소 클론**
   ```bash
   git clone https://github.com/yourusername/blog.git
   cd blog
   npm install
   ```

2. **기본 정보 설정**
   
   설정 템플릿 복사:
   ```bash
   cp _config.template.yml _config.yml
   cp themes/anzhiyu/_config.template.yml themes/anzhiyu/_config.yml
   ```
   
   `_config.yml` 파일을 편집하여 다음 설정 수정:
   ```yaml
   title: 당신의 블로그 제목
   author: 당신의 이름
   url: https://yourusername.github.io/your-blog-repo
   ```

3. **테마 설정**
   
   `themes/anzhiyu/_config.yml`을 편집하여 커스터마이징:
   - 아바타와 소셜 링크
   - 메뉴 네비게이션
   - 댓글 시스템
   - 웹사이트 스타일

4. **로컬 미리보기**
   ```bash
   npm run server
   ```

5. **GitHub Pages에 배포**
   ```bash
   npm run deploy
   ```

</details>

## 📝 작성 가이드

### 새 글 작성

```bash
# 새 글 작성
npx hexo new "글 제목"

# 새 페이지 작성
npx hexo new page "페이지 이름"
```

### 글 형식

```markdown
---
title: 글 제목
date: 2025-01-01 12:00:00
tags: 
  - 태그1
  - 태그2
categories: 
  - 카테고리명
cover: 커버 이미지 URL
description: 글 설명
---

글 내용...
```

### 로컬 미리보기

```bash
# 로컬 서버 시작
npm run server

# 캐시 정리 후 시작
npm run dev

# 정적 파일 생성 후 미리보기
npm run preview
```

## ⚙️ 설정

### 환경 변수 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 설정:

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `SITE_TITLE` | 웹사이트 제목 | 나의 개인 블로그 |
| `SITE_SUBTITLE` | 웹사이트 부제목 | 생활을 기록하고, 기술을 공유 |
| `SITE_DESCRIPTION` | 웹사이트 설명 | Hexo와 AnZhiYu 테마 기반 개인 블로그 |
| `AUTHOR_NAME` | 작성자 이름 | 당신의 이름 |
| `SITE_URL` | 웹사이트 URL | https://username.github.io/repo |
| `SITE_ROOT` | 루트 경로 | /repo/ |

### 댓글 시스템 설정

다중 댓글 시스템 지원, Secrets에서 해당 매개변수 설정:

- **Valine**: `VALINE_APP_ID`, `VALINE_APP_KEY`
- **Waline**: `WALINE_SERVER_URL`
- **Giscus**: `GISCUS_REPO`, `GISCUS_REPO_ID`, `GISCUS_CATEGORY_ID`

자세한 설정은 다음을 참조: [설정 체크리스트](docs/configuration-checklist.md)

## 🛠️ 고급 기능

### 커스텀 도메인

1. `source/` 디렉토리에 `CNAME` 파일 생성
2. 파일 내용을 당신의 도메인으로 설정, 예: `blog.example.com`
3. 도메인 DNS 설정에서 CNAME 레코드를 `username.github.io`로 추가

### 플러그인 추가

```bash
# 플러그인 설치
npm install hexo-plugin-name --save

# _config.yml에서 플러그인 설정
```

### 테마 커스터마이징

- `themes/anzhiyu/_config.yml` 설정 파일 수정
- `themes/anzhiyu/source/css/`에 커스텀 스타일 추가
- 자세한 설명: [테마 커스터마이징 가이드](docs/theme-customization.md)

## 📚 문서

- [📋 설정 체크리스트](docs/configuration-checklist.md)
- [🏗️ 프로젝트 구조](docs/project-structure.md)
- [🚀 빠른 시작 가이드](docs/quick-start.md)
- [🔧 문제 해결 가이드](docs/troubleshooting.md)

## 🤝 기여

Issue와 Pull Request를 환영합니다!

1. 이 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 열기

## 📄 라이선스

이 프로젝트는 [MIT](LICENSE) 라이선스 하에 오픈소스입니다.

## 🙏 감사의 말

- [Hexo](https://hexo.io/) - 빠르고 간단하며 강력한 블로그 프레임워크
- [AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) - 깔끔하고 아름다운 Hexo 테마
- [GitHub Pages](https://pages.github.com/) - 무료 정적 웹사이트 호스팅 서비스

## 📞 지원

이 프로젝트가 도움이 되었다면 ⭐ Star를 눌러주세요!

질문이 있으신가요? 언제든지:
- 📧 [Issue 제출](../../issues)
- 💬 [토론 참여](../../discussions)
- 📖 [문서 보기](docs/)

---

**블로그 여행을 시작하세요!** 🎉
