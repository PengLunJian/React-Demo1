import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WX_Promise } from '../../../service/wx';
import { isIOS } from '../../../utils/isIOS';
import {
  addImage,
  deleteImage,
  confirmImages,
  syncTempImages
} from '../../../redux/ducks/customer/details/updateImages';
import WithTopTitle from '../../../components-WX/common/WithTopTitle';

import './UploadImages.less';

class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    this.props.syncTempImages();
  }
  
  //1、选择相册或本地拍照
  chooseImage = () => {
    WX_Promise()
      .then(wx => {
        wx.chooseImage({
          count: 9,
          success: (res) => {
            const localIds = res.localIds;
            if(isIOS()){
              this.getLocalImgData(localIds);
            }else{
              this.getLocalImgData_android(localIds);
            }
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  //安卓渲染图片方法
  getLocalImgData_android = (localIds) => {
    WX_Promise()
      .then(wx => {
        for (let i = 0; i < localIds.length; i++) {
          const src = 'data:image/jpeg;base64,' + localIds[i];
          this.addImage({
            localId: localIds[i],
            src: localIds[i]
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  //2、渲染本地选择的图片
  getLocalImgData = (localIds) => {
    WX_Promise()
      .then(wx => {
        for (let i = 0; i < localIds.length; i++) {
          wx.getLocalImgData({
            localId: localIds[i], // 图片的localID
            success: (res) => {
              const localData = res.localData;
              const src = isIOS() ? localData : ('data:image/jpeg;base64,' + localData);
              this.addImage({
                localId: localIds[i],
                src
              });
            },
            fail: (err) => {
              console.log(err);
            }
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  //3、添加选中后的图片
  addImage = (data) => {
    this.props.addImage(data);
  };
  //4、删除选中后的图片
  deleteImage = (id) => {
    this.props.deleteImage(id);
  };
  //5、确认提交选中的图片
  confirmImages = () => {
    const { history } = this.props;
    this.props.confirmImages();
    history.goBack();
  };
  
  render() {
    const { tempImages } = this.props;
    return (
      <WithTopTitle 
        title="添加照片"
      >
        <div
          className={(tempImages && tempImages.length) ?
            'uploadImages' : 'uploadImages empty'}
        >
          <div className="uploadItems">
            {
              tempImages && tempImages.map(item => (
                <div key={item.id || item.localId} className="uploadItem">
                  <img src={item.src} />
                  <span
                    className="btnDelete"
                    onClick={() => {
                      this.deleteImage(item.id || item.localId);
                    }}
                  >&nbsp;
                  </span>
                </div>
              ))
            }
            <div className="uploadItem">
              <button className="btnAdd" onClick={this.chooseImage} />
            </div>
          </div>
          <div className="uploadButton">
            <button
              className="btnConfirm"
              onClick={this.confirmImages}
            >
              确认
            </button>
          </div>
        </div>
      </WithTopTitle>
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state;
  const { updateImages } = customer;
  const { images, tempImages } = updateImages;
  
  return {
    images,
    tempImages
  };
};

export default connect(mapStateToProps, {
  addImage,
  deleteImage,
  confirmImages,
  syncTempImages
})(UploadImages);
