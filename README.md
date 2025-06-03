# React 国际化应用 (React i18n App)

这是一个现代化的 React 应用，具有完整的国际化支持，使用 Vite 构建工具和 TypeScript 开发。

## 🌟 功能特性

- ✨ **国际化支持** - 支持中文、日语、英语三种语言
- 🔷 **TypeScript 支持** - 完整的类型安全
- ⚡ **Vite 构建工具** - 快速的开发体验
- 🚀 **现代 React 开发** - 使用 React 18+最新特性
- 🎨 **响应式设计** - 适配移动端和桌面端
- 🔧 **自定义 Hooks** - 封装语言偏好管理逻辑

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

应用将在 `http://localhost:5173/` 启动

### 构建生产版本

```bash
pnpm run build
```

### 预览生产版本

```bash
pnpm run preview
```

## 📁 项目结构

```
src/
├── components/           # React组件
│   ├── LanguageSwitcher.tsx  # 语言切换组件
│   └── FeatureList.tsx       # 功能展示组件
├── hooks/               # 自定义Hooks
│   └── useLanguagePreference.ts  # 语言偏好管理Hook
├── locales/             # 语言资源文件
│   ├── zh-CN.json      # 中文资源
│   ├── ja-JP.json      # 日语资源
│   └── en-US.json      # 英语资源
├── i18n.ts             # i18n配置文件
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 🌍 国际化配置

### 支持的语言

- 🇨🇳 简体中文 (zh-CN)
- 🇯🇵 日本語 (ja-JP)
- 🇺🇸 English (en-US)

### 添加新语言

1. 在 `src/locales/` 目录下创建新的语言文件（如 `fr-FR.json`）
2. 复制现有语言文件的结构并翻译内容
3. 在 `src/i18n.ts` 中导入新语言文件并添加到资源配置
4. 更新 `supportedLanguages` 数组

### 使用翻译

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t("welcome")}</h1>;
}
```

## 🛠️ 技术栈

- **React 18+** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 现代化构建工具
- **react-i18next** - React 国际化库
- **i18next** - 国际化框架
- **pnpm** - 高效的包管理器

## 📝 开发说明

### 自定义 Hook 使用

项目包含一个自定义 Hook `useLanguagePreference`，提供以下功能：

```tsx
const {
  currentLanguage, // 当前语言代码
  currentLanguageName, // 当前语言显示名称
  availableLanguages, // 可用语言列表
  changeLanguage, // 切换语言函数
  isLanguageSupported, // 检查语言是否支持
} = useLanguagePreference();
```

### 样式定制

所有样式都在 `src/App.css` 中定义，使用 CSS 变量和现代 CSS 特性，支持响应式设计。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License
