import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db'; 

export async function GET() {
  try {
    await connectDB();
    
    // Check the current mongoose connection state
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      return NextResponse.json(
        { message: 'Database connected successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Database connection is not ready', readyState: mongoose.connection.readyState },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { message: 'Failed to connect to the database', error: String(error) },
      { status: 500 }
    );
  }
}

