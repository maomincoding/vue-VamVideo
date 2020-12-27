// eslint-disable-next-line no-unused-vars
class VamVideo {
  constructor(vp, attrObj, styleObj) {
    this.timer = null;
    this.disX = 0;
    this.disL = 0;
    this.isPageFullScreen = false;
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key) && key !== "controls") {
        this.$(".video-player").setAttribute(key, attrObj[key]);
      }
    }
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        this.$(".video-box").style[`${key}`] = styleObj[key];
        key === "width"
          ? (this.vbw = styleObj.width)
          : (this.vbw = vp.offsetWidth);
        key === "height"
          ? (this.vbh = styleObj.height)
          : (this.vbh = vp.offsetHeight);
      }
    }
  }
  $ = (el) => document.querySelector(el);
  showEl = (el) => {
    this.$(el).style.display = "block";
  };
  hideEl = (el) => {
    this.$(el).style.display = "none";
  };
  setVp = (w, h) => {
    const _w = String(w).indexOf("px") != -1 ? w : w + "px";
    const _h = String(h).indexOf("px") != -1 ? h : h + "px";
    this.$(".video-player").style.width = _w;
    this.$(".video-player").style.height = _h;
    this.$(".video-box").style.width = _w;
    this.$(".video-box").style.height = _h;
    this.$(".pv-bar").style.width = _w;
  };
  nowTime = () => {
    this.$(".pv-currentTime").innerHTML = this.changeTime(
      this.$(".video-player").currentTime
    );
    let scale =
      this.$(".video-player").currentTime / this.$(".video-player").duration;
    let w = this.$(".pv-bar").offsetWidth - this.$(".pv-dot").offsetWidth;
    this.$(".pv-dot").style.left = scale * w + "px";
    this.$(".pv-played").style.width = scale * w + "px";
  };
  changeTime = (iNum) => {
    let iN = parseInt(iNum);
    const iH = this.toZero(Math.floor(iN / 3600));
    const iM = this.toZero(Math.floor((iN % 3600) / 60));
    const iS = this.toZero(Math.floor(iN % 60));
    return iH + ":" + iM + ":" + iS;
  };
  toZero = (num) => {
    if (num <= 9) {
      return "0" + num;
    } else {
      return "" + num;
    }
  };
  // 底部控制栏(显示/隐藏)
  bottomTup = () => {
    this.$(".bottom-tool").style.bottom = "0px";
  };
  bottomTdow = () => {
    this.$(".bottom-tool").style.bottom = "-45px";
  };
  // 播放/暂停
  usePlay = () => {
    if (this.$(".video-player").paused) {
      this.$(".video-player").play();
      this.hideEl(".icon-bofang");
      this.showEl(".icon-zanting");
      this.nowTime();
      this.timer = setInterval(this.nowTime, 1000);
    } else {
      this.$(".video-player").pause();
      this.showEl(".icon-bofang");
      this.hideEl(".icon-zanting");
      clearInterval(this.timer);
    }
  };
  isplay = () => {
    this.usePlay();
  };
  // 总时长
  useOnplay = () => {
    this.$(".pv-duration").innerHTML = this.changeTime(
      this.$(".video-player").duration
    );
  };
  // 播放结束
  useEnd = () => {
    this.showEl(".icon-bofang");
    this.hideEl(".icon-zanting");
  };
  // 静音
  useVolume = () => {
    if (this.$(".video-player").muted) {
      this.$(".video-player").volume = 1;
      this.hideEl(".icon-jingyin");
      this.showEl(".icon-yinliang");
      this.$(".video-player").muted = false;
    } else {
      this.$(".video-player").volume = 0;
      this.showEl(".icon-jingyin");
      this.hideEl(".icon-yinliang");
      this.$(".video-player").muted = true;
    }
  };
  // 页面全屏
  pageFullScreen = () => {
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    const h =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.isPageFullScreen = !this.isPageFullScreen;
    if (this.isPageFullScreen) {
      this.setVp(w, h);
      this.hideEl(".icon-quanping");
      this.showEl(".icon-huanyuan");
      this.hideEl(".pv-screens");
    } else {
      this.setVp(this.vbw, this.vbh);
      this.showEl(".icon-quanping");
      this.hideEl(".icon-huanyuan");
      this.showEl(".pv-screens");
    }
  };
  fullScreen = () => {
    const el = this.$(".video-box");
    const isFullscreen =
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    if (!isFullscreen) {
      //进入全屏,多重短路表达式
      this.showEl(".icon-tuichuquanping");
      this.hideEl(".icon-shipinquanping");
      this.hideEl(".pv-screen");
      (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
        (el.msRequestFullscreen && el.msRequestFullscreen());
    } else {
      //退出全屏,三目运算符
      this.showEl(".icon-shipinquanping");
      this.hideEl(".icon-tuichuquanping");
      this.showEl(".pv-screen");
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitExitFullscreen
        ? document.webkitExitFullscreen()
        : "";
    }
  };
  // 播放进度条
  useTime = (ev) => {
    let ev1 = ev || window.event;
    this.disX = ev1.clientX - this.$(".pv-dot").offsetLeft;
    document.onmousemove = (ev) => {
      let ev2 = ev || window.event;
      let L = ev2.clientX - this.disX;
      if (L < 0) {
        L = 0;
      } else if (
        L >
        this.$(".pv-bar").offsetWidth - this.$(".pv-dot").offsetWidth
      ) {
        L = this.$(".pv-bar").offsetWidth - this.$(".pv-dot").offsetWidth;
      }
      this.$(".pv-dot").style.left = L + "px";
      let scale =
        L / (this.$(".pv-bar").offsetWidth - this.$(".pv-dot").offsetWidth);
      this.$(".video-player").currentTime =
        scale * this.$(".video-player").duration;
      this.nowTime();
    };
    document.onmouseup = function() {
      document.onmousemove = null;
    };
    return false;
  };
  // 音量控制
  useListen = (ev) => {
    let ev1 = ev || window.event;
    this.disL = ev1.clientX - this.$(".pv-ol").offsetLeft;
    document.onmousemove = (ev) => {
      let ev2 = ev || window.event;
      let L = ev2.clientX - this.disL;
      if (L < 0) {
        L = 0;
      } else if (
        L >
        this.$(".pv-yl").offsetWidth - this.$(".pv-ol").offsetWidth
      ) {
        L = this.$(".pv-yl").offsetWidth - this.$(".pv-ol").offsetWidth;
      }
      this.$(".pv-ol").style.left = L + "px";
      let scale =
        L / (this.$(".pv-yl").offsetWidth - this.$(".pv-ol").offsetWidth);
      this.$(".pv-bg").style.width = this.$(".pv-ol").offsetLeft + "px";
      if (this.$(".pv-ol").offsetLeft !== 0) {
        this.showEl(".icon-yinliang");
        this.hideEl(".icon-jingyin");
      } else {
        this.showEl(".icon-jingyin");
        this.hideEl(".icon-yinliang");
      }
      this.$(".video-player").volume = scale;
    };
    document.onmouseup = function() {
      document.onmousemove = null;
    };
    return false;
  };
  // 播放速度
  useSpnum = (e) => {
    let ev = e || window.event;
    this.$(".pv-spnum").innerText = ev.target.innerText;
    const value = ev.target.innerText.replace("x", "");
    this.$(".video-player").playbackRate = value;
  };
}
export default VamVideo;
