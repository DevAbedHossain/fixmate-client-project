/** "18 Nov 2026" — falls back to the raw value if it isn't a valid date. */
export const formatDate = (value?: string) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

/** Short human-friendly booking reference, e.g. "#FM-1A2B". */
export const formatTicket = (id = "") => `#FM-${id.slice(-4).toUpperCase()}`;

/** "2-3 hours" stays as-is; older numeric values become "3 hours". */
export const formatDuration = (value?: string | number) => {
    if (value === undefined || value === "") return "—";
    const hours = Number(value);
    if (Number.isNaN(hours)) return String(value);
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
};

/** "$1,250" — missing or invalid values show as "$0" instead of crashing. */
export const formatCurrency = (value?: number | string | null) => {
    const amount = Number(value);
    return `$${(Number.isFinite(amount) ? amount : 0).toLocaleString("en-US")}`;
};
