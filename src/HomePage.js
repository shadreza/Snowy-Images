import axios from 'axios';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Elements , CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51HpsnaBwkYF7v8zyJv6tUkaZ7oJSK9NR9RooOSHXflogaq7N2JMeUuyfpwGBBqtsFdyhHT118ROqLXF20J5T6Gmq00NPEPBNC9');

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

            <div className="p-10 text-center mt-10">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

            {/* <div className="text-center flex justify-center mt-10">
                <Elements stripe={stripePromise}>
                    <CardElement
                        className="w-80"
                        options={{
                            style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                            },
                        }}
                    />
                </Elements>
                <button className="bg-green-500 p-3 rounded-xl hover:bg-blue-500 hover:text-white" onClick={handleSubmit}>Pay</button>
            </div> */}
        </div>
    );
};

export default HomePage;