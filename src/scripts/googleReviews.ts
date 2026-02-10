type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
};

type ReviewsResponse = {
  ok: boolean;
  reviews?: GoogleReview[];
  source?: string;
  placeName?: string;
  message?: string;
};

function stars(rating: number) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function cardTemplate(review: GoogleReview) {
  const root = document.createElement('article');
  root.className = 'review-card';

  const head = document.createElement('p');
  head.className = 'review-meta';
  head.textContent = `${stars(review.rating)}  ${review.authorName}`;

  const body = document.createElement('p');
  body.className = 'review-text';
  body.textContent = review.text;

  const time = document.createElement('p');
  time.className = 'review-time';
  time.textContent = review.relativeTime;

  root.append(head, body, time);
  return root;
}

function fallbackCard(message: string) {
  const root = document.createElement('article');
  root.className = 'review-card review-card-fallback';
  const text = document.createElement('p');
  text.className = 'review-text';
  text.textContent = message;
  root.append(text);
  return root;
}

export async function initGoogleReviews() {
  const grid = document.querySelector<HTMLElement>('[data-google-reviews-grid]');
  const note = document.querySelector<HTMLElement>('[data-google-reviews-note]');
  if (!grid) return;

  try {
    const res = await fetch('/api/google-reviews', { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`status_${res.status}`);
    const payload = (await res.json()) as ReviewsResponse;

    if (!payload.ok || !payload.reviews || payload.reviews.length === 0) {
      throw new Error(payload.message || 'no_reviews');
    }

    grid.innerHTML = '';
    payload.reviews.slice(0, 3).forEach((review) => {
      grid.append(cardTemplate(review));
    });

    if (note) {
      note.textContent = payload.source === 'google_places_api'
        ? `Live feed from Google for ${payload.placeName || 'CTX Land Clearing'}.`
        : 'Review feed loaded.';
    }
  } catch {
    grid.innerHTML = '';
    grid.append(
      fallbackCard('Google review feed is unavailable right now. Please use the button above to read current reviews directly on Google.'),
      fallbackCard('To enable live in-site reviews, set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in your Netlify environment variables.'),
      fallbackCard('This fallback keeps the section reliable on static hosting while avoiding fabricated testimonials.')
    );

    if (note) {
      note.textContent = 'Fallback mode active.';
    }
  }
}
