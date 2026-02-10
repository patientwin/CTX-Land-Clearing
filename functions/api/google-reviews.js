const DEFAULT_BANNED = ['scam', 'lawsuit', 'fraud', 'refund denied'];

function parseBanned(value) {
  if (!value) return DEFAULT_BANNED;
  return value.split(',').map((x) => x.trim().toLowerCase()).filter(Boolean);
}

function sanitizeText(text = '') {
  return text.replace(/\s+/g, ' ').trim();
}

function filterReviews(reviews, banned) {
  return (reviews || [])
    .map((review) => ({
      authorName: sanitizeText(review.author_name || 'Google User'),
      rating: Number(review.rating || 0),
      text: sanitizeText(review.text || ''),
      relativeTime: sanitizeText(review.relative_time_description || ''),
      time: Number(review.time || 0)
    }))
    .filter((review) => review.rating >= 4)
    .filter((review) => review.text.length >= 30 && review.text.length <= 300)
    .filter((review) => !banned.some((word) => review.text.toLowerCase().includes(word)))
    .sort((a, b) => b.time - a.time)
    .slice(0, 6);
}

export async function onRequestGet(context) {
  const apiKey = context.env.GOOGLE_PLACES_API_KEY;
  const placeId = context.env.GOOGLE_PLACE_ID;
  const banned = parseBanned(context.env.GOOGLE_REVIEW_BANNED_WORDS);

  if (!apiKey || !placeId) {
    return Response.json({ ok: false, message: 'missing_google_places_env' }, { status: 200 });
  }

  try {
    const fields = 'name,reviews,rating,user_ratings_total,url';
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}&reviews_sort=newest&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      return Response.json({ ok: false, message: `google_http_${response.status}` }, { status: 502 });
    }

    const payload = await response.json();
    const result = payload?.result || {};
    const reviews = filterReviews(result.reviews, banned);

    return Response.json(
      {
        ok: true,
        source: 'google_places_api',
        placeName: result.name || '',
        rating: Number(result.rating || 0),
        userRatingsTotal: Number(result.user_ratings_total || 0),
        url: result.url || '',
        reviews
      },
      { headers: { 'cache-control': 'public, max-age=900' } }
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: 'google_reviews_fetch_failed',
        detail: error instanceof Error ? error.message : 'unknown'
      },
      { status: 500 }
    );
  }
}
