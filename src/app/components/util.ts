function validateUtmFromUrl(pathname: string) {
    const UTM_CAMPAIGNS: Record<string, string[]> = {};

    if (typeof window === 'undefined') return false;

    let fullUrl = window.location.href;

    try {
        fullUrl = decodeURIComponent(fullUrl);
    } catch { 
        fullUrl = window.location.href;
    }

    fullUrl = fullUrl
        .replace(/\s+/g, '+');

    return Object.entries(UTM_CAMPAIGNS).some(
        ([signature, allowedPages]) =>
            fullUrl.includes(signature) && allowedPages.includes(pathname)
    );
}

export { validateUtmFromUrl };