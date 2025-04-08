export function isPhoneNumber(target:string):boolean{
    const phoneRegExp = /^\+?\d+$/;

    return phoneRegExp.test(target);
}

export function validatePhoneNumber(target:string):boolean{
    const between11To14Regex = /^\d{11,14}$/;

    const is11 = target.length == 11 && !target.includes("+");
    const is14 = target.length == 14 && target.startsWith("+234");
    const is13 = target.length == 13 && target.startsWith("234");
    const is12 = target.length == 12;
    return (between11To14Regex.test(target) || is11 || is14) && !is13 && !is12;
}