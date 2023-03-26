import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  base: "/",
  dest: "./dist",
  host: "localhost",
  port: 30000,

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
    // 添加百度统计代码
    [
      "script",
      {
        src: "https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js"
      }
    ],
    [
      "script",{},
      ` const aegis = new Aegis({
        id: '0GwZoTze442dYw0Q6V', // 上报 id
        reportApiSpeed: true, // 接口测速
        reportAssetSpeed: true, // 静态资源测速
        spa: true // spa 应用页面跳转的时候开启 pv 计算
        });`
    ]
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "雪乃の猫",
      description: "雪乃の猫 的博客",
    },
  },

  theme,

  // shouldPrefetch: false,
});
