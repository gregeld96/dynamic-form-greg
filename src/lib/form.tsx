export async function getFormData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })

    return await res.json();
}

export async function submitFormEdited(data: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    return await res.json();
}