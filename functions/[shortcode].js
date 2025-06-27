export async function onRequest(context) {
  const shortcode = context.params.shortcode;

  const apiBase = 'https://5wilb4sld8.execute-api.ap-south-1.amazonaws.com'; 

  const response = await fetch(`${apiBase}/${shortcode}`, {
    method: 'GET',
  });

  if (response.status === 302) {
    const longUrl = response.headers.get('Location');
    return Response.redirect(longUrl, 302);
  }

  return new Response('Short URL not found', { status: 404 });
}
