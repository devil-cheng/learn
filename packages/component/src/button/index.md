---
title: Button æé® ð¤
group:
    title: éç¨
    path: /components/common
    order: 1
nav:
    title: ç»ä»¶
    path: /components
    
---

æé®ç¨äºå¼å§ä¸ä¸ªå³æ¶æä½ã

## ä½æ¶ä½¿ç¨

æ è®°äºä¸ä¸ªï¼æå°è£ä¸ç»ï¼æä½å½ä»¤ï¼ååºç¨æ·ç¹å»è¡ä¸ºï¼è§¦åç¸åºçä¸å¡é»è¾ã

## ä»£ç æ¼ç¤º

<div class='waterfall'>
    <code src="./demos/basic.jsx"></code>
    <code src="./demos/icon.jsx"></code>
    <code src="./demos/danger.jsx"></code>
    <code src="./demos/size.jsx"></code>
    <code src="./demos/disabled.jsx"></code>
    <code src="./demos/loading.jsx"></code>
    <code src="./demos/multiple.jsx"></code>
    <code src="./demos/ghost.jsx"></code>
    <code src="./demos/block.jsx"></code>
</div>

## API

éè¿è®¾ç½® Button çå±æ§æ¥äº§çä¸åçæé®æ ·å¼ï¼æ¨èé¡ºåºä¸ºï¼`type` -> `shape` -> `size` -> `loading` -> `disabled`ã

æé®çå±æ§è¯´æå¦ä¸ï¼

| å±æ§ | è¯´æ | ç±»å | é»è®¤å¼ | çæ¬ |
| --- | --- | --- | --- | --- |
| block | å°æé®å®½åº¦è°æ´ä¸ºå¶ç¶å®½åº¦çéé¡¹ | boolean | false |  |
| danger | è®¾ç½®å±é©æé® | boolean | false |  |
| disabled | æé®å¤±æç¶æ | boolean | false |  |
| ghost | å¹½çµå±æ§ï¼ä½¿æé®èæ¯éæ | boolean | false |  |
| href | ç¹å»è·³è½¬çå°åï¼æå®æ­¤å±æ§ button çè¡ä¸ºå a é¾æ¥ä¸è´ | string | - |  |
| htmlType | è®¾ç½® `button` åçç `type` å¼ï¼å¯éå¼è¯·åè [HTML æ å](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |  |
| icon | è®¾ç½®æé®çå¾æ ç»ä»¶ | ReactNode | - |  |
| loading | è®¾ç½®æé®è½½å¥ç¶æ | boolean \| { delay: number } | false |  |
| shape | è®¾ç½®æé®å½¢ç¶ | `default` \| `circle` \| `round` | 'default' |  |
| size | è®¾ç½®æé®å¤§å° | `large` \| `middle` \| `small` | `middle` |  |
| target | ç¸å½äº a é¾æ¥ç target å±æ§ï¼href å­å¨æ¶çæ | string | - |  |
| type | è®¾ç½®æé®ç±»å | `primary` \| `ghost` \| `dashed` \| `link` \| `text` \| `default` | `default` |  |
| onClick | ç¹å»æé®æ¶çåè° | (event) => void | - |  |

æ¯æåç button çå¶ä»ææå±æ§ã

## FAQ

### å¦ä½ç§»é¤ä¸¤ä¸ªæ±å­ä¹é´çç©ºæ ¼ï¼

æ ¹æ® Ant Design è®¾è®¡è§èè¦æ±ï¼æä»¬ä¼å¨æé®å(ææ¬æé®åé¾æ¥æé®é¤å¤)åªæä¸¤ä¸ªæ±å­æ¶èªå¨æ·»å ç©ºæ ¼ï¼å¦æä½ ä¸éè¦è¿ä¸ªç¹æ§ï¼å¯ä»¥è®¾ç½® [ConfigProvider](/components/config-provider/#API) ç `autoInsertSpaceInButton` ä¸º `false`ã

<img src="https://gw.alipayobjects.com/zos/antfincdn/MY%26THAPZrW/38f06cb9-293a-4b42-b183-9f443e79ffea.png" style="box-shadow: none; margin: 0; width: 100px" alt="ç§»é¤ä¸¤ä¸ªæ±å­ä¹é´çç©ºæ ¼"  />

<style>
[id^="components-button-demo-"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^="components-button-demo-"] .ant-btn-rtl {
  margin-right: 0;
  margin-left: 8px;
}
[id^="components-button-demo-"] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
[data-theme="dark"] .site-button-ghost-wrapper {
  background: rgba(255, 255, 255, 0.2);
}
</style>

## è®¾è®¡æå¼

- [æçæé®ç©¶ç«è¯¥æ¾åªå¿ï¼ï¼| Ant Design 4.0 ç³»ååäº«](https://zhuanlan.zhihu.com/p/109644406)
