export const getAge = (idNumber) => {
    idNumber = idNumber.toString();
    const tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4) - 1, idNumber.substring(4, 6));
    const birthYear = tempDate.getFullYear();
    const currentYear = new Date().getFullYear()

    return Math.abs(birthYear - currentYear);
}

