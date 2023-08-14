import{_ as t,W as d,X as s,Y as e,$ as l,Z as i,a2 as a,C as r}from"./framework-6199cc12.js";const c={},o=a(`<h1 id="snowflake" tabindex="-1"><a class="header-anchor" href="#snowflake" aria-hidden="true">#</a> snowflake</h1><p>分布式id生成算法的有很多种，Twitter的雪花算法（SnowFlake）就是其中经典的一种。</p><p>SnowFlake算法的优点：</p><ul><li>生成ID时不依赖于数据库，完全在内存生成，高性能高可用。</li><li>容量大，每秒可生成几百万ID。 <ul><li>SnowFlake算法在同一毫秒内最多可以生成多少个全局唯一ID呢？同一毫秒的ID数量 = 1024 * 4096 = 4194304</li></ul></li><li>所有生成的id按时间趋势递增，后续插入数据库的索引树的时候，性能较高。</li><li>整个分布式系统内不会产生重复id（因为有<code>datacenterId</code>和<code>workerId</code>来做区分）</li></ul><p>SnowFlake算法的缺点：</p><ul><li>依赖于系统时钟的一致性。如果某台机器的系统时钟回拨，有可能造成ID冲突，或者ID乱序。</li><li>还有，在启动之前，如果这台机器的系统时间回拨过，那么有可能出现ID重复的危险。</li></ul><p>问题？</p><ul><li><p>workId 怎么保证唯一？</p><ul><li>可以通过分布式缓存来保存机器ID和workId之间的映射关系。启动的时候访问分布式缓存查询当前机器ID对应的workId，如果查询不到则获取一个并保存到分布式缓存中。</li><li>可通过Zookeeper管理workId，免去手动频繁修改集群节点，去配置机器ID的麻烦。</li></ul></li><li><p>lastTimestamp上次生成ID的时间戳，这个是在内存中，系统时钟回退+重启后呢？无法保证</p><ul><li>目前好像只能流程上控制系统时钟不回退。</li></ul></li><li><p>41位</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(timestamp - this.twepoch) &lt;&lt; this.timestampLeftShift
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>超过长整型怎么办？</p><ul><li>this.twepoch 可以设置当前开始使用系统时的时间，可以保证69年不超</li></ul></li><li><p>Javascript 无法支持&gt; 53位的数字怎么办？</p><ul><li>js <code>Number</code>被表示为双精度浮点数，最大值为 <code>Number.MAX_SAFE_INTEGER</code> = <code>2^53-1</code></li><li><code>BigInt</code> 是 JavaScript 中的一个新的原始数字类型，可以用任意精度表示整数。即使超出 <code>Number</code> 的安全整数范围限制，也可以安全地存储和操作大整数。</li><li>要创建一个 <code>BigInt</code>，将 <code>n</code> 作为后缀添加到任何整数文字字面量</li></ul></li><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BigInt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>支持大数，那怎么控制这里用 64bits 长整型，左移溢出会出现问题吗？</p><ul><li><p>这里不做处理会出现问题，<code>BigInt</code> 可以用任意精度表示整数</p></li><li><p>如何处理？</p><p>暂不处理</p><ul><li>此问题本质还是上面的41位时间差问题，<strong>69年不超，再长就超了</strong>，需要重新设计支持，也可以做溢出提示。</li><li>如果想限制为仅64位整数，则必须始终使用强制转换 <code>BigInt.asIntN</code> <code>BigInt.asUintN</code></li><li>只要我们传递 <code>BigInt</code> 超过 64 位整数范围的值（例如，63 位数值 + 1 位符号位），就会发生溢出。</li></ul></li></ul></li></ul><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>SnowFlake算法生成id的结果是一个64bit大小的整数，它的结构如下图：</p>`,10),u={href:"https://github.com/cloudyan/snowflake/blob/master/docs/1.jpeg",target:"_blank",rel:"noopener noreferrer"},v=e("img",{src:"https://github.com/cloudyan/snowflake/raw/master/docs/1.jpeg",alt:"SnowFlake",tabindex:"0",loading:"lazy"},null,-1),m=e("figcaption",null,"SnowFlake",-1),p=a(`<ul><li><p><code>1位</code>，不用。二进制中最高位为1的都是负数，但是我们生成的id一般都使用整数，所以这个最高位固定是0</p></li><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>41位
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>，用来记录时间戳（毫秒）。</p><ul><li><code>41位</code>可以表示<code>$2^{41}-1$</code>个数字，</li><li>如果只用来表示正整数（计算机中正数包含0），可以表示的数值范围是：0 至 <code>$2^{41}-1$</code>，减1是因为可表示的数值范围是从0开始算的，而不是1。</li><li>也就是说41位可以表示<code>$2^{41}-1$</code>个毫秒的值，转化成单位年则是<code>$(2^{41}-1) / (1000 * 60 * 60 * 24 * 365) = 69$</code>年</li></ul></li><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10位
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>，用来记录工作机器id。</p><ul><li>可以部署在<code>$2^{10} = 1024$</code>个节点，包括<code>5位datacenterId</code>和<code>5位workerId</code></li><li><code>5位（bit）</code>可以表示的最大正整数是<code>$2^{5}-1 = 31$</code>，即可以用0、1、2、3、....31这32个数字，来表示不同的<code>datecenterId</code>或<code>workerId</code></li></ul></li><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>12位
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>，序列号，用来记录同毫秒内产生的不同id。</p><ul><li><code>12位（bit）</code>可以表示的最大正整数是<code>$2^{12}-1 = 4095$</code>，即可以用0、1、2、3、....4094这4095个数字，来表示同一机器同一时间截（毫秒)内产生的4095个ID序号</li></ul></li></ul><p>由于64bit的整数是long类型，所以SnowFlake算法生成的id就是long来存储的。但这个长度超出 js 最大数范围 <code>Number.MAX_SAFE_INTEGER</code> 了，在js 中实现要使用 BigInt 来表示。</p><h2 id="talk-is-cheap-show-you-the-code" tabindex="-1"><a class="header-anchor" href="#talk-is-cheap-show-you-the-code" aria-hidden="true">#</a> Talk is cheap, show you the code</h2>`,3),h={href:"https://github.com/cloudyan/snowflake/blob/master/src/snowflake.js",target:"_blank",rel:"noopener noreferrer"},b=e("h2",{id:"代码理解",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#代码理解","aria-hidden":"true"},"#"),i(" 代码理解")],-1),g={href:"https://segmentfault.com/a/1190000011282426",target:"_blank",rel:"noopener noreferrer"},_=a(`<h3 id="位运算基础" tabindex="-1"><a class="header-anchor" href="#位运算基础" aria-hidden="true">#</a> 位运算基础</h3><ul><li>在计算机中，负数的二进制是用补码来表示的。 <ul><li>反码 = 除符号位, 原码其余位取反而得</li><li>补码 = 反码 + 1</li><li>补码 = （原码 - 1）再取反码</li></ul></li><li>在计算机中无符号数用原码表示, 有符号数用补码表示</li></ul><p>补码的意义就是可以拿补码和原码（3的二进制）相加，最终加出一个“溢出的0”</p><p>因此-1的二进制应该这样算：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>00000000 00000000 00000000 00000001 //原码：1的二进制
11111111 11111111 11111111 11111110 //取反码：1的二进制的反码
11111111 11111111 11111111 11111111 //加1：-1的二进制表示（补码）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用位运算计算n个bit能表示的最大数值" tabindex="-1"><a class="header-anchor" href="#用位运算计算n个bit能表示的最大数值" aria-hidden="true">#</a> 用位运算计算n个bit能表示的最大数值</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const maxWorkerId = -1n ^ (-1n &lt;&lt; 5n)

// 利用位运算计算出5位能表示的最大正整数是多少
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-1 左移 5，得结果a ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>        11111111 11111111 11111111 11111111 // -1的二进制表示（补码）
  11111 11111111 11111111 11111111 11100000 // 高位溢出的不要，低位补0
        11111111 11111111 11111111 11100000 // 结果a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-1 异或 a ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>        11111111 11111111 11111111 11111111 // -1的二进制表示（补码）
    ^   11111111 11111111 11111111 11100000 // 两个操作数的位中，相同则为0，不同则为1
---------------------------------------------------------------------------
        00000000 00000000 00000000 00011111 // 最终结果31
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终结果是31，二进制 <code>00000000 00000000 00000000 00011111</code> 转十进制可以这么算：</p><p>24+23+22+21+20=16+8+4+2+1=31</p><h3 id="用mask防止溢出" tabindex="-1"><a class="header-anchor" href="#用mask防止溢出" aria-hidden="true">#</a> 用mask防止溢出</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this.sequence = (this.sequence + 1n) &amp; this.sequenceMask;

// 这段代码通过 \`位与\` 运算保证计算的结果范围始终是 0-4095
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用位运算汇总结果" tabindex="-1"><a class="header-anchor" href="#用位运算汇总结果" aria-hidden="true">#</a> 用位运算汇总结果</h3><p>位或运算，同一位只要有一个是1，则结果为1，否则为0。</p><p>位运算左移超出的溢出部分扔掉，右侧空位则补0。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>return (
      ((timestamp - this.twepoch) &lt;&lt; this.timestampLeftShift) | // 时间差左移22
      (this.dataCenterId &lt;&lt; this.dataCenterIdShift) | // 数据标识id左移 17
      (this.workerId &lt;&lt; this.workerIdShift) | // 机器id左移 12
      this.sequence
    );
--------------------
        |
        |简化
       \\|/
--------------------
return (la) |
      (lb) |
      (lc) |
      sequence;

数据示例：

timestamp: 1505914988849
twepoch: 1288834974657
datacenterId: 17
workerId: 25
sequence: 0

二进制过程

  1 |                    41                        |  5  |   5  |     12

   0|0001100 10100010 10111110 10001001 01011100 00|     |      |              //la
   0|                                              |10001|      |              //lb
   0|                                              |     |1 1001|              //lc
or 0|                                              |     |      |‭0000 00000000‬ //sequence
------------------------------------------------------------------------------------------
   0|0001100 10100010 10111110 10001001 01011100 00|10001|1 1001|‭0000 00000000‬ //结果：910499571847892992
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="支持反推数据" tabindex="-1"><a class="header-anchor" href="#支持反推数据" aria-hidden="true">#</a> 支持反推数据</h2><p>反推机器ID、数据中心ID和创建的时间戳</p><ul><li>机器ID = id &gt;&gt; workerIdShift &amp; ~(-1n &lt;&lt; workerIdBits);</li><li>数据中心ID = id &gt;&gt; datacenterIdShift &amp; ~(-1n &lt;&lt; datacenterIdBits);</li><li>时间戳 = id &gt;&gt; timestampLeftShift &amp; ~(-1n &lt;&lt; 41n) + twepoch;</li></ul><p>参考：</p><p>雪花算法</p>`,24),x={href:"https://github.com/twitter/snowflake/blob/snowflake-2010/src/main/scala/com/twitter/service/snowflake/IdWorker.scala",target:"_blank",rel:"noopener noreferrer"},I={href:"https://developer.twitter.com/en/docs/basics/twitter-ids",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.csdn.net/xiaopeng9275/article/details/72123709",target:"_blank",rel:"noopener noreferrer"},k={href:"https://segmentfault.com/a/1190000011282426",target:"_blank",rel:"noopener noreferrer"},w=e("li",null,null,-1),S=e("p",null,"BigInt",-1),B={href:"https://zhuanlan.zhihu.com/p/36330307",target:"_blank",rel:"noopener noreferrer"},D={href:"https://github.com/GoogleChromeLabs/jsbi#why",target:"_blank",rel:"noopener noreferrer"},N={href:"http://2ality.com/2017/03/es-integer.html",target:"_blank",rel:"noopener noreferrer"},$={href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/tc39/proposal-bigint",target:"_blank",rel:"noopener noreferrer"},F={href:"https://zhuanlan.zhihu.com/p/36385254",target:"_blank",rel:"noopener noreferrer"},E=a(`<p>关于限制为仅64位整数，需要特定处理，可以提示数据长度溢出了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在 console 中测试，溢出怎么办，怎么检查出问题了
var aa = 1n;
(aa&lt;&lt;62n).toString(2).padStart(64, 0);
(aa&lt;&lt;65n).toString(2).padStart(64, 0);
(BigInt.asIntN(64, aa&lt;&lt;62n)).toString(2).padStart(64, 0);
(BigInt.asIntN(64, aa&lt;&lt;65n)).toString(2).padStart(64, 0);

const max = 2n ** (64n - 1n) - 1n;
BigInt.asIntN(64, max); // 有符号数
BigInt.asUintN(64, max); // 无符号数
→ 9223372036854775807n
BigInt.asIntN(64, max + 1n);

new BigInt64Array(4)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function j(T,J){const n=r("ExternalLinkIcon");return d(),s("div",null,[o,e("figure",null,[e("a",u,[v,l(n)]),m]),p,e("p",null,[e("a",h,[i("JS 版本"),l(n)])]),b,e("p",null,[e("a",g,[i("https://segmentfault.com/a/1190000011282426"),l(n)])]),_,e("ul",null,[e("li",null,[e("a",x,[i("Twitter官方原版"),l(n)]),i(" 用Scala写的")]),e("li",null,[e("a",I,[i("Twitter ID（Snowflake）"),l(n)])]),e("li",null,[e("a",f,[i("ID生成器，Twitter的雪花算法（Java）"),l(n)])]),e("li",null,[e("a",k,[i("理解分布式id生成算法SnowFlake"),l(n)])]),w]),S,e("ul",null,[e("li",null,[e("a",B,[i("BigInt：JavaScript 中的任意精度整数"),l(n)])]),e("li",null,[i("BigInt: arbitrary-precision integers in JavaScript "),e("ul",null,[e("li",null,[e("a",D,[i("chrome jsbi"),l(n)])]),e("li",null,[e("a",N,[i("ES proposal: BigInt – arbitrary precision integers"),l(n)])])])]),e("li",null,[e("a",$,[i("MDN BigInt 语法"),l(n)])]),e("li",null,[e("a",y,[i("tc39: proposal-bigint"),l(n)])]),e("li",null,[e("a",F,[i("Javascript 提案 BigInt 的一些坑"),l(n)])])]),E])}const z=t(c,[["render",j],["__file","雪花算法.html.vue"]]);export{z as default};
