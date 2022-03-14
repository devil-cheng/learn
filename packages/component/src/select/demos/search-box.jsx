/**
 * title: 搜索框
 * desc: 搜索和远程数据结合。
 */
/* eslint-disable */
import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';
import jsonp from 'fetch-jsonp';

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        jsonp(`https://suggest.taobao.com/sug?code=utf-8&q=${value}`)
            .then(response => response.json())
            .then(d => {
                if (currentValue === value) {
                    const { result } = d;
                    const data = [];
                    result.forEach(r => {
                        data.push({
                            value: r[0],
                            text: r[0]
                        });
                    });
                    callback(data);
                }
            });
    }

    timeout = setTimeout(fake, 300);
}

class SearchInput extends React.Component {
    state = {
        data: [],
        value: undefined
    };

    handleSearch = value => {
        if (value) {
            fetch(value, data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
    };

    render() {
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
        return (
            <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
}

export default function Demo() {
    return <SearchInput placeholder="input search text" style={{ width: 200 }} />;
}
