import {useState, useRef, useContext} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {AiOutlineCiCircle} from "react-icons/ai";
import {useMessage} from "../hooks/useMessage.jsx";
import error_img from '../assets/404_Error-rafiki.svg';
import {useNavigate} from "react-router-dom";
import AuthContext from "../AuthContext.jsx";
import axiosInstance from "../axios.js";

const Item = ({post}) => {
    const navigate = useNavigate();
    const {baseUrl} = useContext(AuthContext);
    const [loaded, setLoaded] = useState(false);
    const [ordering, setOrdering] = useState(false);
    const inputRef = useRef(null);
    const {message, showMessage } = useMessage(4000);

    const handleAddToCart = () => {
        if (inputRef.current.value === '' || inputRef.current.value === 0) {
            showMessage({text: "please enter a valid quantity", type: 'error'});
            return;
        }
        setOrdering(true);
        axiosInstance.post(baseUrl +'api/orders/', {
            product: post.id,
            quantity: inputRef.current.value
        }).then(() => {
            showMessage({text: `${inputRef.current.value} of ${post.name} Added to cart`, type: 'success'});}
        ).catch(err => {
            if (err.response === undefined) {
                showMessage({text: "something went wrong try again later", type: 'error'});
            } else {
                showMessage({text: err.response.data.message, type: 'error'});
            }

        }).finally(() => {
            setOrdering(false);
        });
    }

    return (
        <>
            {message.text && (
                <div className={`z-20 w-fit top-0 left-1/2 ${message.type === 'success' ? 'bg-sky-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md fixed animate-fade-in-down`}>
                  {message.text}
                </div>
              )}
        <li className="flex flex-col gap-2 rounded p-6 border shadow justify-between ">
                <figure className='card-wrap groupe relative' data-category={post.category_name}>
                    <img
                        src={post.image}
                        alt={post.name}
                        className="w-full h-64 object-cover rounded hover:opacity-95 transition cursor-pointer hover:scale-105"
                        loading='lazy'
                        onClick={() => navigate(`${post.id}`)}
                        onLoad={() => setLoaded(true)}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src=error_img;
                          }}
                        width='300'
                        height='600'
                    />
                    <figcaption className="text-center text-sky-700 text-md mt-2">{post.name}</figcaption>
                    {!loaded &&
                            <Skeleton className='skeleton' inline={true}/>
                    }
                </figure>
                <p className="text-gray-700 px-2 mt-4 text-sm line-clamp-2">{post.description}</p>
                {/*TODO: add checks for input field*/}
                <div>
                    <input
                        ref={inputRef}
                        id='quantity'
                        type='number'
                        name='quantity'
                        defaultValue='1'
                        className='w-12 h-8 border border-gray-300 rounded-md text-center'
                        onChange={e => {
                            if ((e.target.value < 1)) {
                                e.target.value = 1;
                            }else if (e.target.value > 500) {
                                e.target.value = 500;
                            }
                        }}
                    />
                    <label htmlFor="quantity">
                        <span className='px-2 text-gray-500 text-sm'>
                            Quantity
                        </span>
                    </label>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <p className="text-gray-700 text-lg font-semibold font-Pacifico">{post.price}$</p>
                    <button
                        className="active-btn"
                        onClick={handleAddToCart}
                    >
                        {ordering ? (
                            <AiOutlineCiCircle className='animate-spin' />
                        ) : (
                            'Add to cart'
                        )}
                    </button>
                </div>
        </li>
        </>
    );
};

export default Item;
