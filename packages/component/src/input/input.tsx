import React, { ChangeEvent, useContext, forwardRef } from 'react';
import { Input as AntdInput } from 'antd';
import { InputProps, TextAreaProps, GroupProps, SearchProps, InputRef } from 'antd/es/input';
import { ConfigContext } from 'antd/es/config-provider/context';
import { ConfigConsumerProps } from 'antd/lib/config-provider';
import { PasswordProps } from 'antd/es/input/Password';
import classnames from 'classnames';
import { useControllableValue } from '@vv-work-desktop-web-core/hooks';
import { Tips } from './components';
import { IExtendProps } from './typings';

interface InputComponent
    extends React.ForwardRefExoticComponent<InputProps & IExtendProps> {
    Group: React.FC<GroupProps>;
    Search: React.FC<SearchProps>;
    TextArea: React.FC<TextAreaProps & IExtendProps>;
    Password: React.FC<PasswordProps>;
}

const Input: InputComponent = forwardRef<InputRef, InputProps & IExtendProps>(
    ({ format = '/', className, tips = false, maxLength = 500, suffix, highlight = 20, ...reset }, ref) => {
        const [value, onChange] = useControllableValue<string>(reset);

        const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext as any);
        const prefixCls = getPrefixCls('input');

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value);

        return (
            <AntdInput
                className={classnames(tips && `${prefixCls}-tips`, className)}
                ref={ref}
                onChange={handleChange}
                value={value}
                maxLength={maxLength}
                {...reset}
                suffix={
                    tips ? (
                        <Tips
                            prefixCls={prefixCls}
                            format={format}
                            currentLength={value?.length || 0}
                            maxLength={maxLength}
                            highlight={highlight}
                            {...reset}
                        />
                    ) : (
                        suffix
                    )
                }
            />
        );
    }
) as InputComponent;

export default Input;
