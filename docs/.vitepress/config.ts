import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/quant-problem/',
  title: 'Quant Problem',
  description: '数学与量化题库',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    math: true
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '题库', link: '/problems/' }
    ],
    sidebar: {
      '/problems/': [
        {
          text: '题库',
          items: [
            { text: '题库索引', link: '/problems/' },
            { text: '微积分样例', link: '/problems/calculus/derivative-example' }
          ]
        }
      ]
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kejie-tang/quant-problem' }
    ],
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    lastUpdated: {
      text: '最后更新'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言'
  }
})
