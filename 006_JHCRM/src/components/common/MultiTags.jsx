import React, {
  Component
} from 'react';
import {
  Tag,
  Input,
  Tooltip,
  Icon
} from 'antd';

import './MultiTags.less';

export default class MultiTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.data,
      inputVisible: false,
      inputValue: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: nextProps.data,
    })

  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    this.props.addTags && this.props.addTags(tags)
  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.props.addTags && this.props.addTags(tags)
  }

  saveInputRef = input => this.input = input;

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const { title, canEdit } = this.props;
    
    return (
      <div className="MultiTags">
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag 
              key={tag} 
              closable={canEdit} 
              afterClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && canEdit && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 150 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && canEdit && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> 添加
          </Tag>
        )}
        
      </div>
    );
  }
}