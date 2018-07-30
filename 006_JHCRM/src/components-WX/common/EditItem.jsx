import React, { Component } from 'react';
import { DatePicker, Picker, List, InputItem, Icon } from 'antd-mobile';

import './EditItem.less';

export default class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }
  
  render() {
    const {
      type,           //  type：inputShow（只显示不更改）； input； datePicker； picker
      label,
      mode,           //  datePicker中的模式，“date”代表年月日，不填则为年月日时分
      arrow = false,  //  是否带箭头，目前只有type为inputShow的时候才会用到
      editable = true,
      placeholder = '请输入',
      value = '',
      pickerTitle,
      pickerDatas = [],   //  picker的选择项
      cascade = false,     //  picker是否联动
      options = [],
      disabled = false,
      canEdit = true,     //  是否可以编辑 暂时只有增加条数的multiplyInput用到。
      cols = 3,
      isNull,   //isNull是true的话加上红框提示必填
      onChange = () => {},
      onClick = () => {},
      onPickerChange = () => {},
      addFn = () => {},
      format = null
    } = this.props;
  
    return (
      <div className={`EditItem fs-15${isNull ? ' isNull' : ''}`}>
        <div className="EditItemWrap">
          {
            (!type || type === 'inputShow') &&
              <div className="item" onClick={onClick}>
                <span className="label">{label}</span>
                {
                  arrow && (value === '') && canEdit ?
                    <span className="rightArrow">{placeholder}<Icon type="right" /></span>
                    :
                    <span className="value">{value}</span>
                }
              </div>
          }
          {
            type === 'input' &&
              <InputItem
                value={value}
                placeholder={placeholder}
                editable={editable}
                onChange={value => onChange(value)}
              >
                {label}
              </InputItem>
          }
          
          {
            type === 'datePicker' &&
              <DatePicker
                disabled={disabled}
                mode={mode}
                title="选择时间"
                extra={canEdit ? placeholder : ' '}
                format={format}
                value={value}
                minDate={new Date('1900/01/01')}
                onChange={date => onChange(date)}
              >
                <List.Item arrow="horizontal" className={`${canEdit ? '' : 'noEdit'} ${value ? 'hasValue' : ''}`}>{label}</List.Item>
              </DatePicker>
          }
          
          {
            type === 'picker' &&
            <Picker
              disabled={disabled}
              className="forss"
              data={pickerDatas}
              title=""
              cols={cols}
              cascade={cascade}
              extra={canEdit ? placeholder : ' '}
              value={value}
              onOk={v => this.props.onOk(v)}
              onPickerChange={onPickerChange}
            >
              <List.Item arrow="horizontal" className={`${(value.length && (value[0] || value[0] === 0)) ? 'hasValue' : ''} ${canEdit ? '' : 'noEdit'}`}>{label}</List.Item>
            </Picker>
          }
          
          {
            type === 'radio' &&
            <div className="item">
              <span className="label">{label}</span>
              {
                options && options.map(item => (
                  <span
                    className={`radioItem ${value === item.value && 'radioChecked'}`}
                    key={item.value}
                    onClick={() => onChange(item.value)}
                  >
                    <span className="fs-9" />
                    {item.label}
                  </span>
                ))
              }
              
            </div>
          }
    
          {
            type === 'multiplyInput' &&
            <div className="multiplyInputItem">
              {
                (value || '').split(',').map((item, index) => {
                  if (!canEdit) {
                    return (
                      <div key={index} className="item">
                        <span className="label">{index === 0 ? label : ' '}</span>
                        <span className="value">{value}</span>
                      </div>
                    );
                  }
                  return (
                    <InputItem
                      key={index}
                      // value={value}
                      value={item}
                      placeholder={placeholder}
                      editable={editable}
                      onChange={value => onChange(value, index)}
                    >
                      {index === 0 ? label : ' '}
                    </InputItem>
                  );
                })
              }
              {
                canEdit && <div className="addInputBtn" onClick={addFn}>+</div>
              }
            </div>
          }
        </div>
        
      </div>
    );
  }
}
