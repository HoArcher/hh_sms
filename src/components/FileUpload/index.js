import React from "react";
import PropTypes from "prop-types";
import { message, Upload, Icon, Button } from "antd";
import styles from "./index.less";

//地区选择组件  待完善
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  //地址选择时
  onChange(e, type) {
    if (type !== 2) {
      if (this.props.beforeUpload) {
        if (!this.props.beforeUpload(e.target.files[0])) {
          return;
        }
      }
    }
    this.upDateImg(e.target, type);
    const self = this;
    const reads = new FileReader();
    reads.readAsDataURL(e.target.files[0]);
    // reads.onload = function(r) {

    // }
  }

  upDateImg(a, type) {
    //   const self = this
    //   const fetchPostFile = this.props.actions.fetchPostFile
    //   Base.fileUpload(a, fetchPostFile, function(value) {
    //         let enclosure = Object.assign({}, self.state.enclosure)
    //   })
  }

  render() {
    const upLoadProps = {
      name: "file",
      // action: `${API.domain.baseUrl}/beetrade-business/file/uploadImg?type=${
      //   this.props.type
      // }`,
      headers: {
        authorization: "authorization-text",
        sys_id: sessionStorage.sys_id,
        sys_authentication: sessionStorage.sys_authentication,
        tradeToken: sessionStorage.tradeToken
      },
      onChange(info) {
        let { fileList } = info;
        if (info.file.status !== "uploading") {
          // console.log(info.file, info.fileList)
          // if(self.props.labelInValue){
          //   self.props.onChange(info.file)
          // }
        }
        if (info.file.status === "done") {
          if (info.file.response.code === 0) {
            if (self.props.onChange) {
              self.props.labelInValue
                ? self.props.onChange({
                    value: configs.httpToHttps(
                      info.file.response.data.access_url
                    ),
                    name: info.file.name
                  })
                : self.props.onChange(
                    configs.httpToHttps(info.file.response.data.access_url)
                  );
            }
            // self.dataChange(
            //   'supplementaryAnnex',
            //   info.file.response.data.access_url
            // )
            message.success(`${info.file.name} 上传成功!`);
            self.setState({ fileList: [...info.fileList] });
          } else {
            message.error(`${info.file.response.data.message}`);
            fileList.status = "error";
            fileList.response = info.file.response.data.message;
          }
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 上传失败`);
        }
        self.setState({ fileList });
      }
    };
    const self = this;
    const { fileList } = this.state;
    const { text, style, showUploadList } = this.props;
    return (
      <Upload
        {...upLoadProps}
        showUploadList={showUploadList}
        fileList={fileList}
      >
        {this.props.Button}
      </Upload>
    );
  }
}

export default FileUpload;

//限定控件传入的属性类型
FileUpload.propTypes = {
  //选中时的回调
  beforeUpload: PropTypes.func,
  onChange: PropTypes.func
  //每个地区选择框的样式如果为对象则三个为一样，为数组时分别为三个的样式
  // style: PropTypes.object || PropTypes.array,
  //返回值的模式
  // mode: PropTypes.objectOf(['districtID'])，
  //返回值的模式
  // value: PropTypes.objectOf(['districtID'])
};

//设置默认属性
FileUpload.defaultProps = {
  style: { width: "120px" },
  type: 2, //0为图片--1为文件--2为图片或者文件
  showFileList: "",
  onChange: () => false,
  showUploadList: true,
  Button: (
    <Button>
      <Icon type="upload" />
      上传文件
    </Button>
  ),
  beforeUpload: file => {
    //文件或者图片验证
    this.file = file;
    let typeToken = false;
    if (file.type === "image/jpg") {
      typeToken = true;
    }
    if (file.type === "image/png") {
      typeToken = true;
    }
    if (file.type === "image/jpeg") {
      typeToken = true;
    }
    if (file.type === "image/doc" || file.type === "image/docx") {
      typeToken = true;
    }
    if (!typeToken) {
      message.error("请上传JPG，JPEG，PNG，格式文件");
    }
    const isMin2M = file.size / 1024 / 1024 > 2;
    const isMax5M = file.size / 1024 / 1024 < 5;
    if (!isMin2M) {
      message.error("图片最小为2M！");
    }
    if (!isMax5M) {
      message.error("图片最大为5M！");
    }
    return typeToken && isMin2M && isMax5M;
  },
  mode: "districtID",
  labelInValue: false
};
