import prisma from '@/lib/prisma';
import {stripe} from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

async function handler(request: NextRequest) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature') || '' ;

    if (!sig) {
        return new NextResponse("No signature", {status: 400});
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error) {
        return new NextResponse(`Webhook Error: ${error}`, {status: 400});
    }

    switch(event.type) {
        case 'payment_intent.created':
            const payment_intent = event.data.object as Stripe.PaymentIntent;
            break;
        case 'charge.succeeded':
            const charge = event.data.object as Stripe.Charge;
            if (typeof charge.payment_intent === 'string') {
                const order = await prisma.order.update({
                    where: {paymentIntentID: charge.payment_intent},
                    data: {status: 'complete'},
                })
            }
        break;
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    
}


export const GET = handler;
export const POST = handler;
export const PUT = handler;