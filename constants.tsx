import { Project, Interest, SocialLink, Experience } from './types';
import { Gamepad2, Code, Terminal, Monitor, Github, Linkedin, Mail, Twitter, Cpu, Palette, Globe } from 'lucide-react';

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
    name: "Alex Dev",
    role: "Game Design & Development Student",
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
    name: "Alex Dev",
    role: "游戏设计与开发专业学生",
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

export const RESUME_URLS = {
  en: "/resume_en.pdf",
  zh: "/resume_cn.pdf"
};

export const CURRENT_FOCUS = {
  en: {
    label: "Currently Cooking",
    title: "Voxel Engine Architecture",
    description: "I'm currently rewriting my custom C++ voxel engine to support real-time global illumination using Vulkan ray tracing. It's a deep dive into low-level graphics programming and memory management.",
    tags: ["C++", "Vulkan", "GLSL", "Systems Programming"],
    link: "https://github.com",
    linkText: "View Devlog"
  },
  zh: {
    label: "正在开发",
    title: "体素引擎架构",
    description: "我正在重写我的自定义C++体素引擎，利用Vulkan光线追踪支持实时全局光照。这是对底层图形编程和内存管理的深入探索。",
    tags: ["C++", "Vulkan", "GLSL", "系统编程"],
    link: "https://github.com",
    linkText: "查看开发日志"
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
    summary: "I'm a senior Game Design student passionate about creating systems that feel good to interact with. My journey started with modding classic RPGs and evolved into building full-stack applications and custom game engines. I bridge the gap between technical logic and player experience.",
    coreFocusTitle: "Core Focus",
    coreFocusDesc: "I specialize in bridging the gap between artistic vision and technical implementation. Whether it's optimizing rendering pipelines or designing intuitive input systems, I love the challenge of making things feel \"just right.\"",
    skillsTitle: "> technical_skills",
    skills: ["Unity / C#", "React / TypeScript", "Unreal Engine 5", "GLSL Shaders", "UI/UX Design", "Node.js"]
  },
  zh: {
    title: "背景经历",
    summary: "我是一名大四游戏设计学生，热衷于创造交互感良好的系统。我的旅程始于修改经典RPG游戏，逐渐发展为构建全栈应用和自定义游戏引擎。我致力于连接技术逻辑与玩家体验。",
    coreFocusTitle: "核心关注",
    coreFocusDesc: "我专注于连接艺术愿景与技术实现。无论是优化渲染管线还是设计直观的输入系统，我都热爱让一切“恰到好处”的挑战。",
    skillsTitle: "> 技术技能",
    skills: ["Unity / C#", "React / TypeScript", "Unreal Engine 5", "GLSL Shaders", "UI/UX Design", "Node.js"]
  }
};

export const PROJECTS = {
  en: [
    {
      id: '1',
      title: 'Nebula Drifter',
      category: 'Game',
      description: 'A fast-paced 2D roguelike space shooter built in Unity. Features procedural generation and custom shader effects for nebulae.',
      technologies: ['Unity', 'C#', 'HLSL', 'Aseprite'],
      imageUrl: 'https://picsum.photos/800/450?random=1',
      demoUrl: 'https://itch.io',
      repoUrl: 'https://github.com',
      featured: true
    },
    {
      id: '2',
      title: 'Inventory System UI',
      category: 'Web',
      description: 'A drag-and-drop RPG inventory system prototype built with React and Framer Motion to demonstrate complex web interactions.',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
      imageUrl: 'https://picsum.photos/800/450?random=2',
      demoUrl: 'https://vercel.com',
      repoUrl: 'https://github.com',
      featured: true
    },
    {
      id: '3',
      title: 'Chrono Tactics',
      category: 'Game',
      description: 'A turn-based strategy game focusing on time-manipulation mechanics. Developed for the GMTK Game Jam 2023.',
      technologies: ['Godot', 'GDScript', 'Pixel Art'],
      imageUrl: 'https://picsum.photos/800/450?random=3',
      demoUrl: 'https://itch.io',
      featured: false
    },
    {
      id: '4',
      title: 'Portfolio v1',
      category: 'Web',
      description: 'My previous portfolio site exploring 3D web elements using Three.js.',
      technologies: ['Three.js', 'JavaScript', 'HTML/CSS'],
      imageUrl: 'https://picsum.photos/800/450?random=4',
      repoUrl: 'https://github.com',
      featured: false
    }
  ] as Project[],
  zh: [
    {
      id: '1',
      title: 'Nebula Drifter',
      category: 'Game',
      description: '基于Unity开发的快节奏2D肉鸽太空射击游戏。特色包括程序化生成和自定义星云着色器效果。',
      technologies: ['Unity', 'C#', 'HLSL', 'Aseprite'],
      imageUrl: 'https://picsum.photos/800/450?random=1',
      demoUrl: 'https://itch.io',
      repoUrl: 'https://github.com',
      featured: true
    },
    {
      id: '2',
      title: 'Inventory System UI',
      category: 'Web',
      description: '使用React和Framer Motion构建的拖放式RPG库存系统原型，展示复杂的Web交互效果。',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
      imageUrl: 'https://picsum.photos/800/450?random=2',
      demoUrl: 'https://vercel.com',
      repoUrl: 'https://github.com',
      featured: true
    },
    {
      id: '3',
      title: 'Chrono Tactics',
      category: 'Game',
      description: '一款专注于时间操控机制的回合制策略游戏。为GMTK Game Jam 2023开发。',
      technologies: ['Godot', 'GDScript', 'Pixel Art'],
      imageUrl: 'https://picsum.photos/800/450?random=3',
      demoUrl: 'https://itch.io',
      featured: false
    },
    {
      id: '4',
      title: 'Portfolio v1',
      category: 'Web',
      description: '我之前的个人作品集网站，探索了使用Three.js的3D网页元素。',
      technologies: ['Three.js', 'JavaScript', 'HTML/CSS'],
      imageUrl: 'https://picsum.photos/800/450?random=4',
      repoUrl: 'https://github.com',
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
      description: 'Exploring algorithms like Wave Function Collapse and Perlin Noise to create infinite worlds.'
    },
    {
      id: '2',
      title: 'Game UI/UX',
      icon: Palette,
      description: 'Deconstructing diegetic interfaces and studying how players digest information in real-time.'
    },
    {
      id: '3',
      title: 'Interactive Shaders',
      icon: Cpu,
      description: 'Writing custom shaders to achieve stylized visual effects and performant graphics.'
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
      description: '探索波函数坍缩和柏林噪声等算法以创造无限的世界。'
    },
    {
      id: '2',
      title: '游戏 UI/UX',
      icon: Palette,
      description: '解构叙事性界面，研究玩家如何实时消化信息。'
    },
    {
      id: '3',
      title: '交互式着色器',
      icon: Cpu,
      description: '编写自定义着色器以实现风格化的视觉效果和高性能图形。'
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
  { platform: 'GitHub', url: 'https://github.com', icon: Github },
  { platform: 'Itch.io', url: 'https://itch.io', icon: Gamepad2 },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { platform: 'Email', url: 'mailto:hello@example.com', icon: Mail },
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