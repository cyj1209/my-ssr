# 题目一 ：匹配到多个路由的时候如果出现报错，应该如何处理

## 1 只要有报错就不显示页面

    代码就是老师的直接用promise.all来发起请求，用catch来捕获。

## 2 如果单个路由出问题了就不显示出问题的路由，没有报错的路由正常显示。

### 思路

1.  server 端 用一个 promise 在包装一下组件的 loadData 有错误的话返回错误标志 ERROR 并且记录错误的 route 的 key， 没有的话返回正确标志 SUCCESS。
    然后在用 Promise.all 监听所有的请求。
    如果返回结果中没有 SUCCESS 标志，证明这次请求没有一次成功，则直接返货 500 错误。
    如果返回的请求中有 SUCCESS 则渲染页面，但是在 route.map 的时候只渲染没有出错的路由。并且将错误的 key 传递给 client 端。
    [服务端代码](./server/index.js)
2.  client 端 route 渲染的时候不渲染服务端以及出错的路由
    [client 端代码](./client/index.js)
    还需要考虑如果是客户端跳转到路由的时候这个时候请求报错应该怎么样同步的不显示报错的组件
    暂时的解决方案, 在 reduce 中增加 isError 字段，如果请求报错直接设置 isError 为 true
    [reduce 中的代码](./src/store/user.js)

### 优化方向，遗留问题

1. 优化反向，是否可以将 store 中的设置 isError 的逻辑抽离成一个中间件。
2. 问题，如何捕获底部中间件的错误，可以参考 koa 洋葱模型的 await，redux 是否支持异步错误的捕获。
3. 如何判断我整个页面显示的路由都报错了？ 或者退一步说，如何设定 mainRoute(主路由)，主路由报错，直接显示错误页面，非主路由报错隐藏掉错误路由的模块。

# 题目二 ：如何让 server 代理所有的请求。

### 思路

1. 直接用 node 的 http 模块来进行路由转发--- 失败，底层 api 还是没大搞懂。
2. 根据视频里面大圣老师说的配置 axios 来进行转发。
   需要注意的是，如果转发的接口本身就是一个错误的接接口(会报错的接口)，必须手动捕获这次错误，并且设置 res 的 status 为错误码，这样组件才能捕获到这个错误。才能知道那个路由出问题。进而不影响第一题的结果。

# 关于 nodemon 报错 app crashed - waiting for file changes before starting

这个错误可能导致实际退出项目或者 control+c 退出项目后 node 进程任然在后台启动。
显示的结果为：

1. 关闭项目后打开项目的端口发现项目任然在运行
2. 保存之后发现报错，重启项目后发现没有 log，猜测实际原因为项目并不是跑在当前的线程下面，是跑在影藏的 node 线程上面。
3. 退出所有终端和 vscode 用活动监视器搜索 node 进程，发现还有残留进程。（最多的一次发现还有 7 个没有关掉）。

#### 猜测原因

```json
"scripts": {
    "start": " concurrently \"yarn dev:client\" \"yarn dev:server\" \"yarn dev:start\"",
    "dev:client": "webpack --config webpack.client.js --watch",
    "dev:server": "webpack --config webpack.server.js ",
    "dev:start": "nodemon --watch build --exec node \"./build/bundle.js\""
  }
```

dev :server 如果去掉--watch 不会粗发nodemon的错误，所以猜测是server的改变导致了 dev:server 的自动跟新，最终与start 发生冲突
去掉 --watch 的弊端就是每次更新server的时候必须重启项目。

解决方案待完善。

