import { useEffect, useState, useRef, useMemo } from 'react'
import '../../App.css'
import axios from 'axios'
import { uploadcloudnary } from './upload'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import GoogleMap1 from './GoogleMap1'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import JoditEditor from 'jodit-react';

function FormC() {
    const initialValue = {
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        a5: 'Canda',
        a6: '',
        b1: '',
        b2: '',
        b3: '',
        b4: '',
        b5: '',
        b6: '',
        c1: '',
        c2: '',
        c3: '',
        d1: '',
        d2: '',
        d3: [],
        e1: [],
        e2: [],
        e3: [],
        e4: [],
        f1: '',
        f11: '',
        f2: '',
        f22: '',
        f3: '',
        f33: '',
        f4: '',
        f5: '',
        g1: '',
        g2: '',
        h1: [],
        h2: ''
    }

    const [userData, setUserData] = useState(initialValue)
    const [ImageChange, setImageChange] = useState([])

    const [Latitude, setLatitude] = useState(25.317644)
    const [Longitude, setLongitude] = useState(77.673676)
    const { a1, a2, a3, a4, a5, a6, b1, b2, b3, b4, b5, b6, c1, c2, c3, d1, d2, d3, e1, e2, e3, e4, f1, f11, f2, f22, f3, f33, f4, f5, g1, g2, h1, h2 } = userData;
    const navigate = useNavigate()



    const onValueChange = (e) => {
        const { name, value, checked, type } = e.target;

        if (name === "e1") {
            const checkedValues = [...userData.e1];
            if (checked) {
                checkedValues.push(value);
            } else {
                const index = checkedValues.indexOf(value);
                if (index !== -1) {
                    checkedValues.splice(index, 1);
                }
            }
            setUserData({ ...userData, e1: checkedValues });
        } else if (name === "e2" && type === "checkbox") {
            const checkedValues = [...userData.e2];
            if (checked) {
                checkedValues.push(value);
            } else {
                const index = checkedValues.indexOf(value);
                if (index !== -1) {
                    checkedValues.splice(index, 1);
                }
            }
            setUserData({ ...userData, e2: checkedValues });
        } else if (type === "checkbox") {
            setUserData({ ...userData, [name]: checked });
        } else if (type === "radio" || type === "select-one") {
            setUserData({ ...userData, [name]: value });
        } else if (type === "select-multiple") {
            const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
            );
            setUserData({ ...userData, [name]: selectedOptions });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleDualInputChange = (e, i, arrayName, data) => {
        setUserData((prevState) => {
            const newItems = [...prevState[arrayName]];
            newItems[i] = data.split(' : ')[0] + ' : ' + e.target.value;
            return {
                ...prevState,
                [arrayName]: newItems,
            };
        });
    };


    useEffect(() => {
        console.log('Updated user data:', userData);
    }, [userData]);


    const [links, setLinks] = useState([]);
    const handleImageSubmit = async (e) => {
        e.preventDefault();

        try {
            let arr = []
            for (let i = 0; i < ImageChange.length; i++) {
                console.log("ImageChange[i] " + i + " " + JSON.stringify(ImageChange[i]))
                const data = await uploadcloudnary(ImageChange[i])
                arr.push(data)
            }
            // console.log("arr " + JSON.stringify(arr));
            setLinks(arr)
            setUserData((prevData) => ({
                ...prevData,
                h1: arr,
            }));
            // console.log(userData);
        } catch (err) { console.log(err) }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const url = "http://localhost:5000/fill-form";
        const dataSet = { Collection: [userData] };

        try {
            const response = await axios.post(url, dataSet, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }

        const { email, role } = jwt_decode(token);
        navigate('/monitor', { state: { id: 1, email: email } })
    };




    const handleAdd = (arrayName) => {
        setUserData(prevState => {
            const newItems = [...prevState[arrayName], ""];
            return {
                ...prevState,
                [arrayName]: newItems,
            };
        });
    };

    const handleChange = (e, i, arrayName) => {
        setUserData(prevState => {
            const newItems = [...prevState[arrayName]];
            newItems[i] = e.target.value;
            return {
                ...prevState,
                [arrayName]: newItems,
            };
        });
    };

    const handleDelete = (i, arrayName) => {
        setUserData(prevState => {
            const newItems = [...prevState[arrayName]];
            newItems.splice(i, 1);
            return {
                ...prevState,
                [arrayName]: newItems,
            };
        });
    };


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCeOKb-Q5-NEb5mbNntnFGP61r_-xCsO9Y' //need to define your google api key 
    })

    const editor = useRef(null);

    // const config = useMemo(
    // 	{
    // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    // 		placeholder: placeholder || 'Start typings...'
    // 	},
    // 	[placeholder]
    // );
    const onEditorChange = (newContent) => {
        setUserData({ ...userData, a6: newContent });
    };

    return (
        <>
            <div className='flex min-h-screen bg-slate-200'>
                <div className='flex flex-col my-4 sm:my-9 sm:w-[80vw] border-2 border-gray-500 rounded-3xl p-5 divide-y-4 bg-white  divide-slate-700  mx-[10px]  sm:m-auto '>
                    <h1 className='leading-7 underline text-2xl sm:text-3xl sm:m-auto font-bold mt-0 text-gray-900'>Property inspection Module</h1>
                    <br />
                    <div className='hover:bg-slate-100 sm:grid space-y-4 flex flex-col sm:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Property Address:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className=' sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4 '>
                                    <span >Address:</span>
                                    <input onChange={(e) => onValueChange(e)} name="a1" value={a1} placeholder='Address' type="text" className='mx-2 border-2 border-slate-400' />
                                </div>
                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Unit No:</label>
                                    <input onChange={(e) => onValueChange(e)} name="a2" value={a2} placeholder='Unit No' type="number" className='mx-2 border-2 border-slate-400' />
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label>&nbsp;City:&nbsp;&nbsp;</label>
                                    <input onChange={(e) => onValueChange(e)} name="a3" value={a3} placeholder='City' type="text" className='  mx-2 border-2 border-slate-400' />
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Zip Code:</label>
                                    <input onChange={(e) => onValueChange(e)} name="a4" value={a4} placeholder='Zip Code' type="text" className='mx-2 border-2 border-slate-400' />
                                </div>

                                <div className='sm:w-[100%]  h-[300px] sm:h-auto'>
                                    <div className='flex flex-wrap sm:justify-around gap-y-4'>

                                        <label className='m-auto'>Property Description:</label>
                                        {/* <textarea onChange={(e) => onValueChange(e)} name="a6" value={a6} type="text" className='mx-2 border-2 border-slate-400' rows="2" cols={24} /> */}
                                        <JoditEditor
                                            className='mx-2 sm:w-[790px] w-[100%] h-[200px] sm:h-auto border-2 border-slate-400'
                                            ref={editor}
                                            value={userData.a6}
                                            // config={config}
                                            // tabIndex={1} // tabIndex of textarea
                                            // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={onEditorChange}
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>
                    {/* ------------------------------------------Property Summary:------------------- */}

                    <div className='hover:bg-slate-100 sm:grid space-y-4 flex flex-col sm:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Property Summary:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className=' sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4 '>
                                    <span >Builder Type:</span>
                                    {/* <input onChange={(e) => onValueChange(e)} name="a1" value={a1} placeholder='Address' type="text" className='mx-2 border-2 border-slate-400' /> */}
                                    <select name='b1' className='mx-2 border-2 border-slate-400'
                                        onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                    >
                                        <option value=""> </option>
                                        <option value="Single_Family">Single Family</option>
                                        <option value="Detached">Detached</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Row/Townhouse">Row/Townhouse</option>
                                    </select>
                                </div>
                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Age of Building:</label>
                                    <input name='b2' onChange={(e) => onValueChange(e)} value={b2} type="number" placeholder='Age of Building' className='mx-2 border-2 border-slate-400' />
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label>Propert Type:</label>
                                    <select name="b3" className='mx-2 border-2 sm:w-[130px] border-slate-400' onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} >
                                        <option value="Single_Family"> </option>
                                        <option value="Single_Family">Single Family</option>
                                        <option value="Semi-Detached_Home">Semi-Detached Home</option>
                                        <option value="Multifamily_home">Multifamily home</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Apartments">Apartments</option>
                                        <option value="Comdominiums">Comdominiums</option>
                                    </select>
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Square Footage:</label>
                                    <input name="b4" value={b4} onChange={(e) => onValueChange(e)} type="text" className='mx-2 border-2 border-slate-400' />
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Parking Type:</label>
                                    <span className='mx-1 '>
                                        <input onChange={onValueChange} type="radio" name="b5" value="Attached" className='mx-1' /> Attached
                                        <input onChange={onValueChange} type="radio" name="b5" value="Detached" className='mx-1' /> Detached
                                        <input onChange={onValueChange} type="radio" name="b5" value="Street" className='mx-1' /> Street
                                    </span>
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label>Title:</label>
                                    <select name='b6' onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className='mx-2 border-2 border-slate-400' id="dog-names">
                                        <option value="Strata"> </option>
                                        <option value="Strata">StraHista</option>
                                        <option value="Condos">Condos</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -----------------------------------------Property History:----------------------------- */}

                    <div className='hover:bg-slate-100 md:grid md:mt-4 space-y-4 flex flex-col md:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Property History:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Date:</label>
                                    <input onChange={(e) => onValueChange(e)} name="c1" value={c1} type="date" className='mx-2 border-2 border-slate-400' />
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label>Status:</label>
                                    <select name="c2" onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className='mx-2 border-2 border-slate-400' id="dog-names">
                                        <option > </option>
                                        <option value="Rent">Rent</option>
                                        <option value="Sold">Sold</option>
                                        <option value="Occupied">Occupied</option>
                                    </select>
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label>Status:</label>
                                    <select name='c3' onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className='mx-2 border-2 border-slate-400' id="dog-names">
                                        <option > </option>
                                        <option value="Sold">Sold</option>
                                        <option value="Occupied">Occupied</option>
                                    </select>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -----------------------------------Property Details--------------- */}
                    <div className='hover:bg-slate-100 md:grid space-y-4 flex flex-col md:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Property Details:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Bedroom:</label>
                                    <input onChange={(e) => onValueChange(e)} name="d1" value={d1} type="text" placeholder='Bedrooms' className='mx-2 border-2 border-slate-400' />
                                </div>
                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label >Bedrooms:</label>
                                    <input onChange={(e) => onValueChange(e)} name="d2" value={d2} type="number" placeholder='No of Bedrooms' className='mx-2 border-2 border-slate-400' />
                                </div>

                                <div className='md:w-[20%] w-[90%] flex flex-wrap sm:justify-around '>
                                    <button
                                        onClick={() => handleAdd('d3')}
                                        className='h-[40px] text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                                    >
                                        Add Field:
                                    </button>
                                </div>
                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <span>
                                        {userData.d3.map((data, i) => (
                                            <div className='flex mt-4 w-auto' key={i}>
                                                <input
                                                    value={data.split(' : ')[0]}
                                                    onChange={(e) => handleChange(e, i, 'd3')}
                                                    placeholder='Fields'
                                                    className='mx-2 border-2 border-slate-400'
                                                />

                                                <input
                                                    value={data.split(' : ')[1]}
                                                    onChange={(e) => handleDualInputChange(e, i, 'd3', data)}
                                                    placeholder='No of Fields'
                                                    className='mx-2 border-2 border-slate-400'
                                                />
                                                <button
                                                    onClick={() => handleDelete(i, 'd3')}
                                                    className='rounded mx-2 mb-4 '
                                                >

                                                    <span class="material-symbols-outlined text-red-500 font-bold absolute ">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        ))}
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --------------------------------------------Interior Features--------------------- */}

                    <div className='hover:bg-slate-100 sm:grid space-y-4 flex flex-col sm:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Interior Features:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className='md:w-[50%] w-[90%] justify-between flex flex-cols sm:justify-around gap-y-4'>
                                    <label className='my-6'>Appliances Included:</label>
                                    {/* <input onChange={(e)=>onValueChange(e)} type="text" className='absolute right-0 border-2 border-black' /> */}
                                    <span className='mx-2 '>
                                        <input onChange={(e) => onValueChange(e)} type="checkbox" name="e1" value="Washer" /> Washer<br />
                                        <input onChange={(e) => onValueChange(e)} type="checkbox" name="e1" value="Dryer" /> Dryer<br />
                                        <input onChange={(e) => onValueChange(e)} type="checkbox" name="e1" value="Refrigerator" /> Refrigerator<br />
                                        <input onChange={(e) => onValueChange(e)} type="checkbox" name="e1" value="Dishwasher" /> Dishwasher<br />
                                        <input onChange={(e) => onValueChange(e)} type="checkbox" name="e1" value="Stove" /> Stove<br />
                                        <input onChange={(e) => onValueChange(e)} type="checkbox" name="e1" value="Heating" /> Heating<br />
                                        <input onChange={(e) => onValueChange(e)} type="checkbox" name="e1" value="Cooling" /> Cooling
                                    </span>
                                </div>

                                <div className='md:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <div className=' md:mx-52 md:mt-[13%]'>
                                        <button onClick={() => handleAdd('e4')} className=' w-[150px] text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >
                                            Add Appliances
                                        </button>
                                    </div>
                                    <div className='relative'>
                                        <span>
                                            {userData.e4 && userData.e4.map((data, i) =>
                                                <span className='flex mb-8 ml-[5%] md:ml-[8%]' key={i}>
                                                    <input
                                                        value={data}
                                                        onChange={(e) => handleChange(e, i, 'e4')}
                                                        className='rounded  mx-2 border-2 border-slate-400'
                                                    />

                                                    <button
                                                        onClick={() => handleDelete(i, 'e4')}
                                                        className='rounded md:mx-2 mb-6 '
                                                    >
                                                        <span class="material-symbols-outlined text-red-500 font-bold absolute ">
                                                            delete
                                                        </span>
                                                    </button>
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className='sm:w-[50%] w-[80%] flex flex-wrap justify-between sm:justify-around gap-y-4'>
                                    <label className='my-4'>Utilities:</label>
                                    <span >
                                        <input onChange={(e) => onValueChange(e)} name="e2" value="Electricity" type="checkbox" ng-checked="al" /> Electricity<br />
                                        <input onChange={(e) => onValueChange(e)} name="e2" value="Water" type="checkbox" ng-checked="al" /> Water<br />
                                        <input onChange={(e) => onValueChange(e)} name="e2" value="Sewer" type="checkbox" ng-checked="al" /> Sewer<br />
                                    </span>
                                </div>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <div className='m-auto md:mx-52'>
                                        <button onClick={() => handleAdd('e3')} className='w-[150px] text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >
                                            Add Utilities
                                        </button>
                                    </div>
                                    <div className='relative'>
                                        <span>
                                            {userData.e3 && userData.e3.map((data, i) =>
                                                <span className='flex mb-8 ml-[5%] md:ml-[8%]' key={i}>
                                                    <input
                                                        value={data}
                                                        onChange={(e) => handleChange(e, i, 'e3')}
                                                        className='rounded mx-2 border-2 border-slate-400'
                                                    />

                                                    <button
                                                        onClick={() => handleDelete(i, 'e3')}
                                                        className='rounded mx-2 mb-6 '
                                                    >
                                                        <span class="material-symbols-outlined text-red-500 font-bold absolute ">
                                                            delete
                                                        </span>
                                                    </button>
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* ---------------------------------------NeighbourHood Features----------------------- */}
                    <div className='hover:bg-slate-100 md:grid space-y-4 flex flex-col md:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Neighbourhood Features:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className='md:w-[50%] sm:w-[80%] w-[95%]  flex flex-wrap sm:justify-between gap-y-2'>
                                    <label >School:</label>
                                    <input onChange={(e) => onValueChange(e)} name="f1" value={f1} type="text" className='mx-2 w-[140px] sm:w-[180px] border-2 border-slate-400' placeholder='School' />
                                    <input onChange={(e) => onValueChange(e)} name="f11" value={f11} type="Number" className='mx-2 border-2 border-slate-400 ml-2 w-[30px] sm:w-[60px]' placeholder='KM' />
                                </div>
                                <div className='md:w-[50%] sm:w-[80%] w-[95%] flex flex-wrap sm:justify-between gap-y-2'>
                                    <label >Market:</label>
                                    <input onChange={(e) => onValueChange(e)} name="f2" value={f2} type="text" className='mx-2 w-[140px] sm:w-[180px] border-2 border-slate-400' placeholder='Market' />
                                    <input onChange={(e) => onValueChange(e)} name="f22" value={f22} type="Number" className='mx-2 border-2 border-slate-400 ml-2 w-[30px] sm:w-[60px]' placeholder='KM' />
                                </div>
                                <div className='md:w-[50%] sm:w-[80%] w-[95%] flex flex-wrap sm:justify-between gap-y-2'>
                                    <label >Community:</label>
                                    <input onChange={(e) => onValueChange(e)} name="f3" value={f3} type="text" className='mx-2 w-[120px] sm:w-[180px] border-2 border-slate-400  md:w-[160px] ' placeholder='Community' />
                                    <input onChange={(e) => onValueChange(e)} name="f33" value={f33} type="Number" className=' border-2 border-slate-400 ml-2 w-[30px] sm:w-[60px]' placeholder='KM' />
                                </div>
                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-2'>
                                    <label >Pets allowed:</label>
                                    <span className='mx-2 '>
                                        <input onChange={(e) => onValueChange(e)} name="f4" value="Yes" type="radio" className='mx-1' /> Yes
                                        <input onChange={(e) => onValueChange(e)} name="f4" value="No" type="radio" className='mx-1' /> No
                                    </span>
                                </div>
                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-2'>
                                    <label >Rentals:</label>
                                    <span className='mx-2'>
                                        <input onChange={(e) => onValueChange(e)} name="f5" value="Allowed" type="radio" className='mx-1' /> allowed
                                        <input onChange={(e) => onValueChange(e)} name="f5" value="Not allowed" type="radio" className='mx-1' /> Not allowed
                                    </span>
                                </div>



                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label>Status:</label>
                                    <select name="c2" onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className='mx-2 border-2 border-slate-400' id="dog-names">
                                        <option > </option>
                                        <option value="Rent">Rent</option>
                                        <option value="Sold">Sold</option>
                                        <option value="Occupied">Occupied</option>
                                    </select>
                                </div>

                                <div className='sm:w-[50%] sm:ml-[15%] ml-[17%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label>Status:</label>
                                    <select name='c3' onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} className='mx-2 border-2 border-slate-400' id="dog-names">
                                        <option > </option>
                                        <option value="Sold">Sold</option>
                                        <option value="Occupied">Occupied</option>
                                    </select>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------------------------------------Upload Site Image--------------- */}
                    <div className='hover:bg-slate-100 sm:grid space-y-4 flex flex-col sm:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Upload Site Immages:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label className=''>Upload:</label>

                                    <input type="file" className='mx-2 b' multiple onChange={(e) => setImageChange(e.target.files)} />
                                    <div className='flex  gap-x-1.5 m-3  border-2 border-slate-200'>

                                        {
                                            links && links.length > 0 && links.map(link => {
                                                return (
                                                    <div key={link?.publicId} className="">
                                                        <img width={100} height={200} src={link?.url} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button onClick={(e) => { handleImageSubmit(e) }} className="h-[35px] p-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Upload</button>
                                    
                                    <textarea name="h2" value={h2} onChange={(e) => onValueChange(e)} cols="30" rows="1" placeholder='Enter your Message.....' className='mx-2 border-2 border-slate-400'></textarea>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* -----------------------------------Location of Project---------------------------- */}

                    <div className='hover:bg-slate-100 md:grid md:mt-4 space-y-4 flex flex-col md:grid-cols-3 gap-4 content-normal '>
                        <h1 className='text-large m-auto sm:text-2xl align-start font-medium'>Location Of Project:</h1>

                        <div className=' col-start-2 col-end-4'>
                            <div className='flex m-4 flex-wrap gap-y-8 gap-x-4 md:gap-x-0 justify-around'>

                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label className='mr-2'>Latitude:</label>
                                    <input name="g1" value={g1} type="number" onChange={(e) => { onValueChange(e); setLatitude(e.target.value) }} className='mx-2 border-2 border-slate-400' />
                                </div>
                                <div className='sm:w-[50%] flex flex-wrap sm:justify-around gap-y-4'>
                                    <label className='mr-2'>Longitude:</label>
                                    <input onChange={(e) => { onValueChange(e); setLongitude(e.target.value) }} name="g2" value={g2} type="number" className='mx-2 border-2 border-slate-400' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gmap sector */}
                    <GoogleMap1 isLoaded={isLoaded} lat={Latitude} lng={Longitude}  />


                    <button onClick={(e) => handleSubmit(e)} className='w-[200px] m-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Submit</button>
                </div>
            </div>
        </>
    )
}

export default FormC
