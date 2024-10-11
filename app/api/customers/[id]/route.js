import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET(request, { params }) {
    await dbConnect();
    const { id } = params;
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify(customer), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch customer" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    const { id } = params;
    const body = await request.json();
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });
        if (!updatedCustomer) {
            return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify(updatedCustomer), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update customer" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = params;
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete customer" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}