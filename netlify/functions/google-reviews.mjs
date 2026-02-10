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
    .sort((a, b) => b.time - a.time);
}

export default async () => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const banned = parseBanned(process.env.GOOGLE_REVIEW_BANNED_WORDS);

  if (!apiKey || !placeId) {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300'
      },
      body: JSON.stringify({
        ok: false,
        message: 'missing_google_places_env'
      })
    };
  }

  try {
    const fields = 'name,reviews,rating,user_ratings_total,url';
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}&reviews_sort=newest&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      return {
        statusCode: 502,
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ ok: false, message: `google_http_${response.status}` })
      };
    }

    const payload = await response.json();
    const result = payload?.result || {};
    const filtered = filterReviews(result.reviews, banned).slice(0, 6);

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=900, s-maxage=21600'
      },
      body: JSON.stringify({
        ok: true,
        source: 'google_places_api',
        placeName: result.name || '',
        rating: Number(result.rating || 0),
        userRatingsTotal: Number(result.user_ratings_total || 0),
        url: result.url || '',
        reviews: filtered
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        ok: false,
        message: 'google_reviews_fetch_failed',
        detail: error instanceof Error ? error.message : 'unknown'
      })
    };
  }
};
