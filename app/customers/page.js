"use client";

import { useState, useEffect } from 'react';

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
    const [editingId, setEditingId] = useState(null); // Track ID for editing
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    // Fetch all customers
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setIsLoading(true);
        const response = await fetch('/api/customers');
        const data = await response.json();
        setCustomers(data);
        setIsLoading(false);
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add or Update customer
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/customers/${editingId}` : '/api/customers';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
        setEditingId(null);
        fetchCustomers();
    };

    // Delete a customer
    const handleDelete = async (id) => {
        await fetch(`/api/customers/${id}`, { method: 'DELETE' });
        fetchCustomers();
    };

    // Set form data for editing
    const handleEdit = (customer) => {
        setFormData({
            name: customer.name,
            dateOfBirth: customer.dateOfBirth,
            memberNumber: customer.memberNumber,
            interests: customer.interests,
        });
        setEditingId(customer._id);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Customer Management</h1>

            {/* Add/Edit Customer Form */}
            <h2 style={{ color: '#555' }}>{editingId ? 'Edit Customer' : 'Add New Customer'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="number"
                    name="memberNumber"
                    placeholder="Member Number"
                    value={formData.memberNumber}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    name="interests"
                    placeholder="Interests (e.g., movies, football)"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                    {editingId ? 'Update Customer' : 'Add Customer'}
                </button>
            </form>

            {/* List All Customers */}
            <h2 style={{ color: '#555' }}>All Customers</h2>
            {isLoading ? (
                <p>Loading customers...</p>
            ) : customers.length === 0 ? (
                <p>No customers found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date of Birth</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Member Number</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Interests</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer._id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{customer.name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{customer.dateOfBirth}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{customer.memberNumber}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{customer.interests}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button onClick={() => handleEdit(customer)} style={{ marginRight: '5px', backgroundColor: '#ffc107', border: 'none', padding: '5px', color: '#fff', cursor: 'pointer', borderRadius: '3px' }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(customer._id)} style={{ backgroundColor: '#dc3545', border: 'none', padding: '5px', color: '#fff', cursor: 'pointer', borderRadius: '3px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}