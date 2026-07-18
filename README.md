# 与你有关的甜甜时光

一份以电脑端为主要体验的可爱生日绘本。网站采用 PPT 式全屏放映，而不是传统长网页：滚轮每滚动一次只前进或后退一页。

## 页面内容

1. 草地、彩虹、小兔与小熊开场
2. 可通过滚轮逐张切换的横向回忆时间线
3. 六张可翻开的喜欢理由卡片
4. 气球形式的纪念数字
5. 信箱与生日信
6. 蛋糕、蜡烛、许愿和庆祝彩带

## 操作方式

- 鼠标滚轮：上一页或下一页
- 键盘方向键、空格、Page Up / Page Down：翻页
- 右侧页码点：跳转指定页面
- 底部左右按钮：上一页或下一页
- 手机端上下滑动：翻页

页面使用固定视口，不需要拖动长滚动条。

## 启动

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 修改生日内容

所有核心内容集中在 `src/data.ts`：

- `herName`：她的称呼
- `relationshipStart`：相识或确定关系的日期
- `musicSrc`：背景音乐路径
- `memories`：相遇与回忆内容
- `reasons`：喜欢她的理由
- `stats`：照片、地点等纪念数字
- `letter`：生日信正文

## 添加照片

将照片放入 `public/photos/`，再在 `src/data.ts` 填写路径：

```ts
photos: ["/photos/first-meeting.webp"]
```

没有配置照片时，会显示与整体画风一致的可爱占位卡片。

## 添加音乐

将音乐放入 `public/music/`，然后修改：

```ts
musicSrc: "/music/our-song.mp3"
```

用户点击“打开生日绘本”后，页面会尝试播放音乐。

## 直接预览指定页面

开发时可以添加 `page` 参数，例如：

```text
http://localhost:5173/?page=4
```

数字范围为 1～6。时间线页面会在页内逐张切换照片，最后一张之后才进入下一页。
