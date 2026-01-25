# Simple API Route Example

If you have a backend/router API (like Next.js, Express, etc.), just create this simple endpoint:

## Next.js API Route Example

Create `pages/api/sanity.ts` (or `app/api/sanity/route.ts` for App Router):

```typescript
// pages/api/sanity.ts (Pages Router)
// OR app/api/sanity/route.ts (App Router)

export default async function handler(req, res) {
  const { query, params } = req.query;
  
  // Build Sanity URL
  const sanityUrl = `https://29s0hb29.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(query)}&perspective=published`;
  
  // Handle params (like slug)
  let finalQuery = query;
  if (params) {
    const parsed = JSON.parse(params);
    if (parsed.slug) {
      finalQuery = query.replace(/\$slug/g, `"${parsed.slug}"`);
    }
  }
  
  // Fetch from Sanity (server-side, no CORS)
  const response = await fetch(sanityUrl);
  const data = await response.json();
  
  res.json({ result: data.result || data });
}
```

## Express.js Example

```javascript
// routes/sanity.js
app.get('/api/sanity', async (req, res) => {
  const { query, params } = req.query;
  
  const sanityUrl = `https://29s0hb29.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(query)}&perspective=published`;
  
  const response = await fetch(sanityUrl);
  const data = await response.json();
  
  res.json({ result: data.result || data });
});
```

## Then Just Set:

In your `.env`:
```
VITE_API_ROUTE=/api/sanity
```

That's it! No proxies, no extra services - just your existing backend.
