export type Memory = {
  date?: string;
  chapter?: string;
  title?: string;
  text?: string;
  photos?: string[];
};

export const birthdayConfig = {
  // 这里是最常修改的内容：姓名、日期、音乐和照片都集中在本文件。
  herName: "小文文",
  relationshipStart: "2024-10-18",
  birthdayDate: "2026-08-31",
  // 播放顺序：第一首结束后自动播放第二首；第二首结束后回到第一首。
  musicPlaylist: [
    "/music/Joseph_Vincent_-_L-O-V-E_(mp3.pm).mp3",
    "/music/IMSLP301563-PMLP02598-upload.mp3",
  ],
  heroSubtitle: "献给我最喜欢的女孩",
  memories: [
    {
      date: "2024.10.18",
      title: "初次相遇的那天😍",
      text: "在社团活动的操场上，我们跳了第一支舞",
      photos: ["/photos/page2_1.jpg"],
    },
    {
      title: "然后又一起跳了好多好多支舞",
      text: "我们跳起来很有默契，归功于小文文跳的好",
      photos: ["/photos/page2_2.png"],
    },
    {
      date: "2025.11.12",

      title: "终于在一起了！",
      text: "还记得当时在英国待着，每日无所事事，只想着赶紧回来见你🤗",
      photos: ["/photos/page2_3.jpg"],
    },
    {
      date: "2025.12.31",
      title: "一起去听音乐会🤩",
      text: "还记得听的谁吗？",
      photos: ["/photos/page2_4.jpg"],
    },
    {
      date: "2026.3.22",
      title: "去撸哈基米😺",
      text: "就算是你也不害怕这只猫，摸它的时候它会摇身子伸懒腰",
      photos: ["/photos/page2_5.jpg"],
    }, {
      date: "2026.8.20",
      title: "度过一个暑假再相见",
      text: "又是苦苦等待的一个多月！",
      photos: ["/photos/page2_6.jpg"],
    },
  ] satisfies Memory[],
  reasons: [
    ["01", "喜欢你的笑", "你笑起来时周围似乎变亮了"],
    ["02", "喜欢你的脸蛋", "肉嘟嘟的捏着好玩🤗"],
    ["03", "喜欢你的可爱", "虽然有时候笨笨的"],
    ["04", "喜欢你的温柔", "你记得我无意中说过的话，也总能照顾到细小的情绪。"],
    ["05", "喜欢我们的默契", "话不用说完就会相视一笑"],
    ["06", "喜欢你的陪伴", "每天陪在我身边不嫌弃我的缺点"],
  ],
  stats: {
    days: 293,
    meals: "数不清了",
    dances: "100+",
    memories: 293,
  },
  letter: [
    "见字如面。谢谢你来到我的生活里。因为你，许多原本普通的日子有了盼头：与你见面，一起吃饭，一起出去玩。",
    "谢谢你在我脆弱难过的时候陪伴着我，给了我珍贵的慰藉和鼓励，也希望小文文在脆弱的时候能想到我在你身后，永远支持着你。在一起的日子里我惹过你不高兴，今后我一定会做到最好。",
    "新的一岁，希望小文文继续热爱，继续追求，拥有更多不需要理由的快乐。也希望未来每一个重要或平凡的日子，我都能陪在你身边。",
  ],
};
