const http = require('node:http');

let books = [
 { id: 1, title: "yee", author: "apush", year: 2008 },
 { id: 2, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999 },
 { id: 3, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999 },
 { id: 4, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999 },
 { id: 5, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999 }

];

const server = http.createServer((req, res) => {

    res.setHeader('Content-type', 'application/json')

    const url = new URL(req.url, 'http://localhost:3000')

    const pathname = url.pathname
    const params = url.searchParams
    const parts = pathname.split('/').filter(Boolean);

    if (req.method === 'GET') {

        if (pathname === '/books') {  // /books?author=smth   /books?page=1&limit=5

            if (params.toString() === '') {
                res.writeHead(200)
                return res.end(JSON.stringify(books))
            }

            const specialQueries = ['page', 'limit', 'sort', 'order']
            const query = Object.fromEntries(params.entries())

            const page = parseInt(query.page) || 1
            const limit = parseInt(query.limit) || 5

            let result = [...books]

            for (const k in query) {
                if (!specialQueries.includes(k)) {
                    result = result.filter(b => String(b[k]) === query[k])
                }
            }

            if (query.sort) {

                const field = query.sort
                const order = query.order === 'desc' ? -1 : 1

                result.sort((a, b) => {
                    if (a[field] > b[field]) return 1 * order;
                    if (a[field] < b[field]) return -1 * order;
                    return 0;
                });
            }

            const startIndex = (page - 1) * limit || 0
            const endIndex = page * limit || 5

            result = result.slice(startIndex, endIndex)

            res.writeHead(200)
            return res.end(JSON.stringify(result))
        }

        if (parts.length == 2 && parts[0] === 'books') {  // /books/1

            const id = parseInt(parts[1])

            if (isNaN(id)) {
                res.writeHead(400)
                return res.end(JSON.stringify({ error: "not valid input" }))
            }

            const book = books.find(b => b.id === id)

            if (!book) {
                res.writeHead(404)
                return res.end(JSON.stringify({ error: "there is not a book with that index" }))
            }

            res.writeHead(200)
            return res.end(JSON.stringify(book))
        }
    }

    else if (req.method === "POST" && req.url === '/books') {

        let body = ''

        req.on('data', chunk => body += chunk)

        req.on('end', () => {

            try {

                const data = JSON.parse(body)

                if (!data.author) {
                    res.writeHead(400)
                    return res.end(JSON.stringify({ error: "author is required" }))
                }

                if (!data.title) {
                    res.writeHead(400)
                    return res.end(JSON.stringify({ error: "title is required" }))
                }

                if (!data.year) {
                    res.writeHead(400)
                    return res.end(JSON.stringify({ error: "year is required" }))
                }

                const bookId = books.length ? books[books.length - 1].id + 1 : 1

                const newBook = { ...data, id: bookId }

                books.push(newBook)

                res.writeHead(201)
                return res.end(JSON.stringify(newBook))

            }

            catch (err) {
                res.writeHead(400)
                return res.end(JSON.stringify({ error: "invalid JSON" }))
            }
        })
    }

    else if (req.method === 'PUT' && parts.length === 2 && parts[0] === 'books') {

        const id = parseInt(parts[1])

        if (isNaN(id)) {
            res.writeHead(400)
            return res.end(JSON.stringify({ error: "Invalid id" }))
        }

        const bookId = books.findIndex(b => b.id === id)

        if (bookId === -1) {
            res.writeHead(404)
            return res.end(JSON.stringify({ error: "book with that id is not found" }))
        }

        let body = ''

        req.on('data', chunk => body += chunk)

        req.on('end', () => {

            try {

                const data = JSON.parse(body)

                if (!data.title) {
                    res.writeHead(400)
                    return res.end(JSON.stringify({ error: "Title is required" }))
                }

                if (!data.author) {
                    res.writeHead(400)
                    return res.end(JSON.stringify({ error: "Author is required" }))
                }

                if (!data.year) {
                    res.writeHead(400)
                    return res.end(JSON.stringify({ error: "Year is required" }))
                }

                books[bookId] = { ...data, id }

                res.writeHead(200)
                return res.end(JSON.stringify(books[bookId]))

            }

            catch {
                res.writeHead(400)
                return res.end(JSON.stringify({ error: "invalid JSON" }));
            }
        })
    }

    else if (req.method === 'PATCH' && parts.length === 2 && parts[0] === 'books') {

        const id = parseInt(parts[1])

        if (isNaN(id)) {
            res.writeHead(400)
            return res.end(JSON.stringify({ error: "Invalid id" }))
        }

        const bookId = books.findIndex(b => b.id === id)

        if (bookId === -1) {
            res.writeHead(404)
            return res.end(JSON.stringify({ error: "book with that id is not found" }))
        }

        let body = ''

        req.on('data', chunk => body += chunk)

        req.on('end', () => {

            try {

                const data = JSON.parse(body)

                if (data.title !== undefined) books[bookId].title = data.title
                if (data.author !== undefined) books[bookId].author = data.author
                if (data.year !== undefined) books[bookId].year = data.year

                res.writeHead(200)
                return res.end(JSON.stringify(books[bookId]))
            }

            catch {
                res.writeHead(400)
                return res.end(JSON.stringify({ error: "invalid JSON" }));
            }
        })
    }

    else if (req.method === 'DELETE' && parts.length === 2 && parts[0] === 'books') {

        const id = parseInt(parts[1])

        if (isNaN(id)) {
            res.writeHead(400)
            return res.end(JSON.stringify({ error: "Invalid id" }))
        }

        const bookId = books.findIndex(b => b.id === id)

        if (bookId === -1) {
            res.writeHead(404)
            return res.end(JSON.stringify({ error: "book with that id is not found" }))
        }

        books.splice(bookId, 1)

        res.writeHead(204)
        return res.end()
    }

    else if (req.method === 'OPTIONS') {

        res.writeHead(204, {
            Allow: 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        })

        return res.end()
    }

    else {
        res.writeHead(404)
        return res.end(JSON.stringify({ error: "Route not found" }))
    }

})

server.listen(3000, 'localhost', () => {
    console.log("server running on http://localhost:3000");
})