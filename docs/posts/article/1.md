---
title: 内容分发网络CND
---

# CDN 含义
内容分发网络（英语：Content Delivery Network或Content Distribution Network，缩写：CDN）是指一种透过互联网互相连接的电脑网络系统，利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户，来提供高性能、可扩展性及低成本的网络内容传递给用户。---引用自维基百科

# CDN 服务
CDN服务类似服务器的租赁服务，这些服务器一般都是CDN服务商的数据中心，这些服务器可以缓存我们的网站资源，类似一种高速缓存。但是我们无法直接登录这些服务器，但是可以设置一些服务商开放出来的数据管理策略，比如
- 静态资源压缩，减小资源传输体积，以提高传输速度和带宽利用率，最常见的压缩方案包括gzip和Brotli。
- 缓存策略，指定缓存的资源及缓存过期时间，以提供响应速度，并且降低了源服务器的访问压力。
- 安全策略，用以防止链接盗用，一般的CDN服务都是要付费的，可以设置安全策略，来访问其他人来使用你的CDN服务

# CDN工作流程
1. 终端访问CDN加速域名
2. DNS服务解析CNAME记录（实际上就是获取CDN服务商的服务器地址，此时会返回一个里终端最近的服务器地址）
3. 终端去访问DNS服务器返回的目标服务器地址
4. CDN服务器检查是否存在该资源
4-1. 如果存在则直接返回该资源
4-2. 如果不存在，则前往回源地址或回源host获取该资源，然后将其返回给终端

# 如何利用好CDN服务
现在我们知道了CDN服务，实际就是在实际的资源机之间加了一个缓冲集群。终端将不再之间访问我们的资源机，而是是访问这个缓冲集群。如果访问到的节点中没有目标资源，该节点才会去资源机去拉取。故，要提高CDN服务的利用，就是要减少这个拉取动作，也可以说是回源率。另一方面，回源是难以避免的，所有提高回源效率，也会优化的访问速度。
1. 降低回源率：一般就是采用服务商提供的缓存机制，而要利用好缓存，就需要对资源站尽可能的静态化。
2. 提高回源效果：对一些静态资源的访问，进行合并压缩处理，以减少访问次数，资源传输体积；或者提高资源站的带宽（这点可能会比较难，其实CDN的目的就是在带宽不变的前提下提高更快的访问服务）

其实总结起来就是，缓存+减少数据传输量+减少访问次数
而这三条，在CDN服务商提供的缓冲集群能做，在自己的资源机上也能做。这样就能尽可能的加快资源机的资源访问速度。

## 参考
[Content delivery network - Wikipedia](http://https://en.wikipedia.org/wiki/Content_delivery_network "Content delivery network")
[內容分髮網絡- MBA智库百科](https://wiki.mbalib.com/zh-tw/%E5%86%85%E5%AE%B9%E5%88%86%E5%8F%91%E7%BD%91%E7%BB%9C "內容分髮網絡- MBA智库百科")
[What is a CDN? | How do CDNs work? | Cloudflare](https://www.cloudflare.com/zh-cn/learning/cdn/what-is-a-cdn "What is a CDN? | How do CDNs work? | Cloudflare")
[CNAME - 百度百科](https://baike.baidu.com/item/CNAME/9845877?fr=aladdin "CNAME - 百度百科")
[gzip - 百度百科](https://baike.baidu.com/item/gzip/4487553?fr=aladdin "gzip - 百度百科")
[HTTP compression](https://en.wikipedia.org/wiki/HTTP_compression "HTTP compression")