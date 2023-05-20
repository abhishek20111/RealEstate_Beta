import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminMontior() {
    const [expandedRow, setExpandedRow] = useState(-1);
    const [filterDropDown, setFilterDropDown] = useState(false);
    const [order, setOrder] = useState("");
    const [filter, setFilter] = useState(0);
    const [selectIndex, setSelectIndex] = useState(0);

    const [data, setdata] = useState([]);
    const navigate = useNavigate()

    const USER_TYPE = {
        PUBLIC: 'Public User',
        USER: 'User',
        ADMIN: 'Admin',
        SUPER_ADMIN: 'Super Admin',
    }

    const CURRENT_USER_TYPE = JSON.parse(localStorage.getItem("role"));

    const [usableData, setUsableData] = useState([]);
    console.log("usableData "+usableData);

    //function that get data all user , name, email, role
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token").replace(/"/g, "");

            const response = await axios.get('http://localhost:5000/getDataAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setdata(response.data)
            setUsableData(response.data)
            console.log("Data in Data state:", response.data);
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    useEffect(() => { //it get all data whenever it render page
        fetchData();
    }, []);

    

    const handleRowClick = (e, id, email) => {
        e.preventDefault();
        navigate('/monitor', { state: { id: id, email: email } })
    }


   


    const types = ["Mixed", "Admin", "User"];
    const handleFilter = (x) => {
        const keyword = types[x];
        if (keyword === "Mixed") {
            searchItems("");
        } else {
            searchItems(keyword);
        }
        console.log(keyword);
    };

    const handleSearch = () => {
        const searchInput = document.getElementById("searchInput");
        console.log("enter");
        searchItems(searchInput.value);
    };
    function searchItems(keyword) {
        console.log("searching", keyword);
        if (keyword.length == 0) {
            keyword = "@";
        }

        const results = [];

        for (let i = 0; i < data.length; i++) {
            if (CURRENT_USER_TYPE === USER_TYPE.ADMIN
                && data[i].role === "User") {
                const checkData = [data[i].name, data[i].email, data[i].role];
                const values = Object.values(checkData);

                for (let j = 0; j < checkData.length; j++) {
                    if (
                        values[j].toString().toLowerCase().includes(keyword.toLowerCase())

                    ) {
                        results.push(data[i]);
                        break;
                    }
                }
            }
            else {
                const checkData = [data[i].name, data[i].email, data[i].role];
                const values = Object.values(checkData);

                for (let j = 0; j < checkData.length; j++) {
                    if (
                        values[j].toString().toLowerCase().includes(keyword.toLowerCase())

                    ) {
                        results.push(data[i]);
                        break;
                    }
                }
            }
        }
        setUsableData(results);
    }

    ///this function change the role from user to admin
    const makeAdmin = async (email) => {
        try {
            const token = localStorage.getItem("token").replace(/"/g, "");

            const response = await axios.put('http://localhost:5000/changeUserRole', {UserEmail: email} ,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Data in Data state:", response.data);
            fetchData();
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    return (
        <div className="flex justify-center ">
            <div className="w-11/12 my-8 flex justify-center">
                <div className="w-11/12 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex justify ">
                        <div className="">
                            <div className="border-gray-300 border ml-1 mx-1 pl-4 pr-3 mb-4 rounded-md ">
                                {(CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN) ? <div
                                    className="flex items-center justify-center cursor-pointer select-none pt-1 pb-2 w-[60px]"
                                    onClick={() => {
                                        setFilter((filter + 1) % 3);
                                        handleFilter((filter + 1) % 3);
                                    }}
                                >
                                    <p className="font-medium">{types[filter % 3]}</p>
                                </div> : <div
                                    className="flex items-center justify-center cursor-pointer select-none pt-1 pb-2 w-[60px]"
                                >
                                    <p className="font-medium">Users</p>
                                </div>}
                            </div>

                        </div>
                        <div className="flex items-center justify-between pb-4 bg-white ">
                            <label for="table-search" className="sr-only">
                                Search
                            </label>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch();
                                }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-500 "
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="searchInput"
                                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500   "
                                        placeholder="Search for users"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="p-4">
                                    PIC
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">Role</th>

                                <th scope="col" className="px-6 py-3 flex justify-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usableData.map((row, index) => (
                                <React.Fragment key={index}>

                                    {/* -----------------------admin panel------------------ */}
                                    {(row.role === USER_TYPE.USER && CURRENT_USER_TYPE === USER_TYPE.ADMIN) ?<tr className="bg-white border-b  hover:bg-gray-50 ">
                                        <td className="w-4 p-4">
                                            <div className="flex justify-normal">
                                                {/* <img
                                                    className="w-10 h-10 rounded-full"
                                                    src="/docs/images/people/profile-picture-1.jpg"
                                                    alt="Jese image"
                                                /> */}
                                                <span class="material-symbols-outlined">person</span>
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                                        >
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{row.name}</div>
                                                <div className="font-normal text-gray-500">{row.email}</div>
                                            </div>
                                        </th>

                                        <td className="px-6 py-4 ">{row.role}</td>

                                        <td className="py-4 flex justify-center">
                                            {row.role === "User" ? (
                                                <div className="flex">
                                                    <button
                                                        className="flex bg-blue-500 text-white mx-2 py-2 rounded-md px-2"
                                                        onClick={(e) => {
                                                            setSelectIndex(index);
                                                            handleRowClick(e, index, row.email);
                                                            console.log("Cicked");
                                                        }}
                                                    >
                                                        View Details
                                                    </button>
                                                   
                                                </div>
                                            ) : (
                                                <div className="mx-3">
                                                    <p>Unavailable</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>:null}



                                    {/* -----------------super user admin panel-------------- */}
                                    {(CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN && row.role !== USER_TYPE.SUPER_ADMIN) ?<tr className="bg-white border-b  hover:bg-gray-50 ">
                                        <td className="w-4 p-4">
                                            <div className="flex justify-normal">
                                                {/* <img
                                                    className="w-10 h-10 rounded-full"
                                                    src="/docs/images/people/profile-picture-1.jpg"
                                                    alt="Jese image"
                                                /> */}
                                                <span class="material-symbols-outlined">person</span>
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                                        >
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{row.name}</div>
                                                <div className="font-normal text-gray-500">{row.email}</div>
                                            </div>
                                        </th>

                                        <td className="px-6 py-4 ">{row.role}</td>

                                        <td className="py-4 flex justify-center">
                                            {row.role === "User" ? (
                                                <div className="flex">
                                                    <button
                                                        className="flex bg-blue-500 text-white mx-2 py-2 rounded-md px-2"
                                                        onClick={(e) => {
                                                            setSelectIndex(index);
                                                            handleRowClick(e, index, row.email);
                                                            console.log("Cicked");
                                                        }}
                                                    >
                                                        View Details
                                                    </button>
                                                    {(CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN)?<button
                                                        className="text-blue-600 font-medium items-center border-2 py-2 rounded-md px-2 hover:text-white hover:bg-blue-500"
                                                        onClick={() => { makeAdmin(row.email) }}
                                                    >
                                                        Switch Roles
                                                    </button>:null}
                                                </div>
                                            ) : (
                                                <div className="mx-3">
                                                    <p>Unavailable</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>:null}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {/* {expandedRow === selectIndex && (
            //   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-full">HELLO MOTOT</tr>
            <div id="Modal" className="">
              <button
                className="absolute top-1 right-1 text-white hover:text-gray-700 z-20"
                onClick={() => handleRowClick(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <UserPopup data={data[selectIndex].Collection} />
            </div>
          )} */}
                </div>
            </div>
        </div>
    );
}

export default AdminMontior;


