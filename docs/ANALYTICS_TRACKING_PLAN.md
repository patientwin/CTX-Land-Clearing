# Analytics Tracking Plan

## Event Names
- `call_click`
- `form_start`
- `form_submit_success`
- `service_cta_click`
- `scroll_50`
- `scroll_90`

## Trigger Points
- `call_click`: elements with `data-track="call_click"`
- `service_cta_click`: elements with `data-track="service_cta_click"`
- `form_start`: first focus event inside tracked form
- `form_submit_success`: form submit event
- scroll thresholds on window scroll observer

## Payload Schema
```json
{
  "event": "string",
  "path": "/current-path/",
  "referrer": "https://source.example",
  "timestamp": "2026-02-09T20:00:00.000Z",
  "utm_source": "",
  "utm_medium": "",
  "utm_campaign": "",
  "utm_term": "",
  "utm_content": "",
  "label": "optional"
}
```

## Dashboard Recommendations
- Funnel: page_view -> form_start -> form_submit_success
- Compare call_click by device class and source/medium
- Monitor service_cta_click per service page to prioritize optimization
