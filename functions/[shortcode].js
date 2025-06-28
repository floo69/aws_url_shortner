export async function onRequest(context) {
  const shortcode = context.params.shortcode;
  const apiBase = 'https://5wilb4sld8.execute-api.ap-south-1.amazonaws.com';

  // Don’t auto‑follow the 302 from API Gateway
  const response = await fetch(`${apiBase}/${shortcode}`, {
    method: 'GET',
    redirect: 'manual'
  });

  // If the API returned a redirect (300–399), grab its Location
  if (response.status >= 300 && response.status < 400) {
    const longUrl = response.headers.get('Location');
    return Response.redirect(longUrl, response.status);
  }

  // Otherwise, propagate the API’s status and body
  const text = await response.text();
  return new Response(text || 'Short URL not found', { status: response.status });
}
