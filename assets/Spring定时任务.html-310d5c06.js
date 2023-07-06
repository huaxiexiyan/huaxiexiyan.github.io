import{_ as n,W as s,X as a,a2 as e}from"./framework-6199cc12.js";const t={},i=e(`<h1 id="初认识" tabindex="-1"><a class="header-anchor" href="#初认识" aria-hidden="true">#</a> 初认识</h1><h2 id="基本用于" tabindex="-1"><a class="header-anchor" href="#基本用于" aria-hidden="true">#</a> 基本用于</h2><h2 id="三种触发器" tabindex="-1"><a class="header-anchor" href="#三种触发器" aria-hidden="true">#</a> 三种触发器</h2><h3 id="实际运行一下" tabindex="-1"><a class="header-anchor" href="#实际运行一下" aria-hidden="true">#</a> 实际运行一下</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>scheduling<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">EnableScheduling</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>scheduling<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Scheduled</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> xiyan
 * <span class="token keyword">@date</span> 2023/7/5 14:36
 */</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@EnableScheduling</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoScheduledTest</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 固定延迟时间
     * 间隔 5s ，执行 3s、实际间隔8s
     * 2023-07-06 17:36:05.068
     * 2023-07-06 17:36:13.091
     * 2023-07-06 17:36:21.109
     * 2023-07-06 17:36:29.134
     * 2023-07-06 17:36:37.149
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 间隔 5s ，执行 5s、实际间隔10s
     * 2023-07-05 14:38:46.182
     * 2023-07-05 14:38:56.196
     * 2023-07-05 14:39:06.210
     * 2023-07-05 14:39:16.235
     * 2023-07-05 14:39:26.244
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 间隔 5s ，执行 7s、实际间隔12s
     * 2023-07-05 14:45:02.764
     * 2023-07-05 14:45:14.775
     * 2023-07-05 14:45:26.796
     * 2023-07-05 14:45:38.814
     * 2023-07-05 14:45:50.830
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 下次执行时间=上次执行时间+(fixedDelay时间+执行耗时)
     */</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedDelay <span class="token operator">=</span> <span class="token number">5000</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;test1方法执行=====&gt;&gt;&gt;&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 固定间隔时间
     * 间隔5s、执行3s、实际间隔5s
     * 2023-07-06 18:00:11.362
     * 2023-07-06 18:00:16.352
     * 2023-07-06 18:00:21.358
     * 2023-07-06 18:00:26.355
     * 2023-07-06 18:00:31.364
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 间隔 5s ，执行 5s、实际间隔5s
     * 2023-07-05 14:40:39.180
     * 2023-07-05 14:40:44.185
     * 2023-07-05 14:40:49.200
     * 2023-07-05 14:40:54.212
     * 2023-07-05 14:40:59.226
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 间隔5s，执行7s、实际间隔7s
     * 2023-07-05 14:41:45.559
     * 2023-07-05 14:41:52.567
     * 2023-07-05 14:41:59.581
     * 2023-07-05 14:42:06.588
     * 2023-07-05 14:42:13.593
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 下次执行时间=上次执行时间+ max(fixedRate, 执行耗时)
     */</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedRate <span class="token operator">=</span> <span class="token number">5000</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;test2方法执行=====&gt;&gt;&gt;&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * cron表达式
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 间隔5s、执行3s、实际间隔5s
     * 2023-07-06 17:55:10.015
     * 2023-07-06 17:55:15.001
     * 2023-07-06 17:55:20.014
     * 2023-07-06 17:55:25.007
     * 2023-07-06 17:55:30.008
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 间隔 5s ，执行 5s、实际间隔10s
     * 2023-07-06 17:49:55.008
     * 2023-07-06 17:50:05.014
     * 2023-07-06 17:50:15.000
     * 2023-07-06 17:50:25.004
     * 2023-07-06 17:50:35.005
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 间隔5s，执行7s、实际间隔10s
     * 2023-07-06 17:51:55.016
     * 2023-07-06 17:52:05.008
     * 2023-07-06 17:52:15.001
     * 2023-07-06 17:52:25.010
     * 2023-07-06 17:52:35.014
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 下次执行时间=如果到达定时时间，上一个任务已完成，将会执行，否则会跳过
     */</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>cron <span class="token operator">=</span> <span class="token string">&quot;0/5 * * * * ?&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;test3方法执行=====&gt;&gt;&gt;&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为什么会这样" tabindex="-1"><a class="header-anchor" href="#为什么会这样" aria-hidden="true">#</a> 为什么会这样</h3><h1 id="运行原理" tabindex="-1"><a class="header-anchor" href="#运行原理" aria-hidden="true">#</a> 运行原理</h1><h1 id="拓展应用" tabindex="-1"><a class="header-anchor" href="#拓展应用" aria-hidden="true">#</a> 拓展应用</h1>`,8),p=[i];function c(l,o){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","Spring定时任务.html.vue"]]);export{d as default};
