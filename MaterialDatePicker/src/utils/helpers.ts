


export const dayInMonth = (_month: number, _year: number) => {
        // Array with days count in the month
        const DAYS_IN_MONTH = [
            31,
            _year % 4 === 0
                    ? 29
                    : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ]

        return DAYS_IN_MONTH[_month]

}

export const addZero = (n: number): string => {
    return n < 10 ? `0${n}` : `${n}`
}
