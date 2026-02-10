export default async (req) => {
  if (req.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(req.body || '{}');
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, mode: 'netlify-function', received: payload })
    };
  } catch {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'invalid_json' }) };
  }
};
