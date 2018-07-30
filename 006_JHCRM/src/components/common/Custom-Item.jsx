import React, { Component } from 'react';
import { Input, Select, DatePicker, TreeSelect  } from 'antd';
import moment from 'moment';
import MultiTags from './MultiTags';
import ImageList from './ImageList';
import './Custom-Item.less';

const Option = Select.Option;
const { TextArea } = Input;

export default class CustomItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const dateFormat = 'YYYY-MM-DD';
    
    const {
      fromSearch,   //  是否来自搜索框（样式不一致）
      type,
      label,
      value,
      placeholder,
      options,  //  select的选项
      isSingle,
      treeData,
      canEdit = true,    //  是否启用编辑
      onChange = () => {},
      tagsData,
      addTagsFn,
      imageData
    } = this.props;
    
    return (
      <div className={`Custom-Item ${fromSearch ? 'SearchItem' : ''} ${isSingle ? 'singleItem' : ''}`}>
        <span key="label" className="label">{label}：</span>
        {
          !type || type === 'inputShow' ?
            <div className="inputShow">{value}</div>
            :
            null
        }
        
        {
          type === 'input' ?
            <Input
              key="input"
              disabled={!canEdit}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
            />
            :
            null
        }
        
        {
          type === 'select' ?
            <Select
              disabled={!canEdit}
              defaultValue={value}
              className="select"
              onChange={onChange}
              placeholder={placeholder}
            >
              {
                fromSearch && <Option key=" " value="" >全部</Option>
              }
              {
                options && options.length && options.map(item => (
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                ))
              }
            </Select>
            :
            null
        }
        
        {
          type === 'datePicker' ?
            <DatePicker
              disabled={!canEdit}
              defaultValue={value ? moment(value, dateFormat) : null}
              onChange={onChange}
              placeholder="请选择日期"
            />
            :
            null
        }
        
        {
          type === 'textarea' ?
            <TextArea
              disabled={!canEdit}
              value={value}
              placeholder={placeholder}
              autosize={{ minRows: 3 }}
              onChange={onChange}
            />
            :
            null
        }
        
        {
          type === 'textareaShow' ?
            <TextArea
              className="textareaShow"
              disabled={!canEdit}
              value={value}
              placeholder={placeholder}
              autosize={{ minRows: 3 }}
              onChange={onChange}
            />
            :
            null
        }

        {
          type === 'treeSelect' ?
            <TreeSelect
              disabled={!canEdit}
              defaultValue={value}
              value={value}
              className="select"
              onChange={onChange}
              placeholder={placeholder}
              treeData={treeData}
            />
            :
            null
        }

        {
          type === 'multiTags' ?
            <MultiTags
              title="邮箱："
              data={tagsData}
              addTags={addTagsFn}
              className="multiTags"
              canEdit={canEdit}
            />
            :
            null
        }

        {
          type === 'images' ?
            <ImageList
              title="图片信息："
              imageData={imageData}
              className="ImageListWrap"
            />
            :
            null
        }
        
      </div>
    );
  }
}
