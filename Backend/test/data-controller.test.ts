import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app";
import AuthorModel from "../src/3-models/author-model";
import BookModel from "../src/3-models/book-model";
import StatusCode from "../src/3-models/status-code";



describe("Testing api/authors", () => {
    it("should return at least 2 authors or more:", async () => {
        const response = await supertest(app.server).get("/api/authors");
        const authors: AuthorModel[] = response.body;
        expect(authors.length).to.be.greaterThanOrEqual(2);

    })

    it("should return author that containing: authorId, first name' last name", async () => {
        const response = await supertest(app.server).get("/api/authors");
        const authors: AuthorModel[] = response.body;
        expect(authors[0]).to.haveOwnProperty("authorId");
        expect(authors[0]).to.haveOwnProperty("authorFirstName");
        expect(authors[0]).to.haveOwnProperty("authorLastName");

    })
});


describe("Testing api/books", () => {
    it("should add a new book and return it", async () => {
        const book = {
            authorId: 1,
            bookName: "Sample Book",
            bookPages: 200,
            bookPrice: 29
        };

        // Send a POST request to add the book
        const response = await supertest(app.server).post("/api/books").send(book);
        const addedBook = response.body;

        console.log("Response body:", response.body); // Log the response body

        // Assert that the added book has the 'bookId' property
        expect(addedBook).to.haveOwnProperty("bookId");

        // Assert specific properties of the added book
        expect(addedBook.authorId).to.equal(book.authorId);
        expect(addedBook.bookName).to.equal(book.bookName);
        expect(addedBook.bookPages).to.equal(book.bookPages);
        expect(addedBook.bookPrice).to.equal(book.bookPrice);
    });
});

describe("Testing delete api/books/:bookId", () => {

    it("should return 204 no content after delete book with the id 13", async () => {

        // Send a POST request to add the book
        const response = await supertest(app.server).delete("/api/books/13");
        expect(response.status).to.equal(StatusCode.NoContent);
    });
});

describe("Testing 404 route not found api/books/fdgdgfgfd", () => {

    it("should return 404 if route not found", async () => {

        // Send a GET request to an undefined route
        const response = await supertest(app.server).get("/api/authors/fdgdgfgfd");

        // Assert that the response status code is 404
        expect(response.status).to.equal(StatusCode.NotFound);
    });
})



describe("Testing catch-all route for resource not found because we dont have an book with the name abcde", () => {
    it("should return 404 for non-existing route", async () => {
        // Send a GET request to a non-existing route
        const response = await supertest(app.server).get("/api/books/abcde");

        // Assert that the response status code is 404
        expect(response.status).to.equal(StatusCode.NotFound);


    });

});

describe("Testing api/books", () => {
    it("should return error beacuse too much pages in the book", async () => {
        const book = {
            authorId: 1,
            bookName: "Sample Book",
            bookPages: 2000,
            bookPrice: 29
        };

        // Send a POST request to add the book
        const response = await supertest(app.server).post("/api/books").send(book);
        const addedBook = response.body;

        console.log("Response body:", response.body); // Log the response body
        expect(response.status).to.equal(StatusCode.BadRequest);


    });
});


