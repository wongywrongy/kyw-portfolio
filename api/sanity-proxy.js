/**
 * Sanity CMS Proxy API Route (JavaScript version)
 * 
 * This serverless function acts as a proxy to fetch Sanity data
 * server-side, avoiding CORS issues. Works with Vercel, Netlify, or any Node.js server.
 * 
 * Usage: GET /api/sanity-proxy?query=GROQ_QUERY&params=JSON_STRING
 */

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production';
const SANITY_API_VERSION = '2024-01-01';

export default async function handler(request, response) {
  // Enable CORS for all origins
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    const { query, params } = request.query;

    if (!query || typeof query !== 'string') {
      return response.status(400).json({ 
        error: 'Missing or invalid query parameter' 
      });
    }

    // Build Sanity API URL
    const sanityUrl = new URL(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
    );
    
    sanityUrl.searchParams.set('query', query);
    sanityUrl.searchParams.set('perspective', 'published');

    // Handle parameterized queries
    if (params && typeof params === 'string') {
      try {
        const parsedParams = JSON.parse(params);
        if (parsedParams.slug) {
          // Replace $slug in query with actual value
          const modifiedQuery = query.replace(/\$slug/g, `"${parsedParams.slug}"`);
          sanityUrl.searchParams.set('query', modifiedQuery);
        }
      } catch (e) {
        console.warn('Failed to parse params:', e);
      }
    }

    // Fetch from Sanity API (server-side, no CORS issues)
    const sanityResponse = await fetch(sanityUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!sanityResponse.ok) {
      const errorText = await sanityResponse.text();
      console.error('Sanity API error:', errorText);
      return response.status(sanityResponse.status).json({
        error: `Sanity API error: ${sanityResponse.status}`,
        details: errorText,
      });
    }

    const data = await sanityResponse.json();
    
    // Return the result
    return response.status(200).json({
      result: data.result || data,
      query: query.substring(0, 100) + '...', // Log first 100 chars for debugging
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return response.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
