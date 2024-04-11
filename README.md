# Backend for products API

## Project setup

- Clone this repo
- Run `npm install`
- Copy .env.example into .env
- Fill in DB_URL for mongodb connection
- Run `npm run dev` for dev server or `npm run start` for production server
- The server should be ready at port 3001 or specied from environment variable

## API end points

## Base url

/api/v1/

### Authentication

#### Signup

POST request to `baseurl/auth/signup` with body including email,password
returns token on successful registration or error othervise

#### Login

POST request to `baseurl/auth/login` with body including email,password
returns token on successful login or error othervise

#### Profile

GET request to `baseurl/auth/me` with token in request header authorziation
returns user details on success

### PRODUCTS

#### All products

GET request to `baseurl/products` will return all products

#### Featured products

GET request to `baseurl/products/featured` will return all featured products

#### Create new product

POST request to `baseurl/products` with

`{
    title string,
    description string,
    price: number,
    images: array of strings,
    category: string,
    isFeatured: boolean (optional)
}`

will create a new product and returns the product information

#### Get single product

GET request to `baseurl/products/:productId` will return the details of a single product
(productId id mongodb \_id of product record)

#### Update product

PUT request to `baseurl/products/:productId` with  
`{
    title string(optional),
    description string(optional),
    price: number(optional),
    images: array of strings(optional),
    category: string(optional),
    isFeatured: boolean (optional)
}`
will return the details of updated product
(productId id mongodb \_id of product record)

#### Delete product

DELETE request to `baseurl/products/:productId` with  
`{
    title string(optional),
    description string(optional),
    price: number(optional),
    images: array of strings(optional),
    category: string(optional),
    isFeatured: boolean (optional)
}`
will return the details of updated product
(productId id mongodb \_id of product record)
