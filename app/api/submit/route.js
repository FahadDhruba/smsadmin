import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, email, message } = await request.json();
  console.log('Received form submission:', { name, email, message });
  
  // Here you would typically save the data to a database or send an email
  
  return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
}