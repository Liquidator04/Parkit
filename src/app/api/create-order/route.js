import { NextResponse } from "next/server";
import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    
    const { hours } = await req.json();

   
    const RATE_PER_HOUR = 10;
    const amount = hours * RATE_PER_HOUR * 100; // Convert to paise

    // Create order with Razorpay
    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    // Log the error and return an error response
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}
