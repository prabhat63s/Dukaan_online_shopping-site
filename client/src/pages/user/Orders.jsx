import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import html2pdf from "html2pdf.js";


export default function Orders() {
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

  const handleDownloadReceipt = (orderId) => {
    // Get the order details by orderId
    const order = orders.find((o) => o._id === orderId);

    // Calculate total price for the order
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
        <strong>Date:</strong> ${moment(order.createdAt).format("DD/MM/YYYY")}
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

    // Convert HTML content to PDF
    html2pdf().from(htmlContent).save(`Order_${order._id}.pdf`);
  };

  return (
    <Layout>
      <div className="lg:w-[85%] min-h-screen p-4 lg:p-0  mx-auto flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-1/4 w-full ">
          <div className="flex flex-col bg-white lg:border rounded-md gap-4 lg:p-4 lg:px-6">
            <UserMenu />
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="w-full  mt-4 lg:mt-0 lg:border lg:p-4 rounded-md">
            <h1 className="font-semibold text-xl border-b pb-2">My orders</h1>
            <div className="w-full flex flex-col space-y-2">
              <div className=" overflow-x-auto ">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total items
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((o) => {
                      // Calculate total price for the order
                      const totalPrice = o.products.reduce(
                        (total, p) => total + p.price,
                        0
                      );

                      return (
                        <tr
                          key={o._id}
                          onClick={() => handleDownloadReceipt(o._id)}
                          className="bg-white text-black cursor-pointer border-b divide-y hover:bg-gray-50"
                        >
                          <td
                            className={`flex ${
                              o.products.length > 1
                                ? "flex-col"
                                : "justify-between"
                            }`}
                            colSpan="2"
                          >
                            {o.products.map((p) => (
                              <React.Fragment key={p._id}>
                                <div className="flex items-center px-4 py-2 font-medium whitespace-nowrap">
                                  <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    alt={p._id}
                                    className="w-auto h-8 mr-3 rounded-md"
                                  />
                                  <p className="w-80 truncate">{p.name}</p>
                                </div>
                              </React.Fragment>
                            ))}
                          </td>
                          {/* Total price column */}
                          <td className="px-6 py-4">₹{totalPrice}</td>{" "}
                          <td className="px-6 py-4">{o.status}</td>
                          <td className="px-6 py-4">
                            {moment(o.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="px-6 py-4">{o.products.length}</td>
                          <td className="px-6 py-4">
                            {o.payment.success ? "Success" : "Failed"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
