import React, {
  Component
} from 'react';
import ScanImg from './ScanImg';
import './ImageList.less';

export default class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImgBox: false,
      imgIndex: 0
    }
  }

  showModal = (imgIndex) => {
    console.log(imgIndex)
    this.setState({
      showImgBox: true,
      imgIndex: imgIndex
    });
  }

  hideModal = () => {
    this.setState({
      showImgBox: false,
      imgIndex: 0
    });
  }

  render() {
    const { imageData } = this.props;
    const { showImgBox, imgIndex } = this.state;
    console.log(imageData)
    
    return (
      <div className="ImageListWrap">
        {
          imageData && imageData.map((item, index) => {
            return (<img className="imgItem" key={item.id} onClick={() => this.showModal(index)} src={`${item.src}`} />)
          })
        }
        <ScanImg 
          hideModal={this.hideModal}
          showImgBox={showImgBox}
          imgIndex={imgIndex}
          imageData={imageData}
        />
        
      </div>
    );
  }
}