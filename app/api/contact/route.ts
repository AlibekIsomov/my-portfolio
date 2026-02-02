import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const POST = async (request: Request) => {
    try {
        const body = await request.json().catch(() => ({}));
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Save to Database
        const savedMessage = await prisma.message.create({
            data: {
                name,
                email,
                message,
            },
        });

        // 2. Send to Telegram (if configured)
        if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
            const text = `📬 *New Contact Form Submission*\n\n` +
                `👤 *Name:* ${name}\n` +
                `📧 *Email:* ${email}\n` +
                `📝 *Message:*\n${message}`;

            try {
                await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: text,
                        parse_mode: 'Markdown',
                    }),
                });
            } catch (tgError) {
                console.error('Failed to send Telegram message:', tgError);
                // We do NOT fail the request if Telegram fails, as DB save was successful
            }
        } else {
            console.warn('Telegram credentials not found, skipping notification.');
        }

        return NextResponse.json({ success: true, message: savedMessage });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
