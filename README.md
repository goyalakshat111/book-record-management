#book-record-management

This is a book record management API Backend for the management of records and books.


# Routes and Endpoints

## /users
POST: Create a new user
GET: Get list of all users

## /users/{id}
GET: Get a user by id
PUT: Update a user by id
DELETE: Delete a user by id (check if he/she still has an issued book)(is there any fine to be paid)

## /users/subscription-details/{id}
GET: Get user subscription details

1. Date of subscription
2. Valid till
3. Fine if any

## /books
GET: Get all books
POST: Add a new book

## /books/{id}
GET: Get a book by id
PUT: Update a book by id

## /books/issued
GET: Get all issued books

## /books/issued/withFine
GET : get all issued books with fine on them

# Subscription types

Basic(3months)
Standard(6months)
Premium(12months)

If the subscription date is 01/12/22
and Subscription type is Standard
and the valid till date will be 01/05/23

If he has an issued book and the issued book is to be returned till 01/12/23 and he misses it then gets a fine of  Rs. 100

If he has an issued book and the issued book is to be returned till 01/12/23 and he misses date of return and his subscription also expires then impose a fine of Rs.200