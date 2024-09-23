import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import html2pdf from "html2pdf.js";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  // Create a new Date object
  var currentDate = new Date();

  // Get the current date
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // Months are zero indexed
  var year = currentDate.getFullYear();

  // Get the current time
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  // Format the date and time
  var formattedDate = year + "-" + month + "-" + day;
  var formattedTime = hours + ":" + minutes + ":" + seconds;

  // Fetch orders from the API
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Function to download receipt
  const handleDownloadReceipt = (orderId) => {
    // Get the order details by orderId
    const order = orders.find((o) => o._id === orderId);
    const totalPrice = order.products.reduce((total, p) => total + p.price, 0);
    // Create HTML content for the order details
    const htmlContent = `
       <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Order Details</title>
       <style>
         /* Add your custom styles for printing here */
         body {
           margin: 0;
           padding: 20px; /* Adjust the padding as needed */
           display: flex;
           justify-content: center;
           align-items: flex-start;
           min-height: 100vh;
           flex-direction: column; /* Make body flex column layout */
           position: relative; /* Needed for footer positioning */
         }
         .container {
           max-width: 800px;
           width: 100%;
           padding: 40px; /* Add left padding to the list */
           flex: 1; /* Allow container to grow, pushing footer to the bottom */
         }
         h1 {
           text-align: center;
           font-size: 28px;
           font-weight: bold;
           margin-bottom: 20px;
           border-bottom: 1px solid #ddd;
           padding-bottom: 15px; /* Add padding to h1 */
         }
         .details {
           display: flex;
           border: 1px solid #ddd;
           padding: 8px;
           justify-content: space-between;
           margin-bottom: 20px;
         }
         .details-box {
           width: 48%; /* Adjust width as needed */
         }
         .details-box:last-child {
           border-left: 1px solid #ddd;
           padding-left: 20px;
         }
         p {
           font-size: 14px;
           font-weight: normal;
         }
         table {
           width: 100%;
           border-collapse: collapse;
           margin: 20px 0;
         }
         th,
         td {
           font-size: 14px;
           font-weight: normal;
           border: 1px solid #ddd;
           padding: 8px;
           text-align: left;
         }
         th {
           background-color: #f2f2f2;
         }
         .footer {
           width: 100%;
           margin-top: 100px;
           padding: 20px; /* Add padding as needed */
           text-align: center;
         }
         .thank-you {
           text-align: center;
           font-style: italic;
           color: #000000;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <h1>Order Details</h1>
         <div class="details">
           <div class="details-box">
             <p><strong>Bill From:</strong></p>
             <p><strong>Name:</strong> agrocart</p>
             <p><strong>Address:</strong> Gorakhpr, Utter Pradesh, 273004</p>
             <p><strong>Contact:</strong> +91 6386144016</p>
             <p><strong>Email:</strong> agrocart@agrocart.com</p>
           </div>
           <div class="details-box">
             <p><strong>Bill To:</strong></p>
             <p><strong>Name:</strong> ${auth?.user?.name}</p>
             <p><strong>Address:</strong> ${auth?.user?.address}</p>
             <p><strong>Contact:</strong> ${auth?.user?.phone}</p>
             <p><strong>Email:</strong> ${auth?.user?.email}</p>
           </div>
         </div>
         <p><strong>Order ID:</strong> ${order._id}</p>
         <p><strong>Status:</strong> ${order.status}</p>
         <p>
           <strong>Date:</strong> ${moment(order.createdAt).format(
             "DD/MM/YYYY"
           )}
         </p>
         <table>
           <thead>
             <tr>
               <th>Serial No.</th>
               <th>Name</th>
               <th>Price</th>
             </tr>
           </thead>
           <tbody>
             ${order.products
               .map(
                 (p, index) => `
             <tr>
               <td>${index + 1}</td>
               <td>${p.name}</td>
               <td>₹${p.price}</td>
             </tr>
             `
               )
               .join("")}
           </tbody>
         </table>
         <p><strong>Total items:</strong> ${order.products.length}</p>
         <p><strong>Total Price:</strong> ₹${totalPrice}</p>
         <p>
           <strong>Payment:</strong> ${
             order.payment.success ? "Success" : "Failed"
           }
         </p>
       </div>
       <footer class="footer">
         <p class="thank-you"><strong>Thank you for your order!</strong></p>
         <p>
           Date: ${formattedDate} Time: ${formattedTime} © agrocart | Inc. All
           rights reserved.
         </p>
       </footer>
     </body>
   </html>
   `;
    html2pdf().from(htmlContent).save(`Order_${order._id}.pdf`);
  };

  return (
    <div className="w-full flex flex-col space-y-4 pt-5">
      {orders?.map((order) => (
        <div key={order._id} className="border rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
            <button
              onClick={() => handleDownloadReceipt(order._id)}
              className="text-red-600 hover:text-red-500"
            >
              Download Receipt
            </button>
          </div>
          <p className="text-gray-600">
            {moment(order.createdAt).format("DD/MM/YYYY")} · {order.status}
          </p>
          <div className="space-y-2">
            {order.products.map((product, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-gray-600">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">
              Total Price: ₹
              {order.products.reduce((total, p) => total + p.price, 0)}
            </p>
            <p className="text-sm text-gray-600">
              Total items: {order.products.length}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
