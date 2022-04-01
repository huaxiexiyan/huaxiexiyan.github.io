import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  hostname: "https://www.catguild.cn",

  author: {
    name: "雪乃の猫",
    url: "https://www.catguild.cn",
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",

  // repo: "huaxiexiyan",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  // sidebar: sidebar,
  sidebar: false,

  footer: `<div style="width:400px;margin:0 70px;padding:20px 0">
	<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34082602201751" style="text-decoration:none;height:20px;line-height:20px">
		<img src="https://cdn.jsdelivr.net/gh/LogicPoet/cdn@main/img/wp/images/record-icon.png" style="float:left" />
		<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;color:#939393">皖公网安备 34082602201751号</p></a>
	<a style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;color:#939393" target="_blank" href="https://beian.miit.gov.cn/"> 皖ICP备 20012821 号</a>
</div>
<p />
<span id="runtime_span"></span>`,
  copyright: `<a style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;color:#939393" target="_blank">Copyright&nbsp;&copy; 2020-present 雪乃の猫&nbsp;&nbsp;</a>`,

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "一个普通开发者",
    medias: {
      GitHub: "https://github.com/huaxiexiyan",
      Gmail: "https://example.com",
      Twitter: "https://example.com",
      Wechat: "https://example.com",
    },
    sidebarDisplay: "always",
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    // comment: {
    //   /**
    //    * Using giscus
    //    */
    //   type: "giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",

    //   /**
    //    * Using twikoo
    //    */
    //   // type: "twikoo",
    //   // envId: "https://twikoo.ccknbc.vercel.app",

    //   /**
    //    * Using Waline
    //    */
    //   // type: "waline",
    //   // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },
    // 支持代码 copy
    copyCode: {},

    mdEnhance: {
      align: true,
      tasklist: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom",],
      },
    },
  },
});
