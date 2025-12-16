/**
 * 安知鱼壁纸插件初始化
 * 防止重复初始化
 */
(function () {
  if (window.__ANZHIYU_WALLPAPER_INITED__) return;
  window.__ANZHIYU_WALLPAPER_INITED__ = true;

  var config = window.anzhiyuWallpaperConfig || {};
  if (!config.enable) return;

  try {
    document.documentElement.classList.add("anzhiyu-wallpaper-enabled");
  } catch (e) {}

  var storageKey = config.customStorageKey || "anzhiyu_wallpaper_custom";
  var customUrl = null;
  try {
    customUrl = localStorage.getItem(storageKey);
  } catch (e) {}

  /**
   * 设置CSS壁纸变量
   * @param {string} url - 壁纸图片URL地址
   */
  function setCssWallpaper(url) {
    if (!url) return;
    document.documentElement.style.setProperty("--anzhiyu-wallpaper", "url('" + url + "')");
  }

  /**
   * 获取当前CSS壁纸变量值
   * @returns {string} 当前设置的壁纸URL
   */
  function getCurrentCssWallpaper() {
    try {
      return getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-wallpaper").trim();
    } catch (e) {
      return "";
    }
  }

  /**
   * 获取现有的内联或计算背景URL
   * @returns {string} 现有的背景图片URL
   */
  function getExistingInlineOrComputedBgUrl() {
    try {
      var el = document.getElementById("web_bg") || document.body;
      if (!el) return "";
      var inlineBg = el.style && (el.style.backgroundImage || el.style.background);
      if (inlineBg) return String(inlineBg);
      var computedBg = window.getComputedStyle(el).getPropertyValue("background-image");
      return computedBg ? String(computedBg) : "";
    } catch (e) {
      return "";
    }
  }

  /**
   * 判断是否应该尊重现有的CSS壁纸设置
   * @returns {boolean} 是否应该尊重现有设置
   */
  function shouldRespectExistingCss() {
    if (config.respectExisting === false) return false;
    var current = getCurrentCssWallpaper();
    if (!current) return false;
    if (!config.defaultUrl) return false;
    return current.indexOf(config.defaultUrl) === -1;
  }

  /**
   * 判断是否应该尊重现有的DOM背景设置
   * @returns {boolean} 是否应该尊重现有DOM背景设置
   */
  function shouldRespectExistingDomBg() {
    if (config.respectExisting === false) return false;
    var existing = getExistingInlineOrComputedBgUrl();
    if (!existing) return false;
    if (!config.defaultUrl) return false;
    return existing.indexOf(config.defaultUrl) === -1;
  }

  // 如果存在自定义URL则直接使用并返回
  if (customUrl) {
    setCssWallpaper(customUrl);
    return;
  }

  if (config.customUrl) {
    setCssWallpaper(config.customUrl);
    return;
  }

  // 如果应该尊重现有CSS设置则返回
  if (shouldRespectExistingCss()) {
    return;
  }

  var mode = config.mode || "daily";
  var cacheKey = "anzhiyu_wallpaper_cache";
  var cacheMetaKey = "anzhiyu_wallpaper_cache_meta";

  /**
   * 获取当前ISO格式时间字符串
   * @returns {string} ISO格式的时间字符串
   */
  function nowIso() {
    return new Date().toISOString();
  }

  /**
   * 获取今天的日期键值（YYYY-MM-DD格式）
   * @returns {string} 今天的日期键值
   */
  function getTodayKey() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    return yyyy + "-" + mm + "-" + dd;
  }

  /**
   * 获取当前小时的键值（YYYY-MM-DD-HH格式）
   * @returns {string} 当前小时的键值
   */
  function getHourKey() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    var hh = String(d.getHours()).padStart(2, "0");
    return yyyy + "-" + mm + "-" + dd + "-" + hh;
  }

  /**
   * 获取缓存元数据
   * @returns {Object|null} 缓存元数据对象或null
   */
  function getCacheMeta() {
    try {
      var raw = localStorage.getItem(cacheMetaKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * 设置缓存
   * @param {string} url - 要缓存的URL
   * @param {Object} meta - 元数据对象
   */
  function setCache(url, meta) {
    try {
      localStorage.setItem(cacheKey, url);
      localStorage.setItem(cacheMetaKey, JSON.stringify(meta || { updatedAt: nowIso() }));
    } catch (e) {}
  }

  /**
   * 获取缓存的壁纸URL
   * @returns {string|null} 缓存的壁纸URL或null
   */
  function getCache() {
    try {
      return localStorage.getItem(cacheKey);
    } catch (e) {
      return null;
    }
  }

  /**
   * 判断是否需要刷新壁纸
   * @returns {boolean} 是否需要刷新壁纸
   */
  function needRefresh() {
    if (mode === "visit") return true;
    var meta = getCacheMeta();
    if (!meta || !meta.bucket) return true;
    var bucket = meta.bucket;
    if (mode === "daily") return bucket !== getTodayKey();
    if (mode === "hourly") return bucket !== getHourKey();
    return true;
  }

  /**
   * 获取当前时段的键值
   * @returns {string} 当前时段的键值
   */
  function getBucket() {
    if (mode === "daily") return getTodayKey();
    if (mode === "hourly") return getHourKey();
    return nowIso();
  }

  /**
   * 从列表中选择壁纸
   * @param {Array} list - 壁纸URL列表
   * @returns {string|null} 选中的壁纸URL或null
   */
  function pickFromList(list) {
    if (!list || !list.length) return null;
    if (mode === "daily") {
      var day = getTodayKey();
      var sum = 0;
      for (var i = 0; i < day.length; i++) sum += day.charCodeAt(i);
      return list[sum % list.length];
    }
    var idx = Math.floor(Math.random() * list.length);
    return list[idx];
  }

  function providerUrl() {
    var provider = config.provider || "loliapi";

    if (provider === "customList") {
      return Promise.resolve(null);
    }

    if (provider === "xjh") {
      var ctype = config.xjhCtype;
      var url = "https://img.xjh.me/random_img.php?type=bg&return=302";
      if (ctype) url += "&ctype=" + encodeURIComponent(ctype);
      return Promise.resolve(url);
    }

    if (provider === "btstu") {
      var lx = config.btstuType || "fengjing";
      return Promise.resolve("https://api.btstu.cn/sjbz/api.php?lx=" + encodeURIComponent(lx));
    }

    if (provider === "bing") {
      var api = config.bingApi || "https://api.xsot.cn/bing";
      var jump = config.bingJump !== false;
      if (jump) {
        var u = api;
        u += u.indexOf("?") === -1 ? "?jump=true" : "&jump=true";
        return Promise.resolve(u);
      }
      return fetch(api)
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (data) {
          if (!data) return null;
          if (typeof data === "string") return data;
          if (data.url || data.imgurl || data.image) return data.url || data.imgurl || data.image;
          if (data.data && (data.data.url || data.data.imgurl || data.data.image)) {
            return data.data.url || data.data.imgurl || data.data.image;
          }
          if (data.images && data.images[0] && (data.images[0].url || data.images[0].imgurl)) {
            return data.images[0].url || data.images[0].imgurl;
          }
          return null;
        });
    }

    if (provider === "loliapi") {
      var api2 = "https://www.loliapi.com/acg/?type=json";
      return fetch(api2)
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (data) {
          if (!data) return null;
          return data.imgurl || data.url || data.image || null;
        });
    }

    return Promise.resolve(null);
  }

  /**
   * 应用备用壁纸
   */
  function applyFallback() {
    if (config.fallbackUrl) setCssWallpaper(config.fallbackUrl);
  }

  /**
   * 运行壁纸设置主逻辑
   */
  function run() {
    // 如果应该尊重现有DOM背景设置则返回
    if (shouldRespectExistingDomBg()) return;

    var cached = getCache();
    // 如果有缓存且不需要刷新，则使用缓存
    if (cached && !needRefresh()) {
      setCssWallpaper(cached);
      return;
    }

    // 处理自定义列表提供商
    if (config.provider === "customList") {
      var chosen = pickFromList(config.customList);
      if (chosen) {
        setCssWallpaper(chosen);
        setCache(chosen, { bucket: getBucket(), updatedAt: nowIso() });
        return;
      }
      applyFallback();
      return;
    }

    // 通过提供商获取壁纸URL
    providerUrl()
      .then(function (url) {
        if (!url) {
          applyFallback();
          return;
        }
        setCssWallpaper(url);
        setCache(url, { bucket: getBucket(), updatedAt: nowIso() });
      })
      .catch(function () {
        applyFallback();
      });
  }

  /**
   * 暴露到全局的壁纸操作接口
   */
  window.anzhiyuWallpaper = {
    /**
     * 设置自定义壁纸
     * @param {string} url - 自定义壁纸URL
     */
    setCustom: function (url) {
      if (!url) return;
      try {
        localStorage.setItem(storageKey, url);
      } catch (e) {}
      setCssWallpaper(url);
    },
    /**
     * 清除自定义壁纸
     */
    clearCustom: function () {
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {}
      run();
    },
    /**
     * 刷新壁纸
     */
    refresh: function () {
      try {
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheMetaKey);
      } catch (e) {}
      run();
    },
  };

  // DOM加载完成后运行或立即运行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();