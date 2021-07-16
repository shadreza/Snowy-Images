import axios from 'axios';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HomePage = () => {
    const [image, setImage] = useState(null);
    const fileUpload = (e) => {
        let IMAGE="";
        const img = e.target.files[0]
        const imgData = new FormData();
        imgData.set('key','45993c2fa3b2590d51cee87d8ff551a6');
        imgData.append('image',img);
        axios.post('https://api.imgbb.com/1/upload',imgData)
            .then(function (response) {
                IMAGE = response.data.data.display_url
                setImage(IMAGE)
            })
    }
    return (
        <div className="p-10">
            <h3 className="text-2xl">Hey there upload your images</h3>
            <input type="file" name="imageUploader" id="imageInput" className="mt-10 " onChange={ e => fileUpload(e)}/>
            <div className="text-center flex justify-center">
            {
                image !== null &&
                    <LazyLoadImage
                        className="rounded-xl m-10 object-center"
                        alt={image.alt}
                        height={image.height}
                        src={image} // use normal <img> attributes as props
                        width={image.width} 
                    />
            }
            </div>
        </div>
    );
};

export default HomePage;