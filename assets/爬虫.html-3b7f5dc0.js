import{_ as e,W as n,X as s,a2 as a}from"./framework-6199cc12.js";const i={},d=a(`<h1 id="爬虫框架-scrapy" tabindex="-1"><a class="header-anchor" href="#爬虫框架-scrapy" aria-hidden="true">#</a> 爬虫框架 scrapy</h1><p>1、创建新项目</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>scrapy startproject tutorial
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、创建爬虫文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建普通模版</span>
scrapy genspider 爬虫名字 爬取的域名（不用协议头）
<span class="token comment"># 创建 crawl spider 模版</span>
scrapy genspider <span class="token parameter variable">-t</span> crawl 爬虫名字 爬取的域名（不用协议头）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、启动爬虫</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>scrapy crawl 爬虫名字
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="项目文件结构" tabindex="-1"><a class="header-anchor" href="#项目文件结构" aria-hidden="true">#</a> 项目文件结构</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>项目名字
	项目名字
		spiders文件夹（存储的是爬虫文件）
			init
			自定义的爬虫文件		核心功能文件
		init
		items		定义数据结构的地方		爬取的数据包含那些
		middleware		中间件		代理
		settings		配置文件		robots协议		ua定义等
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="response的属性和方法" tabindex="-1"><a class="header-anchor" href="#response的属性和方法" aria-hidden="true">#</a> response的属性和方法</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>response.text	获取的是响应的字符串
response.body	获取的是二进制数据
response.xpath	可以直接是xpath方法来解析response中的内容
response.extract()	提取seletor对象的data属性值
response.extract_first()	提取seletor列表的第一个数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="setting" tabindex="-1"><a class="header-anchor" href="#setting" aria-hidden="true">#</a> setting</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code># 需要使用管道，需要打开该设置
ITEM_PIPELINES = {
	# 管道可以有多个，并有有优先级，值从1-1000，值越小越高
	&#39;项目名.pipelines.管道名&#39;: 300
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="下载图片" tabindex="-1"><a class="header-anchor" href="#下载图片" aria-hidden="true">#</a> 下载图片</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> urllib<span class="token punctuation">.</span>request
<span class="token keyword">class</span> <span class="token class-name">DownLoadPipeline</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">process_item</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">,</span> spider<span class="token punctuation">)</span><span class="token punctuation">:</span>
        url <span class="token operator">=</span> item<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;url&#39;</span><span class="token punctuation">)</span>
        filename<span class="token operator">=</span><span class="token string">&#39;http://&#39;</span><span class="token operator">+</span> item<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&#39;.jpg&#39;</span>
        urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>urlretrieve<span class="token punctuation">(</span>url <span class="token operator">=</span> url<span class="token punctuation">,</span> filename <span class="token operator">=</span> filename<span class="token punctuation">)</span>
        <span class="token keyword">return</span> item


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><p>scrapy部署服务器有一套完整的开源项目：<strong>scrapy+scrapyd(服务端)+scrapy-client(客户端)+scrapydweb</strong> 1、scrapyd(服务端)</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code># 官方文档
https://scrapyd.readthedocs.io
# 安装
pipenv install scrapyd
# 启动
scrapyd
# 浏览器访问
http://127.0.0.1:6800
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、scrapy-client scrapy-client它允许我们将本地的scrapy项目打包发送到scrapyd 这个服务端（前提是服务器scrapyd正常运行）</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code># 官方文档
https://pypi.org/project/scrapyd-client/
# 安装
pipenv install scrapyd-client
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、scrapydweb（可选）</p><p>ScrapydWeb：用于Scrapyd集群管理的Web应用程序，支持Scrapy日志分析和可视化。</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>#官方文档
https://github.com/my8100/scrapydweb/blob/master/README_CN.md
# 安装
pipenv install scrapydweb
# 运行命令
scrapydweb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行命令scrapydweb，首次启动将会在当前目录下生成配置文件“scrapydweb_settings_v*.py”</p><p>1、更改配置文件 编辑配置文件，将ENABLE_LOGPARSER更改为False</p><p>2、添加访问权限</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>SCRAPYD_SERVERS = [
    &#39;127.0.0.1:6800&#39;,
    # &#39;username:password@localhost:6801#group&#39;,
    (&#39;username&#39;, &#39;password&#39;, &#39;localhost&#39;, &#39;6801&#39;, &#39;group&#39;),
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、添加http认证</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>ENABLE_AUTH = True
USERNAME = &#39;username&#39;
PASSWORD = &#39;password&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如果启动失败-一般是使用了高版本的python" tabindex="-1"><a class="header-anchor" href="#如果启动失败-一般是使用了高版本的python" aria-hidden="true">#</a> 如果启动失败（一般是使用了高版本的python）</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code># 400 错误
APScheduler==3.9.1
# 500 错误
SQLAlchemy&gt;=1.2.15,&lt;1.4.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),t=[d];function l(r,c){return n(),s("div",null,t)}const u=e(i,[["render",l],["__file","爬虫.html.vue"]]);export{u as default};
