/**
 * title: 搜索用户
 * desc: 一个带有远程搜索，防抖控制，请求时序控制，加载状态的多选示例。
 */
/* eslint-disable */
import React from 'react';
import { Select, Spin } from '@vv-work-desktop-web-core/atoms';
import debounce from 'lodash/debounce';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const fetchRef = React.useRef(0);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = value => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then(newOptions => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

async function fetchUserList(username) {
    console.log('fetching user', username);

    return fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(body =>
            body.results.map(user => ({
                label: `${user.name.first} ${user.name.last}`,
                value: user.login.username
            }))
        );
}

const Demo = () => {
    const [value, setValue] = React.useState([]);

    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchUserList}
            onChange={newValue => {
                setValue(newValue);
            }}
            style={{ width: '100%' }}
        />
    );
};

export default Demo;
