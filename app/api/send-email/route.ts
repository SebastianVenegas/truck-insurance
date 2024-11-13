import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);
    console.log('Environment variables:', {
      user: process.env.EMAIL_USER,
      passLength: process.env.EMAIL_PASS?.length || 0
    });

    const { fullName, email, phone, coverageType } = body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'venegassebastian0619@gmail.com',
      subject: 'New Trucking Insurance Quote Request',
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Coverage Type:</strong> ${coverageType}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);

    return new NextResponse(JSON.stringify({ 
      success: true, 
      message: 'Email sent successfully' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: {
        user: process.env.EMAIL_USER ? 'present' : 'missing',
        pass: process.env.EMAIL_PASS ? 'present' : 'missing'
      }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}