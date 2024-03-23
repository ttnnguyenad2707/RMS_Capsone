export function formatMoney(number) {
    if (number) {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });
    }
    if (number === 0){
        return 0
    }
}
export function convertStringToNumber(inputString) {
    if (inputString){
        const numberString = inputString.replace(/[^0-9]/g, "");
        const number = parseInt(numberString, 10);
        return number;

    }
}

export function convertTimeFormat(timeStr) {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function getDate(timeStr) {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}