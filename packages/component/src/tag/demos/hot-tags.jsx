/**
 * title: 热门标签
 * desc: 选择你感兴趣的话题。
 */
/* eslint-disable */

import React from 'react';
import { Tag } from '@vv-work-desktop-web-core/atoms';

const { CheckableTag } = Tag;

const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

class HotTags extends React.Component {
    state = {
        selectedTags: []
    };

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    render() {
        const { selectedTags } = this.state;
        return (
            <div>
                <span style={{ marginRight: 8 }}>Categories:</span>
                {tagsFromServer.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
        );
    }
}

export default HotTags;
