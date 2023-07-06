import { hopeTheme } from 'vuepress-theme-hope';
import { enNavbar, zhNavbar } from './navbar/index';
import { enSidebar, zhSidebar } from './sidebar/index';

export default hopeTheme({
  hostname: "https://blog.catguild.cn",

  author: {
    name: "雪乃の猫",
    url: "https://blog.catguild.cn",
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",


  // repo: "huaxiexiyan",
  
  docsDir: "demo/src",

  blog: {
    medias: {
      GitHub: "https://github.com/huaxiexiyan",
      Gmail: "https://example.com",
      Twitter: "https://example.com",
      Wechat: "https://example.com",
    },
  },

  locales: {
//     '/': {
//       // navbar
//       navbar: enNavbar,
//       // sidebar
//       sidebar: enSidebar,

//       footer: `<div style="width:400px;margin:0 70px;padding:20px 0">
// 	<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34082602201751" style="text-decoration:none;height:20px;line-height:20px">
// 		<img src="https://cdn.jsdelivr.net/gh/LogicPoet/cdn@main/img/wp/images/record-icon.png" style="float:left" />
// 		<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;color:#939393">皖公网安备 34082602201751号</p></a>
// 	<a style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;color:#939393" target="_blank" href="https://beian.miit.gov.cn/"> 皖ICP备 20012821 号</a>
// </div>
// <p />
// <span id="runtime_span"></span>`,
// copyright: `<a style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;color:#939393" target="_blank">Copyright&nbsp;&copy; 2020-present 雪乃の猫&nbsp;&nbsp;</a>`,


//       displayFooter: true,

//       blog: {
//         description: 'A FrontEnd programmer',
//         intro: '/intro.html',
//       },

//       metaLocales: {
//         editLink: 'Edit this page on GitHub',
//       },
//     },

    /**
     * Chinese locale config
     */
    '/': {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

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

      blog: {
        description: '一个普通开发者',
        intro: '/zh/intro.html',
      },

      // page meta
      metaLocales: {
        editLink: '在 GitHub 上编辑此页',
      },
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
      '/demo/encrypt.html': ['1234'],
      '/zh/demo/encrypt.html': ['1234'],
    },
  },

  plugins: {
    blog: true,

    // comment: {
    //   // @ts-ignore
    //   provider: 'Giscus',
    // },

    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ['ts', 'vue'],
      },
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      },
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
