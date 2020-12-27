<template>
  <div id="app">
    <vam-Video :properties="videoOption.properties" :videoStyle="videoOption.videoStyle"></vam-Video>
  </div>
</template>

<script>
import vamVideo from "./VamVideo";
export default {
  name: "Index",
  data: () => ({
    videoOption: {
      properties: {
        poster: require("./img/bg.png"),
        src:
          "https://mos-vod-drcn.dbankcdn.cn/P_VT/video_injection/A91343E9D/v3/9AB0A7921049102362779584128/MP4Mix_H.264_1920x1080_6000_HEAAC1_PVC_NoCut.mp4",
        preload: "auto",
        loop: "loop",
        // autoplay:"autoplay",
        // muted:true,
        // controls:"controls"
      },
      videoStyle: {
        // width: "1200px",
        // height: "600px",
      },
    },
  }),
  components: {
    vamVideo
  },
};
</script>
