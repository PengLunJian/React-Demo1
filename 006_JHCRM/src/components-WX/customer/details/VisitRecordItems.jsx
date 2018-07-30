import React, { Component } from 'react';
import HighList from '../../../hoc-WX/HighList';
import VisitRecordItem from './VisitRecordItem';

class VisitRecordItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { data, ...props } = this.props;
    return (
      <div className="VisitRecordItems">
        {data && data.map(item => (
          <VisitRecordItem
            key={item.id}
            data={item}
            {...props}
          />
        ))}
      </div>
    );
  }
}

const VisitRecordItemsComponent = HighList()(VisitRecordItems);

export default VisitRecordItemsComponent;
