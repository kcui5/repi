import { NextResponse } from "next/server";

import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000',
            headers: {
              'Authorization': `Bearer ${process.env.REPOAPI_MODAL_KEY}`,
              'Content-Type': 'application/json',
            },
            data: body,
        });

        return NextResponse.json(response.data);
    } catch(err) {
        console.log("REPOAPI_MODAL API CALL ERROR");
        return NextResponse.json({data: 'Internal Server Error'}, {status: 500})
    }
}