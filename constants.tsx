import { Project, Interest, SocialLink, Experience } from './types';
import { Gamepad2, Code, Terminal, Monitor, Github, Linkedin, Mail, Twitter, Cpu, Palette, Globe } from 'lucide-react';

// Using online placeholders to ensure the site renders correctly.
// If you have local images, move them to 'public/ProjectImages/' and update these paths to '/ProjectImages/YourImage.png'.
const arkdigImg2 = 'https://placehold.co/600x400/0d9488/ffffff?text=Arkdig';
const capsulesImg2 = 'https://placehold.co/600x400/0d9488/ffffff?text=Shoot+The+Capsules';
const langImg2 = 'https://placehold.co/600x400/0d9488/ffffff?text=Lang';
const keepAliveImg2 = 'https://placehold.co/600x400/0d9488/ffffff?text=Keep+Alive';
const arkdigImg = './ProjectImages/Arkdig.png'
const capsulesImg = './ProjectImages/ShootTheCapsules.png'
const langImg = './ProjectImages/Lang.png'
const keepAliveImg = './ProjectImages/KeepAlive.png'
/**
 * CLOUD CONFIGURATION
 * 
 * To enable "Update on the go":
 * 1. Use the Admin Panel (Settings -> Cloud) to "Publish to Cloud" (GitHub Gist).
 * 2. Copy the "Raw URL" provided by the Admin Panel.
 * 3. Paste it below into `EXTERNAL_DATA_URL`.
 * 
 * Once set, the website will load content from this URL instead of the hardcoded values below.
 */
export const EXTERNAL_DATA_URL = ""; 

export const NAV_LINKS = {
  en: [
    { name: 'About', href: '#background' },
    { name: 'Projects', href: '#projects' },
    { name: 'Interests', href: '#interests' },
    { name: 'Contact', href: '#contact' },
  ],
  zh: [
    { name: '关于', href: '#background' },
    { name: '作品', href: '#projects' },
    { name: '兴趣', href: '#interests' },
    { name: '联系', href: '#contact' },
  ]
};

export const HERO_CONTENT = {
  en: {
    greeting: "Hello, World! I'm",
    name: "Zhehao Cai",
    role: "Game Design & Development Student (aka Eric)",
    tagline: "Building immersive digital experiences through code and creativity.",
    viewWork: "View Work",
    contactMe: "Contact Me",
    badges: {
      code: "Clean Code",
      design: "Game Design",
      openSource: "Open Source"
    }
  },
  zh: {
    greeting: "你好，世界！我是",
    name: "Zhehao Cai",
    role: "游戏设计与开发专业学生 (Eric)",
    tagline: "通过代码与创意打造沉浸式数字体验。",
    viewWork: "查看作品",
    contactMe: "联系我",
    badges: {
      code: "整洁代码",
      design: "游戏设计",
      openSource: "开源精神"
    }
  }
};

// RESUME URLS
// These assume 'resume_en.pdf' and 'resume_cn.pdf' are located in the 'public' folder.
export const RESUME_URLS = {
  en: "/public/resume_en.pdf",
  zh: "/public/resume_cn.pdf"
};

export const CURRENT_FOCUS = {
  en: {
    label: "Currently Cooking",
    title: "CarAI Platform Development",
    description: "I'm currently building the official website for CarAI. The project involves creating a responsive, high-performance web interface to showcase AI-driven automotive solutions and visualize complex data.",
    tags: ["React", "TypeScript", "UI/UX", "Web Development"],
    link: "https://autofit-ai-345241661940.us-west1.run.app/", 
    linkText: "View Project"
  },
  zh: {
    label: "正在开发",
    title: "CarAI 平台开发",
    description: "我正在构建 CarAI 的官方网站。该项目致力于创建一个响应式、高性能的 Web 界面，用于展示 AI 驱动的汽车解决方案并实现复杂数据的可视化。",
    tags: ["React", "TypeScript", "UI/UX", "Web Development"],
    link: "https://autofit-ai-345241661940.us-west1.run.app/",
    linkText: "查看项目"
  }
};

export const THEMES = [
  { year: '2026', name: 'Transformative Teal', primary: '#0D9488', secondary: '#2DD4BF' },
  { year: '2025', name: 'Future Dusk', primary: '#483b5b', secondary: '#8a84b5' },
  { year: '2024', name: 'Peach Fuzz', primary: '#FFBE98', secondary: '#FFDAB9' },
  { year: '2023', name: 'Viva Magenta', primary: '#BE3455', secondary: '#E65C7B' },
  { year: '2022', name: 'Very Peri', primary: '#6667AB', secondary: '#8F90D6' },
];

export const GAMES_PLAYED = {
  Shooting: ["Valorant", "Overwatch 1/2", "CrossFire Mobile", "PUBG", "CS:GO/CS2", "Metro: Last Night", "NIKKE", "Strinova"],
  ACT: ["Black Myth: Wukong", "NieR: Automata", "Naraka: Bladepoint"],
  ARPG: ["Genshin Impact", "Honkai Impact 3rd", "Honkai Starrail"],
  Party: ["Among Us", "Goose Goose Duck", "Liar’s Bar", "Rubber Bandits", "Human Fall Flat", "Ultimate Chicken Horse", "Cuphead", "Lethal Company", "Overcooked! 2", "Content Warning", "Fall Guys", "Pico Park", "Super Bunny Man"],
  Puzzle: ["Paper Please", "It Takes Two", "Operation Tango", "Escape the Backrooms", "Plants vs. Zombies", "Escape Simulator"],
  Other: ["Minecraft", "Forza Horizon 5", "Split Fiction", "Arknight"]
};

export const ALL_GAME_TITLES = Object.values(GAMES_PLAYED).flat();

export const BACKGROUND_CONTENT = {
  en: {
    title: "Background",
    summary: "I'm a senior Game Design student passionate about creating systems that feel good to interact with. My journey started with building full-stack applications and evolved into creating custom games and controllers. I bridge the gap between technical logic and player experience.",
    coreFocusTitle: "Core Focus",
    coreFocusDesc: "I specialize in bridging the gap between artistic vision and technical implementation. Whether it's optimizing rendering pipelines or designing intuitive input systems, I love the challenge of making things feel \"just right.\"",
    skillsTitle: "> technical_skills",
    skills: ["Unity / C#", "React / TypeScript", "Unreal Engine 5", "Vibe Code Cleaning", "UI/UX Design", "Node.js"]
  },
  zh: {
    title: "背景经历",
    summary: "我是一名大四游戏设计学生，热衷于创造交互感良好的系统。我的旅程始于修改经典RPG游戏，逐渐发展为构建全栈应用和自定义游戏引擎。我致力于连接技术逻辑与玩家体验。",
    coreFocusTitle: "核心关注",
    coreFocusDesc: "我专注于连接艺术愿景与技术实现。无论是优化渲染管线还是设计直观的输入系统，我都热爱让一切“恰到好处”的挑战。",
    skillsTitle: "> 技术技能",
    skills: ["Unity / C#", "React / TypeScript", "Unreal Engine 5", "Vibe Code Cleaning", "UI/UX Design", "Node.js"]
  }
};

export const PROJECTS = {
  en: [
    {
      id: 'arkdig',
      title: 'Arkdig',
      category: 'Game',
      description: 'A prototype game created to see the result of combining mechanics from Arknights and TFT.',
      technologies: ['Love2D', 'Lua', 'Prototype'],
      imageUrl: arkdigImg,
      demoUrl: 'https://ericcccccai.itch.io/arkdig',
      featured: true
    },
    {
      id: 'shoot-capsules',
      title: 'Shoot the CAPSULES!',
      category: 'Game',
      description: 'A quick prototype of a TPS game, where the capsule zombies will try to attack the player when the player tries to shoot them while escaping a maze.',
      technologies: ['Unity3D', 'C#', 'Prototype'],
      imageUrl: capsulesImg,
      demoUrl: 'https://ericcccccai.itch.io/shoot-the-capsules',
      featured: true
    },
    {
      id: 'lang',
      title: '螂！Lang!',
      category: 'Game',
      description: 'A Taptap GameJam game. Created in a team of 4 within 3 days. Aims to test quick prototyping and scoping.',
      technologies: ['Unity2D', 'C#', 'GameJam'],
      imageUrl: langImg,
      demoUrl: 'https://ericcccccai.itch.io/lang',
      featured: true
    },
    {
      id: 'keep-alive',
      title: 'Keep Al!ve',
      category: 'Game',
      description: 'A simple clicking game sample to test GDevelop. Keep the chickens alive!',
      technologies: ['GDevelop', 'TestingPurposes'],
      imageUrl: keepAliveImg,
      demoUrl: 'https://ericcccccai.itch.io/keep-alive',
      featured: false
    }
  ] as Project[],
  zh: [
    {
      id: 'arkdig',
      title: 'Arkdig',
      category: 'Game',
      description: '一个结合了《明日方舟》与《云顶之弈》机制的原型游戏实验。',
      technologies: ['Love2D', 'Lua', 'Prototype'],
      imageUrl: arkdigImg,
      demoUrl: 'https://ericcccccai.itch.io/arkdig',
      featured: true
    },
    {
      id: 'shoot-capsules',
      title: 'Shoot the CAPSULES!',
      category: 'Game',
      description: '一款TPS游戏原型，玩家需在逃离迷宫时击退来袭的胶囊丧尸。',
      technologies: ['Unity3D', 'C#', 'Prototype'],
      imageUrl: capsulesImg,
      demoUrl: 'https://ericcccccai.itch.io/shoot-the-capsules',
      featured: true
    },
    {
      id: 'lang',
      title: '螂！Lang!',
      category: 'Game',
      description: 'TapTap GameJam 参赛作品。4人团队3天内开发完成，旨在挑战快速原型开发与项目规模控制。',
      technologies: ['Unity2D', 'C#', 'GameJam'],
      imageUrl: langImg,
      demoUrl: 'https://ericcccccai.itch.io/lang',
      featured: true
    },
    {
      id: 'keep-alive',
      title: 'Keep Al!ve',
      category: 'Game',
      description: '使用 GDevelop 制作的简单点击游戏样本。努力让小鸡活下来！',
      technologies: ['GDevelop', 'TestingPurposes'],
      imageUrl: keepAliveImg,
      demoUrl: 'https://ericcccccai.itch.io/keep-alive',
      featured: false
    }
  ] as Project[]
};

export const INTERESTS = {
  en: [
    {
      id: '1',
      title: 'Procedural Generation',
      icon: Terminal,
      description: 'Exploring algorithms like Wave Function Collapse and AI assitant to create better level design and user experience.'
    },
    {
      id: '2',
      title: 'Game UI/UX',
      icon: Palette,
      description: 'Deconstructing diegetic interfaces and studying how players digest information in real-time.'
    },
    {
      id: '3',
      title: 'Human-in-the-Loop AI Creation',
      icon: Cpu,
      description: 'Designing workflows where AI accelerates thinking while humans retain authorship, taste, and creative control.'
    },
    {
      id: '4',
      title: 'Web Technologies',
      icon: Globe,
      description: 'Keeping up with the latest web standards to bring game-quality fidelity to the browser.'
    }
  ] as Interest[],
  zh: [
    {
      id: '1',
      title: '程序化生成',
      icon: Terminal,
      description: '探索波函数坍缩算法和AI代理的合作以为玩家提供更佳的关卡设计体验。'
    },
    {
      id: '2',
      title: '游戏 UI/UX',
      icon: Palette,
      description: '解构叙事性界面，研究玩家如何实时消化信息。'
    },
    {
      id: '3',
      title: '人类在环的AI创作',
      icon: Cpu,
      description: '设计以人为核心的AI工作流程，让AI加速思考与生产力，同时保留人类的判断力、审美与创作主导权。'
    },
    {
      id: '4',
      title: 'Web 技术',
      icon: Globe,
      description: '紧跟最新的Web标准，将游戏级的高保真度带入浏览器。'
    }
  ] as Interest[]
};

export const CONTACT_CONTENT = {
  en: {
    title: "Let's Build Something Together",
    text: "I'm currently looking for internships and full-time positions in Game Design or Gameplay Programming. Check out my resume or drop me a line!",
    emailBtn: "Send Email",
    resumeBtn: "Download Resume"
  },
  zh: {
    title: "让我们一起创造",
    text: "我正在寻找游戏设计或游戏性编程的实习与全职机会。欢迎查看我的简历或直接联系！",
    emailBtn: "发送邮件",
    resumeBtn: "下载简历"
  }
};

export const SOCIALS: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/Ericcccccai', icon: Github },
  { platform: 'Itch.io', url: 'https://ericcccccai.itch.io/', icon: Gamepad2 },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ericcccccai/', icon: Linkedin },
  { platform: 'Email', url: 'mailto:Eric021202@gmail.com', icon: Mail },
];

export const SECTION_TITLES = {
  en: {
    projects: "Selected Works",
    projectsSubtitle: "A collection of games, tools, and web experiments.",
    interests: "Interests & Focus",
    interestsSubtitle: "Topics that keep me up at night exploring."
  },
  zh: {
    projects: "精选作品",
    projectsSubtitle: "游戏、工具与Web实验的集合。",
    interests: "兴趣与方向",
    interestsSubtitle: "让我废寝忘食探索的领域。"
  }
};