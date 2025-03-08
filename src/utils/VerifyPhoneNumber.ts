

export const verifyPhoneNumber = (phoneNumber:string) => {
    return /^(?:\+20|0)?1[0-2,5]{1}[0-9]{8}$/.test(phoneNumber);
}