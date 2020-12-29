export default async function fetcher (url: string, token: string){
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            token
        }),
        credentials: 'same-origin'
    })

    return response.json()
}