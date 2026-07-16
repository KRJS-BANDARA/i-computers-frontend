export default function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        throw new Error("N/A");
    }

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const dayOfMonth = date.getDate();
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} ${dayName}, ${monthName} ${year} @ ${hours}.${minutes}${ampm}`;
}