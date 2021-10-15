const api_base = "https://gnikdroy.pythonanywhere.com/api"


export async function fetch_popular() {
    const url = api_base + "/book";
    const response = await fetch(url);
    return await response.json();
}