import React, { useEffect, useState } from 'react';
import { singleFileUpload, getSingleFiles } from '../../data/api';
import './VideoUploader.css';
import uploadImg from '../../Assets/plus.png'
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';

function VideoUploader() {

    const [singleFile, setSingleFile] = useState('');
    const [singleFileDatas, setSingleFileDatas] = useState([]);
    const [toggle, setToggle] = useState(false);


    useEffect(() => {
        getSingleFileList();
    }, [])


  

    const getSingleFileList = async () => {
        const data = await getSingleFiles();
        setSingleFileDatas(data);
    }



    const handleChangeFileUpload = (event) => {
        setSingleFile(event.target.files[0]);
        toast("File Selected Suceessfully")
        

    }

    const handleClickUpload = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData);
        getSingleFileList();
        toast("File Uploaded Suceessfully")
    }

    console.log(singleFileDatas);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div>
                <Navbar />
            </div>
            <div className="upload_page">
                <div className="upload_leftSide">
                    <label className="fileContainer">
                        <img src={uploadImg} alt="img" />
                        <input type="file" accept='video/*' onChange={(e) => handleChangeFileUpload(e)} hidden />
                    </label>
                    <button className="upload_button" onClick={() => handleClickUpload()}>Upload</button>
                </div>
                <div className="upload_rightSide">
                    {
                        singleFileDatas.slice().reverse().map((file, index) => {
                            return (
                                <div key={index} className="video">
                                    <video width="280" height="200" controls>
                                        <source src={`https://assignmentcheck.herokuapp.com/${file.filePath}`} type="video/mp4" />
                                        <source src={`https://assignmentcheck.herokuapp.com/${file.filePath}`} type="video/ogg" />
                                    </video>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoUploader
