/**
 * Simple Express Server for Sanity API Proxy
 * 
 * Run: node server.js
 * Or: npm run server
 * 
 * This creates a simple API route at /api/sanity that proxies Sanity requests
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production';
const SANITY_API_VERSION = '2024-01-01';

// API route to proxy Sanity requests
app.get('/api/sanity', async (req, res) => {
  try {
    const { query, params } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ 
        error: 'Missing or invalid query parameter' 
      });
    }

    // Handle parameterized queries (like blog post by slug)
    let finalQuery = query;
    if (params && typeof params === 'string') {
      try {
        const parsedParams = JSON.parse(params);
        if (parsedParams.slug) {
          // Replace $slug in query with actual value
          finalQuery = query.replace(/\$slug/g, `"${parsedParams.slug}"`);
        }
      } catch (e) {
        console.warn('Failed to parse params:', e);
      }
    }

    // Build Sanity API URL
    const sanityUrl = new URL(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
    );
    
    sanityUrl.searchParams.set('query', finalQuery);
    sanityUrl.searchParams.set('perspective', 'published');
    sanityUrl.searchParams.set('useCdn', 'true');

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
      return res.status(sanityResponse.status).json({
        error: `Sanity API error: ${sanityResponse.status}`,
        details: errorText,
      });
    }

    const data = await sanityResponse.json();
    
    // Return the result
    return res.status(200).json({
      result: data.result || data,
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sanity-proxy' });
});

app.listen(PORT, () => {
  console.log(`🚀 Sanity Proxy Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/sanity`);
});
