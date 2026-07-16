export default function getFormattedPrice(price) {
    if (price == null){
        return "N/A";
    }

    const priceInNumr = Number(price);
    if (isNaN(priceInNumr)) {
        return price;
    }else {
        return "LKR "+priceInNumr.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
}