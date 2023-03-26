import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
        text: "Redis",
        icon: "note",
        prefix: "posts/category/redis",
        children: "structure",
      },
  ],
});