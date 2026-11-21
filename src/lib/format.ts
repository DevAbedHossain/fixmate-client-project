/** "18 Nov 2026" — falls back to the raw value if it isn't a valid date. */
export const formatDate = (value?: string) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

/** Short human-friendly booking reference, e.g. "#FM-1A2B". */
export const formatTicket = (id = "") => `#FM-${id.slice(-4).toUpperCase()}`;

/** "$1,250" */
export const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;
