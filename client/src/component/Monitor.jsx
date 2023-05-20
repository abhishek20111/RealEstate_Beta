import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Monitor() {
  
  const [data, setData] = useState([]);
  const location = useLocation();
  const emailFromProps = location.state && location.state.email; // Get email from props
  const token = localStorage.getItem('token');
  const { email: emailFromToken } = token ? jwt_decode(token) : {}; // Get email from token

  const email = emailFromProps || emailFromToken; // Use email from props if available, otherwise use email from token
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(email);
        const response = await axios.post('http://localhost:5000/getData', { email });
        setData(response.data.Collection);
        console.log("response "+JSON.stringify(response.data.Collection));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email]);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setSelectedIndex(index);
  };
  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };
  let index = 1;

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  

  return (
    <div className="flex items-center mx-3 justify-center bg-opacity-50  overflow-auto">
      <div className="bg-white  p-4 rounded-lg overflow-auto">
        {/* Display user details here */}

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="table-auto w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" class="p-4">
                  Index
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Unit No.
                </th>
                <th scope="col" class="px-6 py-3">
                  City
                </th>
                <th scope="col" class="px-6 py-3">
                  ZipCode
                </th>
                <th scope="col" class="px-6 py-3">
                  State
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Builder Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Builder Age
                </th>
                <th scope="col" class="px-6 py-3">
                  Area
                </th>
                <th scope="col" class="px-6 py-3">
                  Parking
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Bedroom
                </th>
                <th scope="col" class="px-6 py-3">
                  Bedroom Count
                </th>
                <th scope="col" class="px-6 py-3">
                  Included Appliances
                </th>
                <th scope="col" class="px-6 py-3">
                  Utilities
                </th>
                <th scope="col" class="px-6 py-3">
                  Parking
                </th>
                <th scope="col" class="px-6 py-3">
                  School
                </th>
                <th scope="col" class="px-6 py-3">
                  Market
                </th>
                <th scope="col" class="px-6 py-3">
                  Community
                </th>
                <th scope="col" class="px-6 py-3">
                  Pets Allowed
                </th>
                <th scope="col" class="px-6 py-3">
                  Rentals
                </th>
                <th scope="col" class="px-6 py-3">
                  Longitude
                </th>
                <th scope="col" class="px-6 py-3">
                  Latitude
                </th>
                <th scope="col" class="px-6 py-3">
                  Images
                </th>
                <th scope="col" class="px-6 py-3">
                  Message
                </th>
                {/* <th scope="col" class="px-6 py-3">
                  Created At
                </th>
                <th scope="col" class="px-6 py-3">
                  Updated At
                </th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((row,index) => (
                <React.Fragment key={index}>
                  <tr class="border-b border-gray-200 ">
                    <td class="px-6 py-4 bg-gray-50 ">
                      {index}
                    </td>
                    <td class="px-6 py-4">{row.Address}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Unit_No}
                    </td>
                    <td class="px-6 py-4">{row.City}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Zip_Code}
                    </td>
                    <td class="px-6 py-4">{row.State}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.property_Description}
                    </td>
                    <td class="px-6 py-4">{row.Builder_Type}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Age_of_Builder}
                    </td>
                    <td class="px-6 py-4">{row.Square_Footage}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Parking_Type}
                    </td>
                    <td class="px-6 py-4">{row.Title}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {new Date(row.Date).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4">{row.Status}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Bedroom}
                    </td>
                    <td class="px-6 py-4 ">{row.Bedrooms}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Appliance_Include.map((objects)=>(
                        <ul>
                          <li>{objects}</li>
                        </ul>
                      ))}
                    </td>
                    <td class="px-6 py-4 ">{row.Utilies.map((objects) => (
                      <ul>
                        <li>{objects}</li>
                      </ul>
                    ))}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Parking}
                    </td>
                    <td class="px-6 py-4 ">{row.School}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Market}
                    </td>
                    <td class="px-6 py-4 ">{row.Community}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Pets_alloed}
                    </td>
                    <td class="px-6 py-4 ">{row.Rentals}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Latitude}
                    </td>
                    <td class="px-6 py-4 ">{row.Longitude}</td>
                    <td class="px-6 py-4 bg-gray-50 ">
                      {row.Image_url.length > 0 && (
                        <img
                          src={row.Image_url[0].url}
                          alt={`Image ${index}`}
                          className="cursor-pointer"
                          onClick={() => {
                            handleImageClick(index);
                            setSelectedIndex(index);
                          }}
                        />
                      )}
                    </td>
                    <td class="px-6 py-4 ">{row.Message}</td>
                    {/* <td class="px-6 py-4 bg-gray-50 ">
                      {row.createdAt}
                    </td>
                    <td class="px-6 py-4 ">{row.updatedAt}</td> */}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {selectedImageIndex !== null && (
            
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <Modal
                images={data[selectedIndex].Image_url}
                // selectedIndex={0}
                onClose={handleCloseModal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Modal = ({ images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      images.length > 0 && (prevIndex > 0 ? prevIndex - 1 : images.length - 1)
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
    images.length > 0 && (prevIndex < images.length - 1 ? prevIndex + 1 : 0)
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      <div className="relative">
        {/* Render the current image */}
        <img className="max-h-screen" src={images.length > 0 && images[currentImageIndex].url} alt="" />
        {/* Render navigation arrows */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          onClick={handlePrevious}
        >
          {/* Previous arrow */}
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
          onClick={handleNext}
        >
          {/* Next arrow */}
          &gt;
        </button>
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
          onClick={onClose}
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
      </div>
    </div>
  );
};
export default Monitor;
