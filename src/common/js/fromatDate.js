export function fromatDate(date) {
    let time = new Date(date);
    let oDate = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        day: time.getDate(),
        hour: time.getHours(),
        minutes: time.getMinutes()
    };
    let str = `${oDate.year}-${oDate.month}-${oDate.day} ${oDate.hour}:${
        oDate.minutes
        }`;
    return str;
}