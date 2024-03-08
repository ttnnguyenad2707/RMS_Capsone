export function formatMoney(number) {
    if (number){
        return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        });

    }
}