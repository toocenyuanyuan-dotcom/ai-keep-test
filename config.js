// 换活动时只改这个文件。
// 業界 → 配色（2 种油墨；纸色和黑色全体共通）
// 職種 → 一个代表工具的图标
// 関係 → 变形程度 t（0 = 伝統、0.5 = 共生、1 = AI）

const INKS = {
  pink:   [255, 72, 176],
  yellow: [255, 222, 0],
  blue:   [0, 120, 191],
  green:  [0, 169, 92],
  orange: [255, 108, 47],
  teal:   [0, 131, 138],
  purple: [118, 91, 167],
  red:    [255, 102, 94],
  mint:   [130, 216, 213],
  brown:  [146, 95, 82],
  sky:    [98, 168, 229],
  lime:   [181, 211, 52],
};

const INDUSTRIES = [
  { id: '01', name: '建設・不動産',                       inks: ['orange', 'brown'] },
  { id: '02', name: '電力・ガス・水道・エネルギー',        inks: ['yellow', 'blue'] },
  { id: '03', name: '製造',                               inks: ['blue', 'orange'] },
  { id: '04', name: '病院・医療サービス',                  inks: ['mint', 'red'] },
  { id: '05', name: '商社・卸',                           inks: ['teal', 'yellow'] },
  { id: '06', name: '小売',                               inks: ['pink', 'yellow'] },
  { id: '07', name: '外食・中食',                          inks: ['red', 'yellow'] },
  { id: '08', name: '金融',                               inks: ['teal', 'purple'] },
  { id: '09', name: '運輸',                               inks: ['sky', 'orange'] },
  { id: '10', name: '通信',                               inks: ['sky', 'purple'] },
  { id: '11', name: '放送・映像・音楽',                    inks: ['purple', 'pink'] },
  { id: '12', name: '出版・新聞',                          inks: ['blue', 'brown'] },
  { id: '13', name: '広告',                               inks: ['pink', 'blue'] },
  { id: '14', name: 'ゲーム',                             inks: ['lime', 'purple'] },
  { id: '15', name: 'インターネットメディア',              inks: ['pink', 'sky'] },
  { id: '16', name: 'ソフトウェア・IT',                    inks: ['green', 'blue'] },
  { id: '17', name: '学校・教育機関',                      inks: ['green', 'yellow'] },
  { id: '18', name: '旅行・レジャー・生活関連サービス',     inks: ['mint', 'orange'] },
  { id: '19', name: '人材・アウトソーシング・コンサルティング', inks: ['purple', 'yellow'] },
  { id: '20', name: '印刷',                               inks: ['pink', 'green'] },
  { id: '21', name: '官公庁・協会・団体',                  inks: ['teal', 'brown'] },
  { id: '22', name: 'その他',                             inks: ['mint', 'purple'] },
];

// icon＝Tabler Icons（MIT 授权）的名字和字码，一览：https://tabler.io/icons
const JOBS = [
  { name: 'グラフィックデザイン',   icon: 'vector-bezier',  code: 0xef1d },
  { name: 'パッケージデザイン',     icon: 'package',        code: 0xeaff },
  { name: 'Webデザイン',           icon: 'pointer',        code: 0xf265 },
  { name: 'その他デザイン',         icon: 'palette',        code: 0xeb01 },
  { name: 'プランニング',           icon: 'bulb',           code: 0xea51 },
  { name: '建築・設計',             icon: 'ruler-2',        code: 0xeed2 },
  { name: '3DCG制作',              icon: '3d-cube-sphere', code: 0xecd7 },
  { name: '映像制作',               icon: 'movie',          code: 0xeafa },
  { name: 'システム管理',           icon: 'server',         code: 0xeb1f },
  { name: '製品開発',               icon: 'tool',           code: 0xeb40 },
  { name: '製造・制作',             icon: 'hammer',         code: 0xef91 },
  { name: '品質・工程管理',         icon: 'zoom-check',     code: 0xef09 },
  { name: 'マーケティング・広報',    icon: 'speakerphone',   code: 0xed61 },
  { name: '管理職・経営',           icon: 'crown',          code: 0xed12 },
  { name: '人事',                  icon: 'users',          code: 0xebf2 },
  { name: '総務・経理・事務一般',    icon: 'calculator',     code: 0xeb80 },
  { name: 'プログラミング',         icon: 'code',           code: 0xea77 },
  { name: '運営・スタッフ',         icon: 'id-badge-2',     code: 0xf076 },
  { name: '教育者・先生',           icon: 'school',         code: 0xecf7 },
  { name: '営業',                  icon: 'briefcase',      code: 0xea46 },
  { name: 'その他',                icon: 'puzzle',         code: 0xeb10 },
];

const RELATIONS = [
  { key: 'AI',   label: 'AIの圧勝',     t: 1.0 },
  { key: '共生', label: '共生',          t: 0.5 },
  { key: '伝統', label: '伝統メディアの再興', t: 0.0 },
];

// 回答的存放处：Google 表单（提交）＋发布到网络的表格 CSV（读回）。同事不用登录。
// 表单和表格在她的 Google 账号里：表单「AI test」、表格「未命名的表单（回复）」
const BACKEND = {
  submit: 'https://docs.google.com/forms/d/e/1FAIpQLSfasydbkpF1pN-Wy27yJ19O9-93TdNPHd-XLmFlVAdm467xWg/formResponse',
  fields: { percent: 'entry.702037522', keep: 'entry.13627185' },
  // 实时读取（表格设为「知道链接的人可以查看」）。「发布到网络」的 CSV 有多个新旧缓存，人数会倒退，不用
  csv: 'https://docs.google.com/spreadsheets/d/17mVtsLhPR4Nt0qudL-L47Sv9s3pCkuzcx2Rnrs32zzE/gviz/tq?tqx=out:csv',
};

// 第二题「AI 再厉害，你也不想交出去的是？」
const KEEPS = ['判断力', 'アイデア', '試行錯誤の過程', '手を動かす時間', '人とのコミュニケーション', 'センス', '責任感', '挑戦する気持ち', '前向きさ', 'スキルを身につけること'];
