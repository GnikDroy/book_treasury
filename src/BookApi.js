const api_base = "https://gnikdroy.pythonanywhere.com/api"


export async function fetch_popular() {
    const url = api_base + "/book";
    const response = await fetch(url);
    return await response.json();
}

export function parse_book(book) {
    return {...book, cover: extract_cover(book), author: extract_author(book) };
}

function extract_author(book) {
    for (const agent of book.agents) {
        if (agent.type === "Author") {
            return agent;
        }
    }
    return null;
}

function extract_cover(book) {
    for (const resource of book.resources) {
        if (resource.type === "image/jpeg" && resource.uri.endsWith(".cover.medium.jpg")) {
            return resource;
        }
    }
    return null;

}