import React, { ChangeEvent, useContext, forwardRef, ForwardRefRenderFunction } from 'react';
import AntdTextArea from 'antd/es/input/TextArea';
import { ConfigConsumerProps } from 'antd/lib/config-provider';
import { ConfigContext } from 'antd/es/config-provider/context';
import { TextAreaProps } from 'antd/es/input';
import classnames from 'classnames';
import { Tips } from './components';
import { IExtendProps } from './typings';
import { useControllableValue } from '@vv-work-desktop-web-core/hooks';

const TextArea: ForwardRefRenderFunction<any, TextAreaProps> = (
    { format = '/', className, tips = true, maxLength = 500, highlight = 20, ...reset }: TextAreaProps & IExtendProps,
    ref
) => {
    const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext as any);
    const prefixCls = getPrefixCls('textarea');
    const [value, onChange] = useControllableValue<string>(reset);
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => onChange?.(event.target.value);

    return (
        <div className={`${prefixCls}-warp`}>
            <AntdTextArea
                className={classnames(className, tips && `${prefixCls}-input`)}
                ref={ref}
                onChange={handleChange}
                value={value}
                maxLength={maxLength}
                {...reset}
            />
            <div className={`${prefixCls}-tips-num`}>
                {tips && (
                    <Tips
                        prefixCls={prefixCls}
                        format={format}
                        currentLength={value?.length || 0}
                        maxLength={maxLength}
                        highlight={highlight}
                        {...reset}
                    />
                )}
            </div>
        </div>
    );
};

export default forwardRef(TextArea);
