import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch = (async ({ event, request, fetch }) => {
    if (request.url.startsWith(PUBLIC_SERVER_URL)) {
        console.log(event.request.headers);
        request.headers.set('cookie', event.request.headers.get('cookie') ?? "");
    }

    return fetch(request);
}) satisfies HandleFetch;
