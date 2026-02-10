export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    return Response.json({ ok: true, mode: 'cloudflare-pages-function', received: payload });
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
}
