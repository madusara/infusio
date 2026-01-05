/**
 * POST /api/orders
 * 
 * Create a new order and save it to the database.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for order creation
const createOrderSchema = z.object({
  userEmail: z.string().email('Invalid email'),
  items: z.array(
    z.object({
      id: z.string(),
      variant: z.object({
        size: z.string(),
        price: z.number(),
      }),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'At least one item is required'),
  notes: z.string().optional(), // Optional customer notes
  address: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone1: z.string().min(1, 'Phone is required'),
    phone2: z.string().optional().default(''),
    addressLine1: z.string().min(1, 'Address is required'),
    addressLine2: z.string().optional().default(''),
    district: z.string().min(1, 'District is required'),
  }),
  paymentMethod: z.enum(['cod', 'card', 'bank_transfer']).default('cod'),
  totalAmount: z.number().positive('Total amount must be positive'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userEmail: validatedData.userEmail,
        items: validatedData.items, // Prisma will handle JSON serialization
        notes: validatedData.notes, // Optional notes field
        address: validatedData.address,
        paymentMethod: validatedData.paymentMethod,
        totalAmount: validatedData.totalAmount,
        status: 'pending',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

