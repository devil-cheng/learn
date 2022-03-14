import { useEffect, useReducer, useRef } from 'react';

/**
 * 监听依赖，当依赖变化时触发重渲染防抖，返回值用于判断是否显示重渲染的节点
 * @param dependency 依赖（如果是引用数据类型，需要注意数据不变时保持引用不变）
 * @param wait 等待时间（毫秒，默认值 500）
 * @returns 是否渲染
 */
export function useDebounceRerender(dependency: any[], wait = 500) {
  const [, forcedToRender] = useReducer((x: number) => x + 1, 0);
  const dependencyRef = useRef(dependency);

  let triggered = false;
  if (dependency !== dependencyRef.current) {
    triggered = true;
  }
  dependencyRef.current = dependency;

  const visibleRef = useRef(true);
  if (triggered) {
    visibleRef.current = false;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        forcedToRender();
      }
    }, wait);
    return () => {
      clearTimeout(timer);
    };
  });

  return visibleRef.current;
}
