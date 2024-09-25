import { NextResponse } from 'next/server';

const SMS_API_URL = 'http://bulksmsbd.net/api/smsapi';
const API_KEY = 'QeMImRawwemoXYzvbFIH'; // Replace with your actual API key
const SENDER_ID = '8809604902359'; // Replace with your actual sender ID

async function sendSMS(number, message) {
  const response = await fetch(SMS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: API_KEY,
      senderid: SENDER_ID,
      number: number,
      message: message,
    }),
  });

  if (!response.ok) {
    throw new Error(`SMS API error: ${response.status}`);
  }

  return await response.json();
}

export async function POST(request) {
  try {
    const { phone, message } = await request.json();
    console.log('Received form submission:', { phone, message });

    // Send SMS using the API
    const smsResponse = await sendSMS(phone, message);
    console.log('SMS API response:', smsResponse);

    return NextResponse.json({ apiResponse: smsResponse }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}