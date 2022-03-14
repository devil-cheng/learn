/**
 * title: 联动
 * desc: 省市联动是典型的例子。<br>推荐使用 [Cascader](/components/cascader/) 组件。
 */
/* eslint-disable */
import React from 'react';
import { Select } from '@vv-work-desktop-web-core/atoms';

const { Option } = Select;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
};

class Demo extends React.Component {
    state = {
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0]
    };

    handleProvinceChange = value => {
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0]
        });
    };

    onSecondCityChange = value => {
        this.setState({
            secondCity: value
        });
    };

    render() {
        const { cities } = this.state;
        return (
            <div>
                <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={this.handleProvinceChange}>
                    {provinceData.map(province => (
                        <Option key={province}>{province}</Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 120, marginLeft: 12 }}
                    value={this.state.secondCity}
                    onChange={this.onSecondCityChange}
                >
                    {cities.map(city => (
                        <Option key={city}>{city}</Option>
                    ))}
                </Select>
            </div>
        );
    }
}

export default Demo;
