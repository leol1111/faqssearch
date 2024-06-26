import type { NextApiRequest, NextApiResponse } from 'next'
const path = require('path');
const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');

const keyFilePath = path.join('app/api/evident-wind-244909-85c5678c9875.json');



export async function POST(req: Request) {
  console.log('req url',req.url)
  try {
    const auth = new GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

 

    const url = 'https://discoveryengine.googleapis.com/v1/projects/evident-wind-244909/locations/global/collections/default_collection/engines/faqs-search_1711686041183/servingConfigs/default_search:search';

    const headers = {
      'Authorization': `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json',
    };
    
    const body = await new Response(req.body).json();
    console.log(body)
    
    const data = JSON.stringify({
      query: "animals",
      pageSize: 5,
      queryExpansionSpec: { condition: "DISABLED", "pinUnexpandedResults": false },
      spellCorrectionSpec: { mode: "AUTO" },
    });


    const response = await axios.post(url,data, {headers})
    return Response.json(response.data); 


  } catch (error) {
    return Response.json({ error: 'Discovery Engine API Error' });
  }
}
