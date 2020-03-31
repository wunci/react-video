# react-video（有问题可以加qq群:725165362）

  该项目有两个版本，vue和react
  
> react版项目地址 https://github.com/wclimb/react-video  
> react版预览 http://react.wclimb.site

> 后端项目地址 https://github.com/wclimb/video-admin  
> 后台管理 http://vue.wclimb.site

> API接口地址 https://github.com/wclimb/video-admin/blob/master/API.md (未更新，接口现在重写过)

vue版

> vue版项目地址 https://github.com/wclimb/vue-video  
> vue版前端预览 http://vue.wclimb.site

## 技术栈(react.js + Node.js 全栈项目)

> 项目还在完善，基本功能已经实现，正在进行持续优化 

`react` + `react-router` + `redux` + `webpack` + `axios` + `less` + `flex` + `svg` + `阿里字体图标`

## 运行

```
git clone https://github.com/wclimb/react-video.git

cd react-video

npm install  建议使用淘宝镜像(https://npm.taobao.org/) =>  cnpm i

npm start (运行项目)

npm run build (打包项目)

ps: 如果运行了本地后台video-admin可以切换baseUrl为本地环境

```

## 功能

* 1. 注册登录登出 + 验证码 密码检测，如果用户不存在则自动创建
* 2. 检测是否登录，如果没有登录则不允许评论和评价
* 3. 可以上传影片到后台，进行前台展示
* 4. 评分功能，初始化评分可以自由设置，如果没有人like则默认显示原始评分，如果有则计算当前vide的评分
* 5. 修改用户名，检测用户名是否跟其他人重复
* 6. 上传头像，默认没有头像
* 7. 评论功能，评论之后可以在个人中心展示，并且可以删除
* 8. 搜索功能，可以搜索存在的影片，如果没有则显示无结果
* 9. 自己喜欢的video和评论的内容会在个人中心显示

综上：

- [x] 注册
- [x] 登录
- [x] 登出
- [x] 验证码
- [x] 详情页
- [x] 分类
- [x] 分类影视列表
- [x] 修改用户名
- [x] 上传头像
- [x] 评论
- [x] 删除评论(可以左滑评论删除)
- [x] 搜索
- [x] 个人中心数据

如果觉得对你有帮助还望关注一下，有问题可以及时提哟，觉得不错的话`star`一下也是可以的哟


## 有问题欢迎反馈

在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(875246904#qq.com, 把#换成@)
* QQ: 875246904
* QQ群: 725165362