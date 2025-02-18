import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function OrdersPage(){
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
        });
    },[]);

    return (
        <Layout>
            <h1>Orders</h1>
             <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>Products</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((order,index) => (
                        <tr key={order.id || index}>
                            <td>{(new Date (order.createdAt)).toLocaleString()}</td>
                            <td>
                                {order.name} {order.email} <br/>
                                {order.address} <br/>
                                {order.city} {order.postalCode} {order.country}
                            </td>
                            <td>
                                {order.line_items.map((l, lineIndex) => (
                                    <div key={l.id || lineIndex}>
                                        {l.price_data?.product_data.name} x {l.quantity} <br/>
                                    </div>
                                ))}
                            </td>
                            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                                {order.paid ? 'Yes' : 'No'}
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </Layout>
    );
}
