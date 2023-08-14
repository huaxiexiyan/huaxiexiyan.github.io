---
title: gRPC
---

# protobuf语法

文件格式

```proto
.proto
```

版本设定

```proto
#  可选proto2 ，主流一般都是用 proto3
syntax = "proto3";
```

注释

```proto
单行 #
多行 /* */
```

与java语言相关的语法

```protobuf
# 后续 protobuf 生成的java代码，是在同一源文件，还是多个源文件中
option java_multiple_files = true;

# 指定 protobuf 生成的类 放在什么包下面
option java_package = "com.xx.xx";

# 指定 protobuf 生成的外部类的名字（管理内部类【内部类才是真正开发使用的】）
option java_outer_classname = "HelloWorldService";
```

逻辑包（了解，一般不用）

```proto
# 对于 protobuf 对于文件内容的管理
package xxx;
```

导入其他 proto 文件

```proto 
UserService.proto

OrderService.proto
	import "xxx/UserService.proto";
```

基本类型

```

```

枚举类型



消息message

```protobuf
message  LoginRequest {
	string username = 1;
	singular string password = 2;
	int32 age = 3;
}
// 编号 从 1 - 2^29-1 ；注意：19000 - 19999 不能用这个区间内的编号，因为这个是 protobuf 的保留编号

// - singular : 这个字段的值只能是 0 或 1 个（默认关键字） null
// - repeated

message Result {
	string content = 1;
	repeated string status = 2; // 这个字段返回值是多个，等价于 java list protobuf getStatusList() -> list
}
```

服务

```protobuf
service HelloService{
	rpc hello(HelloRequest) returns(HelloReponse){}
}
# 里面可以定义多个服务方法
# 定义多个服务接口
# gRPC 服务 4 种服务方式
```

# 第一个 gRPC 服务

项目结构

```txt
1. xxx-api 模块
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
```

xxx-server 服务端模块的开发

```txt
1. 实现服务接口
```

