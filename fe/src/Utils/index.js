export function formatMoney(number) {
    if (number) {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });
    }
}
export function convertStringToNumber(inputString) {
    if (inputString){
        const numberString = inputString.replace(/[^0-9]/g, "");
        const number = parseInt(numberString, 10);
        return number;

    }
}
