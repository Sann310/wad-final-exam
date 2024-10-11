import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET() {
    await dbConnect();
    try {
        const customers = await Customer.find({});
        return new Response(JSON.stringify(customers), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch customers" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function POST(request) {
    await dbConnect();
    const body = await request.json();
    try {
        const customer = new Customer(body);
        await customer.save();
        return new Response(JSON.stringify(customer), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to create customer" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
}