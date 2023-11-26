import { NextResponse } from "next/server";

import axios from 'axios';

export async function GET(req: Request, res: Response) {
    try {
        
        const body = await req.json();
        const response = await axios({
            method: 'get',
            url: 'https://external-api.com/data',
            headers: {
              'Authorization': `Bearer ${process.env.YOUR_SECRET_API_KEY}`,
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