/**
 * Sanity CMS Proxy
 * 
 * This file provides a proxy function to fetch Sanity data server-side
 * to avoid CORS issues. The proxy can be implemented as:
 * 1. A serverless function (Vercel/Netlify)
 * 2. A backend API route
 * 3. A CORS proxy service
 */

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '29s0hb29';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

/**
 * Fetch data from Sanity via a proxy endpoint
 * This avoids CORS by making the request server-side
 */
export async function fetchViaProxy(query: string, params?: Record<string, any>) {
  // Option 1: Use a CORS proxy service (for development/testing)
  // In production, you should use your own serverless function
  const proxyUrl = import.meta.env.VITE_PROXY_URL || 'https://corsproxy.io/?';
  
  // Construct the Sanity API URL
  const baseUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`;
  const url = new URL(baseUrl);
  url.searchParams.set('query', query);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, JSON.stringify(value));
    });
  }
  
  // Use proxy to avoid CORS
  const proxiedUrl = proxyUrl + encodeURIComponent(url.toString());
  
  try {
    const response = await fetch(proxiedUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Proxy fetch error:', error);
    throw error;
  }
}

/**
 * Alternative: Direct fetch with serverless function
 * Replace the proxy URL with your own serverless function endpoint
 */
export async function fetchViaServerless(query: string, params?: Record<string, any>) {
  const serverlessUrl = import.meta.env.VITE_SERVERLESS_URL || '/api/sanity';
  
  try {
    const response = await fetch(serverlessUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, params }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Serverless fetch error:', error);
    throw error;
  }
}
