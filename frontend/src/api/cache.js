const cache = new Map();
const TTL = 1000 * 60 * 5; // 5 minutes

export function getCached(key) {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
        cache.delete(key);
        return null;
    }

    return entry.data;
}

export function setCached(key, data) {
    cache.set(key, {
        data,
        expiry: Date.now() + TTL,
    });
}
