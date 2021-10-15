const api_base = "https://gnikdroy.pythonanywhere.com/api"


export async function fetch_book(book_id) {
    const url = api_base + "/book/" + book_id;
    const response = await fetch(url);
    return await response.json();
}

export async function search_book(q) {
    const url = api_base + "/book?";
    const response = await fetch(url + new URLSearchParams({ search: q }));
    return await response.json();
}
export async function fetch_popular(page_num = 1) {
    const url = api_base + "/book?";
    const response = await fetch(url + new URLSearchParams({ page: page_num }));
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

export function extract_html(book) {
    if (book.resources == null) { return null; }
    for (const resource of book.resources) {
        if (resource.type.startsWith("text/html") && (resource.uri.endsWith(".htm") | resource.uri.endsWith(".html"))) {
            return resource;
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