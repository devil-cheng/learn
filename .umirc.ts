import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'yhc',
  logo: '/logo.png',
  favicon: '/favicon.ico',
  outputPath: 'docs-dist',
  mode: 'site',
  alias: {
    '@': require('path').resolve(__dirname, 'src')
  },
  theme: {
    // 颜色
    '@c-primary': '#FFA22D',
    '@c-heading': '#454d64',
    '@c-text': '#454d64',
    '@c-secondary': '#717484',
    '@c-link': '@c-primary',
    '@c-border': '#ebedf1',
    '@c-light-bg': '#f9fafb',
    '@link-color': '#FFA22D',
    // 尺寸
    '@s-nav-height': '48px',
    '@s-mobile-nav-height': '50px',
    '@s-menu-width': '260px',
    '@s-site-menu-width': '230px',
    '@s-menu-mobile-width': '240px',
    '@s-content-margin': '58px',
    // 其他
    '@prefix': '__dumi-default',
    '@mobile': "~'only screen and (max-width: 767px)'",
    '@desktop': "~'only screen and (min-width: 768px)'",
  },
  links: [{ href: '/site.css', rel: 'stylesheet' }],
  // more config: https://d.umijs.org/config
});
