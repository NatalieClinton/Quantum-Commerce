# Quantum-Commerce
## Description

This project implements an Express.js API with Sequelize to manage the back end of an e-commerce site. It includes models for categories, products, tags, and their associations, allowing for CRUD operations via API routes. The application interacts with a PostgreSQL database to store and retrieve data related to products, categories, and tags.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Models](#database-models)
- [Technologies Used](#technologies-used)
- [Walkthrough Video](#walkthrough-video)
- [Contact](#contact)

## Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/NatalieClinton/Quantum-Commerce.git>
   ```
2. Navigate into the project directory:
   ```bash
   cd <Documents/Quantum-Commerce>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
 - `DB_NAME`
 - `DB_USER`
 - `DB_PASSWORD`
5. Create database and seed data:
   ```bash
   npm run seed
   ```

## Usage
1. Start the server:
    ```bash
    npm start
    ```
2. Use Insomnia Core or any API testing tool to test the API routes.

## Database Models
### Category
- `id`: Integer, primary key, auto increment.
- `category_name`: String, does not allow null values.
### Product
- `id`: Integer, primary key, auto increment.
- `product_name`: String, does not allow null values.
- `price`: Decimal, does not allow null values, validates decimal format.
- `stock`: Integer, does not allow null values, default value 10, validates numeric format.
- `category_id`: Integer, references Category model.
### Tag
- `id`: Integer, primary key, auto increment.
- `tag_name`: String, does not allow null values.
### ProductTag
- `id`: Integer, primary key, auto increment.
- `product_id`: Integer, references Product model.
- `tag_id`: Integer, references Tag model.

## Technologies Used
- **Express.js**
- **Sequelize**
- **PostgreSQL**
- **dotenv**

## Walkthrough Video
Watch the Walkthrough Video(https://1drv.ms/v/s!Aou5GeHwI5dtk1owYLs_CEJQbxHo?e=9IknJc)    

## Contact
For any questions or feedback regarding this project, feel free to reach out to me using the following links:

- [Email](mailto:natalie.clinton@hotmail.com)
- [GitHub](https://github.com/NatalieClinton)
- [LinkedIn](https://www.linkedin.com/in/natalie-clinton-892b42152/)