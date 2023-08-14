import{_ as n,W as s,X as a,a2 as e}from"./framework-6199cc12.js";const i={},t=e(`<h1 id="protobuf语法" tabindex="-1"><a class="header-anchor" href="#protobuf语法" aria-hidden="true">#</a> protobuf语法</h1><p>文件格式</p><div class="language-proto line-numbers-mode" data-ext="proto"><pre class="language-proto"><code>.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>版本设定</p><div class="language-proto line-numbers-mode" data-ext="proto"><pre class="language-proto"><code>#  可选proto2 ，主流一般都是用 proto3
syntax = &quot;proto3&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注释</p><div class="language-proto line-numbers-mode" data-ext="proto"><pre class="language-proto"><code>单行 #
多行 /* */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>与java语言相关的语法</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code># 后续 protobuf 生成的java代码，是在同一源文件，还是多个源文件中
<span class="token keyword">option</span> java_multiple_files <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

# 指定 protobuf 生成的类 放在什么包下面
<span class="token keyword">option</span> java_package <span class="token operator">=</span> <span class="token string">&quot;com.xx.xx&quot;</span><span class="token punctuation">;</span>

# 指定 protobuf 生成的外部类的名字（管理内部类【内部类才是真正开发使用的】）
<span class="token keyword">option</span> java_outer_classname <span class="token operator">=</span> <span class="token string">&quot;HelloWorldService&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>逻辑包（了解，一般不用）</p><div class="language-proto line-numbers-mode" data-ext="proto"><pre class="language-proto"><code># 对于 protobuf 对于文件内容的管理
package xxx;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>导入其他 proto 文件</p><div class="language-proto line-numbers-mode" data-ext="proto"><pre class="language-proto"><code>UserService.proto

OrderService.proto
	import &quot;xxx/UserService.proto&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本类型</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>枚举类型</p><p>消息message</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">message</span>  <span class="token class-name">LoginRequest</span> <span class="token punctuation">{</span>
	<span class="token builtin">string</span> username <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	singular <span class="token builtin">string</span> password <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token builtin">int32</span> age <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 编号 从 1 - 2^29-1 ；注意：19000 - 19999 不能用这个区间内的编号，因为这个是 protobuf 的保留编号</span>

<span class="token comment">// - singular : 这个字段的值只能是 0 或 1 个（默认关键字） null</span>
<span class="token comment">// - repeated</span>

<span class="token keyword">message</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
	<span class="token builtin">string</span> content <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">repeated</span> <span class="token builtin">string</span> status <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 这个字段返回值是多个，等价于 java list protobuf getStatusList() -&gt; list</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">service</span> <span class="token class-name">HelloService</span><span class="token punctuation">{</span>
	<span class="token keyword">rpc</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">HelloRequest</span><span class="token punctuation">)</span> <span class="token keyword">returns</span><span class="token punctuation">(</span><span class="token class-name">HelloReponse</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# 里面可以定义多个服务方法
# 定义多个服务接口
# gRPC 服务 <span class="token number">4</span> 种服务方式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="第一个-grpc-服务" tabindex="-1"><a class="header-anchor" href="#第一个-grpc-服务" aria-hidden="true">#</a> 第一个 gRPC 服务</h1><p>项目结构</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>1. xxx-api 模块
	定义 protobuf idl语言
	并通过命令创建具体的代码，后续 client server 引入依赖使用
	1. message 消息定义
	2. service 服务定义
2. xxx-server 模块
	1. 实现 api 模块中定义的服务接口
	2. 发布 gRPC 服务 （创建服务端程序）
3. xxx-client 模块
	1. 创建服务端 stub（代理）
	2. 基于代理 stub 进行 RPC 调用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>xxx-server 服务端模块的开发</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>1. 实现服务接口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,25),l=[t];function o(p,r){return s(),a("div",null,l)}const c=n(i,[["render",o],["__file","gPRC.html.vue"]]);export{c as default};
