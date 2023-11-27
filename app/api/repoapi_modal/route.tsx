import { NextResponse } from "next/server";

import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received: ")
        console.log(body)
        const response = await axios({
            method: 'get',
            url: '',
            headers: {
              'Authorization': `Bearer ${process.env.REPOAPI_MODAL_KEY}`,
              'Content-Type': 'application/json',
            },
            data: body,
        });
      
        return NextResponse.json(response.data);
    } catch(err) {
        console.log("REPOAPI_MODAL API CALL ERROR");
        console.log(err);
        return NextResponse.json({error: 'My Internal Server Error'}, {status: 500})
    }
}