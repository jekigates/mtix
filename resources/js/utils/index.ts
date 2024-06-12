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

export const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) return ""

    if (files.length === 0) return ""

    if (files[0].size > 10000000) {
        alert("File must not be more than 10 Megabytes.")
        return ""
    }

    return URL.createObjectURL(files[0])
}

export const createOptions = <T extends object>(
    items: Array<T>,
    key: keyof T
): Array<{ value: string; label: string }> => {
    return items.map((item) => {
        const keyValue = item[key]
        return {
            value: keyValue ? String(keyValue) : "",
            label: keyValue ? String(keyValue) : "",
        }
    })
}
