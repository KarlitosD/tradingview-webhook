const breakLine = /(?:\r\n|\r|\n)/g

export const parseOrder = orderString => {
    const orderSplited = orderString.replaceAll(" ", "").replaceAll(breakLine, "").split(";")
    const orderList = orderSplited.filter(Boolean).map(part => part.split(":"))
    return Object.fromEntries(orderList)
}