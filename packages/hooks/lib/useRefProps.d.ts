import type { MutableRefObject } from 'react';
/**
 * 引用最新的props
 * @param props
 * @example
   const propsRef = useRefProps(props)
   const handleClick = useCallback(() => {
     const { onClick } = propsRef.current
   }, [])
 */
declare function useRefProps<PropType>(props: PropType): MutableRefObject<PropType>;
export default useRefProps;
