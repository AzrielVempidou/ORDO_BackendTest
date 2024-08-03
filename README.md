running di client:
```json
npm i 
cd client
npm run
```
jalankan  di server: php artisan migrate --seed
- **running:** 
```
php artisan serve
```
### Listr API
- GET /bukus - Menampilkan semua buku
- POST /bukus - Membuat buku baru
- GET /bukus/{id} - Menampilkan detail buku
- PUT /bukus/{id} - Mengupdate buku
- DELETE /bukus/{id} - Menghapus buku
- GET /bukus/search/{} - Mencari buku berdasarkan nama dan/atau author

# API Documentation - Buku Management

## API Endpoints

### Get All Books

**Endpoint:** `GET /bukus`

**Description:** Retrieve a list of all books, ordered by name in ascending order.

**Response:**

- **200 OK:**
  ```json
  {
    "status": true,
    "message": "Data ditemukan",
    "data": [
      {
        "id": 1,
        "coverIMG": "image_url",
        "name": "Book Name",
        "author": "Author Name",
        "status": "Available",
        "description": "Book Description"
      },
      ...
    ]
  }
  ```
- 500 Internal Server Error: When an exception occurs.
  ```json
  {
    "status": false,
    "message": "Terjadi kesalahan: [error_message]"
  }
  ```

### Create a New Book

**Endpoint:**: `POST /bukus`

**Description:** Store a newly created book in storage.

**Request Body:**

- coverIMG (string): URL of the book cover image.
- name (string): Name of the book.
- author (string): Name of the author.
- status (string): Status of the book (e.g., Available, Checked Out).
- description (string): Description of the book.

**Response:**

- **201 Created:**
  ```json
  {
    "status": true,
    "message": "Buku berhasil dibuat"
  }
  ```
- **500 Internal Server Error: When an exception occurs.**

  ```json
  {
    "status": false,
    "message": "Terjadi kesalahan: [error_message]"
  }
  ```

### Get a Book by ID

**Endpoint:** `GET /bukus/{id}`

**Description:** Retrieve a specific book by its ID.

**Response:**

- **200 OK:**

  ```json
  {
    "status": true,
    "message": "Data ditemukan",
    "data": {
      "id": 1,
      "coverIMG": "image_url",
      "name": "Book Name",
      "author": "Author Name",
      "status": "Available",
      "description": "Book Description"
    }
  }
  ```

- **404 Not Found: If the book is not found**

  ```json
  {
    "status": false,
    "message": "Data tidak ditemukan"
  }
  ```

- **500 Internal Server Error: When an exception occurs.**

  ```json
  {
    "status": false,
    "message": "Terjadi kesalahan: [error_message]"
  }
  ```

**Update a Book by ID**
**Endpoint:** `PUT /bukus/{id}`

**Description:** Update the details of an existing book by its ID.

**Request Body:**

- coverIMG (string): URL of the book cover image.
- name (string): Name of the book.
- author (string): Name of the author.
- status (string): Status of the book.
- description (string): Description of the book.
  **Response:**

- **200 OK:**

  ```json
  {
    "status": true,
    "message": "Buku berhasil diperbarui",
    "data": {
      "id": 1,
      "coverIMG": "image_url",
      "name": "Updated Book Name",
      "author": "Updated Author Name",
      "status": "Available",
      "description": "Updated Book Description"
    }
  }
  ```

- **404 Not Found: If the book is not found**

  ```json
  {
    "status": false,
    "message": "Data tidak ditemukan"
  }
  ```

- **422 Unprocessable Entity: If validation fails.**

  ```json
  {
    "status": false,
    "message": "Validasi gagal: [validation_error_message]"
  }
  ```

- **500 Internal Server Error: When an exception occurs.**

  ```json
  {
    "status": false,
    "message": "Terjadi kesalahan: [error_message]"
  }
  ```

### Delete a Book by ID

**Endpoint:** DELETE /bukus/{id}

**Description:** Delete a book by its ID.

**Response:**

- **200 OK:**

  ```json
  {
    "status": true,
    "message": "Buku berhasil dihapus"
  }
  ```

- **404 Not Found: If the book is not found.**

  ```json
  {
    "status": false,
    "message": "Data tidak ditemukan"
  }
  ```
### Search for Books by Name or Author
**Endpoint:** GET /bukus/search/{query}

**Description:** Search for books based on the name or author.

**Response:**

- **200 OK**
```json
{
  "status": true,
  "message": "Data ditemukan",
  "data": [
    {
      "id": 1,
      "coverIMG": "image_url",
      "name": "Book Name",
      "author": "Author Name",
      "status": "Available",
      "description": "Book Description"
    },
    ...
  ]
}
```
- **400 Bad Request: If the query is empty**
  ```json
  {
    "status": false,
    "message": "Query tidak boleh kosong"
  }
  ```
- **500 Internal Server Error: When an exception occurs.**
  ```json
  {
    "status": false,
    "message": "Terjadi kesalahan: [error_message]"
  }
  ```