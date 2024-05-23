export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
    })} ${date.getFullYear()}`
}

export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(number)
}

export const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
}

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}
