import React, { useState, useEffect } from 'react'
import './home.css'
import './../components/navbar'
import Navbar from './../components/navbar'
import { Radio, Upload, Button, Form, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import Chart from "react-google-charts";
import { Images } from '../config/image';
import ImageUploader from 'react-images-upload';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import Api from './../api/api'
const Home = props => {
    // const state = {
    //     options: {},
    //     series: {
    //         begin 
    //     },

    //     Chart: {
    //         type: 'donut'
    //     },

    // };


    const [api, setApi] = useState([]);
    const [imglist, setimglist] = useState({});
    const [response, setResponse] = useState({});
    // const propss = {
    //     name: 'file',
    //     action: 'https://run.mocky.io/v3/60d35e87-06eb-4393-b813-64c4fd729bb2',
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //         if (info.file.status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };

    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const lozduy = () => {
        if (imglist !== null) {
            const fetch = async () => {

                try {
                    var form_data = new FormData();

                    form_data.append("filePath", imglist);

                    var type = String(radiobutton);

                    if (type === "Densenet121") {
                        let result = await Api.createImageDensenet121(form_data);
                        setResponse(result)
                    }

                    else if (type === "Xception") {

                        let result = await Api.createImageXception(form_data);
                        setResponse(result)
                    }
                    else if (type === "Densenet201") {

                        let result = await Api.createImageDensenet201(form_data);
                        setResponse(result);
                    }

                    console.log('Fetch  successfully: ', response);
                    setApi(response.data);


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
    // const [pictures, setPictures] = useState([]);

    // const onDrop = picture => {
    //     setPictures([...pictures, picture]);
    // };
    const [fileList, setFileList] = useState([]);

    const onChange1 = (fileList) => {
        setFileList(fileList.fileList);
        setimglist(fileList.file.originFileObj)
        console.log(">>New filelist: ", fileList)

    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
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
    
    return (
        <div>
            <Navbar />

            <div className="container-a" >
                {/* <div className="background-img">
                    <img src={Images.IMAGE_BACKGROUND} />
                </div> */}
                <div className="image">
                    {/* <img src={Images.IMAGE_BACKGROUND} /> */}
                    <div className="border-img">
                        <div className="detailed-img">
                            {/* <Form className="form-img">
                                <Form.Item> */}
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ marginLeft: "30px", justifyContent: "center", alignItems: "center" }}>
                                    <ImgCrop rotate>
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange1}
                                            onPreview={onPreview}
                                        >
                                            {fileList.length < 5 && '+ Upload'}
                                        </Upload>
                                       
                                    </ImgCrop>
                                </div>
                            </div>


                            {/* </Form.Item>
                            </Form> */}
                        </div>
                        <div className="upload-img">
                            {/* <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>, */}
                        </div>
                    </div>

                </div>
                <div className="btn">
                    <Button onClick={lozduy} className="btn-predict"  >Prediction</Button>
                </div>
                <div className="type">
                    <div className="label">
                        Result:
                    </div>
                    <div className="choose-type">
                        <Radio.Group style={{ paddingRight: "180px" }} size={200} onChange={onChange} value={value}>
                            <Radio onChange={onChangeduy} value="Densenet121">Densenet121</Radio>
                            <Radio onChange={onChangeduy} value="Xception">Xception</Radio>
                            <Radio onChange={onChangeduy} value="Densenet201">Densenet201</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div className="chart">
                    <div className="border-chart">
                        <div className="detailed-chart">
                            {/* <Chart options={state.options} series={state.series} labels={state.labels} type="donut" width="380" /> */}

                            <Chart
                                // style={{backgroundColor:"black"}}
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}

                                data={[
                                    ['Name', 'Percentage'],
                                    ['Bengin', response.Benign],
                                    ['Institu', response.InSitu],
                                    ['Invasive', response.Invasive],
                                    ['Normal', response.Normal]
                                ]}
                                options={{
                                    title: 'Breast Cancer',
                                }}
                            />
                        </div>
                        <div className="result">
                            <div className="detailed-result">
                                Predicted Result : {response.result}
                            </div>
                            <div className="detailed-model">
                                Model : {response.model}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home
