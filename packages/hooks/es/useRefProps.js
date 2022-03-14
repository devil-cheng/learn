import { useRef } from 'react';
/**
 * 引用最新的props
 * @param props
 * @example
   const propsRef = useRefProps(props)
   const handleClick = useCallback(() => {
     const { onClick } = propsRef.current
   }, [])
 */

function useRefProps(props) {
  var ref = useRef(props);
  ref.current = props;
  return ref;
}

export default useRefProps;