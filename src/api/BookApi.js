import axios from 'axios';

/**
 * API root location

 * @type {object}
 */
export const api_base = "https://gnikdroy.pythonanywhere.com/api"


/**
 * Fetch a book from the api
 * @param {Number} book_id - The book id.
 * @param {object} query - The query object
 * @returns {Promise} - The promise of the response as returned by axios.
 */
export function fetch_book(book_id, query = {}) {
    const url = api_base + "/book/" + book_id;
    return axios.get(url, {params: query });
}

/**
 * Fetch books from the api
 * @param {object} query - The query object
 * @returns {Promise} - The promise of the response as returned by axios.
 */
export function fetch_books(query) {
    const url = api_base + "/book";
    return axios.get(url, {params: query });
}

/**
 * Parse books returned from the api
 * Extracts the cover and author and adds them as attributes to the given object.
 * 
 * @param {object} book - The book object from the api.
 * @returns {object} - The modified book object.
 */
export function parse_book(book) {
    return { ...book, cover: extract_cover(book), author: extract_author(book) };
}

/**
 * Extract author from the book
 * 
 * @param {object} book - The book object from the api.
 * @returns {any} - Either the agent object or null.
 */
function extract_author(book) {
    for (const agent of book.agents) {
        if (agent.type === "Author") {
            return agent;
        }
    }
    return null;
}


/**
 * Extract epub resource from the book
 * 
 * @param {object} book - The book object from the api.
 * @returns {any} - Either the resource object or null.
 */
export function extract_epub(book) {
    if (book.resources == null) { return null; }
    for (const resource of book.resources) {
        if (resource.uri.endsWith(".epub.images")) {
            return resource;
        }
    }
    for (const resource of book.resources) {
        if (resource.uri.endsWith(".epub.noimages")) {
            return resource;
        }
    }
    return null;
}

/**
 * Extract html resource from the book
 * 
 * @param {object} book - The book object from the api.
 * @returns {any} - Either the resource object or null.
 */
export function extract_html(book) {
    if (book.resources == null) { return null; }
    for (const resource of book.resources) {
        if (resource.type.startsWith("text/html") && (resource.uri.endsWith(".htm") | resource.uri.endsWith(".html"))) {
            return resource;
        }
    }
    return null;
}

/**
 * Extract cover resource from the book.
 * 
 * @param {object} book - The book object from the api.
 * @returns {any} - Either the resource object or null.
 */
function extract_cover(book) {
    for (const resource of book.resources) {
        if (resource.type === "image/jpeg" && (
            resource.uri.endsWith(".cover.medium.jpg") ||
            resource.uri.endsWith(".cover.medium.jpeg")
            )) {
            return resource;
        }
    }
    for (const resource of book.resources) {
        if (resource.type === "image/jpeg" && ( 
            resource.uri.endsWith(".cover.small.jpg") ||
            resource.uri.endsWith(".cover.small.jpeg")
            )) {
            return resource;
        }
    }
    for (const resource of book.resources) {
        if (resource.type === "image/png" && resource.uri.endsWith(".cover.medium.png")) {
            return resource;
        }
    }
    for (const resource of book.resources) {
        if (resource.type === "image/png" && resource.uri.endsWith(".cover.small.png")) {
            return resource;
        }
    }
    return null;
}