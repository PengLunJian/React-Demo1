import React, {
  Component
} from 'react';
import { Modal, Button } from 'antd';
import ReactSwipe from 'react-swipe';

import './ImageList.less';

export default class ScanImg extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.reactSwipe && this.reactSwipe.swipe.setup();
    this.reactSwipe && this.reactSwipe.swipe.slide(this.props.imgIndex || 0);
  }

  next() {
    this.reactSwipe.next();
  }

  prev() {
    this.reactSwipe.prev();
  }

  hideImgModal = ()=> {
    this.props.hideModal && this.props.hideModal();
    this.reactSwipe.swipe.slide(0);
    this.reactSwipe.swipe.kill();
  }

  render() {
    const { hideModal, showImgBox, imgIndex, imageData } = this.props;

    return (
      <Modal
        className="Image-Modal"
        title={'图片预览'}
        visible={showImgBox}
        onCancel={this.hideImgModal}
      > 
        {
          imageData
          ?
          <div>
            <ReactSwipe 
              className="imgSwiper" 
              ref={reactSwipe => this.reactSwipe = reactSwipe}
              swipeOptions={{
                startSlide: imgIndex,
                speed: 200,
                continuous: false,
                disableScroll: true
              }}
            > 
              {
                imageData.map((item, index) => {
                  return (<div key={item.id} className="slide_img"><img src={`${item.src}`} /></div>)
                })
              }
            </ReactSwipe>
            <div className="pagination_img">
              <Button type="primary" onClick={::this.prev}>上一张</Button>
              <Button type="primary" onClick={::this.next}>下一张</Button>
            </div>
          </div>
          :
          null
        }
        
      </Modal>
    );
  }
}