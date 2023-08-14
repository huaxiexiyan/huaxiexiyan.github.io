---
title: SpringBoot初始化方法
---

# 总览
| 方式 | 优点                                   | 缺点 |
| ---- | -------------------------------------- | ---- |
| `@PostConstruct` 注解 | 1、简单直观，只需要在方法上添加注解即可。<br/>2、集成度高，与Spring框架紧密结合，适用于需要与其他Spring功能一起使用的场景。 | 1、不太适合复杂的初始化逻辑，因为它没有提供很多的错误处理机制。<br/>2、无法捕获方法内部的受检异常，需要自己处理异常。 |
| `InitializingBean` 接口 | 1.提供了更多的初始化时错误处理机制，可以抛出异常，Spring会处理它。 | 1、需要实现Spring的接口，与Spring紧密耦合，不太适合在非Spring环境中使用。<br/>2、只能用于bean级别的初始化。 |
| `ApplicationListener` | 1.可以监听多种事件，不仅限于初始化事件。<br/>可以在应用程序启动后执行一些定制逻辑。 | 1、在监听多个事件时，可能需要编写更多的条件逻辑以区分不同的事件。<br/>2、在某些情况下，事件的发生可能会较早，可能会影响到其他组件。 |
| `CommandLineRunner `和 `ApplicationRunner` | 1、可以接收应用程序的命令行参数，适用于需要根据参数执行不同初始化逻辑的场景。 | 1、可能需要在启动脚本中指定额外的参数，增加了一些配置复杂性。<br/>2、只能在应用程序启动后执行一次，不适合周期性的初始化操作。 |
| `@EventListener` 注解 |1、可以灵活地监听多种事件，代码结构清晰。 | 1、如果监听多种事件，需要在方法内部进行事件类型判断。<br/>2、对于非Spring事件，可能不太适用。 |

# 简单示例

## `@PostConstruct` 注解

您可以使用`@PostConstruct`注解在Spring Boot中定义一个方法，在该方法中执行初始化逻辑。这个方法会在bean初始化完成后立即执行，但请注意，它仅适用于被Spring容器管理的bean。

```java
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;

@Component
public class MyInitializer {

    @PostConstruct
    public void initialize() {
        try {
            // 在这里编写初始化逻辑
            // 可能会抛出异常
        } catch (Exception e) {
            // 处理异常，防止传播到Spring容器
        }
    }
}
```



## 实现`InitializingBean` 接口

**实现`InitializingBean`接口：** `InitializingBean`接口是Spring框架提供的，它定义了一个`afterPropertiesSet`方法，您可以在其中编写初始化逻辑。当bean初始化完成后，Spring容器会自动调用这个方法。

```java
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

@Component
public class MyInitializer implements InitializingBean {

    @Override
    public void afterPropertiesSet() throws Exception {
        // 在这里编写初始化逻辑
    }
}

```

## 实现`ApplicationListener`接口

**使用`ApplicationListener`：** 您可以实现`ApplicationListener`接口来监听Spring Boot应用程序的事件，并在特定事件发生时执行初始化操作。例如，您可以监听`ContextRefreshedEvent`事件，它在应用程序上下文刷新（即初始化）完成后触发。

```java
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class MyInitializer implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // 在这里编写初始化逻辑
    }
}

```

## 实现`CommandLineRunner `和 `ApplicationRunner`接口
您可以使用CommandLineRunner或ApplicationRunner接口来定义在应用程序完全启动后执行的初始化方法。这两个接口都提供了一个run方法，您可以在其中编写初始化逻辑。
使用 CommandLineRunner：

```java
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // 在这里编写初始化逻辑
        System.out.println("应用程序完全启动后执行的初始化方法 - CommandLineRunner");
    }
}

```
使用 ApplicationRunner：
```java
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class MyApplicationRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 在这里编写初始化逻辑
        System.out.println("应用程序完全启动后执行的初始化方法 - ApplicationRunner");
    }
}

```

1. **ApplicationRunner：**
   - `ApplicationRunner`接口中的`run`方法接收一个`ApplicationArguments`对象作为参数，该对象包含应用程序启动时传递的命令行参数。
   - 这种方式适用于需要根据命令行参数或应用程序参数执行初始化逻辑的场景。例如，您可以根据不同的参数初始化不同的部分。
   - 使用这种方式，您可以处理命令行参数，然后根据参数执行适当的初始化操作。
2. **CommandLineRunner：**
   - `CommandLineRunner`接口中的`run`方法接收一个字符串数组作为参数，这些字符串是应用程序启动时传递的命令行参数。
   - 这种方式适用于需要直接处理命令行参数的场景。与`ApplicationRunner`相比，它更直接，不需要额外的参数对象。
   - 使用这种方式，您可以处理传递的命令行参数并执行相应的初始化操作。
3. 可以在Spring Boot应用程序中创建多个实现了这些接口的类，每个类都可以在应用程序启动后执行特定的初始化逻辑。可以通过实现`Ordered`接口或使用`@Order`注解来控制`ApplicationRunner`和`CommandLineRunner`的执行顺序。

## `@EventListener`注解

**使用`@EventListener`注解：** 您可以使用`@EventListener`注解来标记一个方法，该方法将在特定事件发生时被调用。这个方法可以包含初始化逻辑。

```java
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MyInitializer {

    @EventListener(ContextRefreshedEvent.class)
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // 在这里编写初始化逻辑
    }
}
```

