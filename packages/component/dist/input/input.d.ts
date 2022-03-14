import React from 'react';
import { InputProps, TextAreaProps, GroupProps, SearchProps } from 'antd/es/input';
import { PasswordProps } from 'antd/es/input/Password';
import { IExtendProps } from './typings';
interface InputComponent extends React.ForwardRefExoticComponent<InputProps & IExtendProps> {
    Group: React.FC<GroupProps>;
    Search: React.FC<SearchProps>;
    TextArea: React.FC<TextAreaProps & IExtendProps>;
    Password: React.FC<PasswordProps>;
}
declare const Input: InputComponent;
export default Input;
