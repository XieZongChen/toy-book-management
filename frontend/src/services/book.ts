import { axiosInstance } from "./base";

export async function list(name: string) {
    return await axiosInstance.get('/book/list', {
        params: {
            name
        }
    });
}

export interface CreateBook {
    name: string;
    author: string;
    description: string;
    cover: string;
}

export async function create(book: CreateBook) {
    return await axiosInstance.post('/book/create', {
        name: book.name,
        author: book.author,
        description: book.description,
        cover: book.cover
    });
}

export async function detail(id: number) {
    return await axiosInstance.get(`/book/${id}`);
}

export interface UpdateBook {
    id: number;
    name: string;
    author: string;
    description: string;
    cover: string;
}

export async function update(book: UpdateBook) {
    return await axiosInstance.put('/book/update', {
        id: book.id,
        name: book.name,
        author: book.author,
        description: book.description,
        cover: book.cover
    });
}

export async function deleteBook(id: number) {
    return await axiosInstance.delete(`/book/delete/${id}`);
}