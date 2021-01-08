import React, { useState} from 'react'
import './home.css'
import './../components/navbar'
import Navbar from './../components/navbar'
import { Upload, Button, Image,  Empty } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
// import Chart from "react-google-charts";
import { Images } from '../config/image';
// import ImageUploader from 'react-images-upload';
// import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'
import Api from './../api/api'
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Home = props => {
   


    const [api, setApi] = useState([]);
    const [imglist, setimglist] = useState({});
    const [response, setResponse] = useState({});
    

    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const predicted = () => {
        if (imglist !== null) {
            const fetch = async () => {

                try {
                    var form_data = new FormData();

                    form_data.append("filePath", imglist);

                    // var type = String(radiobutton);
                    let result = await Api.createImageDensenet201(form_data);
                    setResponse(result)
                    // if (type === "Densenet121") {
                    //     let result = await Api.createImageDensenet121(form_data);
                    //     setResponse(result)
                    // }

                    // else if (type === "Xception") {

                    //     let result = await Api.createImageXception(form_data);
                    //     setResponse(result)
                    // }
                    // else if (type === "Densenet201") {

                    //     let result = await Api.createImageDensenet201(form_data);
                    //     setResponse(result);
                    // }

                    console.log('Fetch  successfully: ', response);
                    setApi(response.data);
                    setBtncircle(true);

                }
                catch (error) {
                    console.log('Failed to fetch: ', error);
                }
            }
            fetch();
        }

    }

    const getUploadParams = ({ meta }) => {
        const url = Images.IMAGE_CAT
        return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
    }

    const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }
   
    const [fileList, setFileList] = useState([]);

    const onChange1 = (fileList) => {
        setFileList(fileList.fileList);
        setimglist(fileList.file.originFileObj)
        console.log(">>New filelist: ", fileList)

    };

    const onPreview = async fileList => {
        let src = fileList.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(fileList.file.originFileObj);
                // console.log(fileList)
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const [radiobutton, setradiobutton] = useState("")
    const onChangeduy = e => {
        console.log('radio1 checked', e.target.value);
        setradiobutton(e.target.value)
        // setradiobutton({
        //     ...radiobutton,
        //   value1: e.target.value,
        // });
    };
    const [btncircle, setBtncircle] = useState(false)
    const options_canvas = {
        theme: "Light2",
        animationEnabled: true,
        // exportFileName: "Breast Cancer",
        // exportEnabled: true,
        title: {
            text: "Classification Breast Cancer "
        },
        data: [{

            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: response.Benign, label: "Benign" },
                { y: response.InSitu, label: "Institu" },
                { y: response.Invasive, label: "Invasive" },
                { y: response.Normal, label: "Normal" },

            ]
        }]
    }




    return (
        <div>
            <div className="navbarmenu">
                <Navbar />

            </div>
            {/* <div className="container-a"> */}
            {/* Classification Breast Cancer */}
            {/* </div> */}
            <div className="container-a">

                <div className="image">

                    <div className="border-img-form">

                        <div className="detailed-img" >



                            <ImgCrop rotate>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange1}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>

                            </ImgCrop>



                        </div>



                  
                            {/* <div className="radiobuttonchange">
                                <Radio.Group className="choose-type" size={200} onChange={onChange} value={value}>
                                    <Radio.Button onChange={onChangeduy} value="Densenet121">Densenet121</Radio.Button>
                                    <Radio.Button onChange={onChangeduy} value="Xception">Xception</Radio.Button>
                                    <Radio.Button onChange={onChangeduy} value="Densenet201">Densenet201</Radio.Button>
                                </Radio.Group>
                            </div> */}


                            <div className="btn">
                                <Button onClick={predicted} className="btn-predict"  >Predict</Button>
                            </div>
                       
                    </div>
                </div>


                <div className="chart" >
                    <div className="border-chart">
                        <div className="detailed-chart">

                            {btncircle === false ? <Empty /> : <CanvasJSChart options={options_canvas} />}



                        </div>
                        <div className="result">
                            <div className="father-result">
                                <div className="detailed-result">
                                    Predicted Result : {response.result}
                                </div>
                            </div>
                            <div className="father-model">
                                <div className="detailed-model">
                                    Percent Accuracy : {Math.round(response.accuracy * 100) / 100} %

                                </div>
                            </div>

                            <div className="img-predicted">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}


export default Home
