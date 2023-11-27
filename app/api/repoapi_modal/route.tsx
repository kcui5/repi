import { NextResponse } from "next/server";

import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = axios({
            method: 'get',
            url: 'http://127.0.0.1:5000',
            headers: {
              'Authorization': `Bearer ${process.env.REPOAPI_MODAL_KEY}`,
              'Content-Type': 'application/json',
            },
            data: body,
        });
        const apis = [body['apis']]
        let api_urls = apis.map(s => s.split('.').join('-'));
        api_urls = api_urls.map(s => s.split('_').join('-'));
        api_urls = api_urls.map(s => s.toLowerCase());
        const api_links = api_urls.map(s => `https://kcui5--repo-apis-py-${s}-dev.modal.run`);
        return NextResponse.json(api_links);
    } catch(err) {
        console.log("REPOAPI_MODAL API CALL ERROR");
        console.log(err);
        return NextResponse.json({error: 'My Internal Server Error'}, {status: 500})
    }
}