# Binar Academy Chapter 5 - Challenge

## Menjalankan Proyek di Local

1.  Clone repositori dan masuk ke dalam folder proyeknya

    ```
    https://gitlab.com/binar-fullstack-web-bootcamp-wave-10/chapter-7/challenge/ikhsan
    ```

2.  Install dependencies

    ```
    npm install
    ```

3.  Database

    Membuat database, jalankan perintah

    ```
    sequelize db:create
    ```

    migrasi database, jalankan perintah

    ```
    sequelize db:migrate
    ```

4.  Jalankan proyek dengan perintah

    ```
    npm run dev
    ```

5.  Menggunakan browser, akses proyek di `http://localhost:8000`

## Halaman yang tersedia

|         Route/URL          | Method | Butuh Autentikasi | Keterangan                                                          |
| :------------------------: | :----: | ----------------- | ------------------------------------------------------------------- |
|             /              |  get   | Tidak             | Landing Page                                                        |
|          /signup           |  get   | Tidak             | Halaman untuk membuat user baru                                     |
|          /signup           |  post  | Tidak             | Proses membuat user baru                                            |
|           /login           |  get   | Tidak             | Halaman Untuk Memasukkan User Berdasarkan User yang ada di database |
|           /login           |  post  | Tidak             | Berfungsi untuk proses sign in user                                 |
|           /game            |  get   | Ya                | Halaman Game                                                        |
|         /dashboard         |  get   | Ya                | Halaman Dashboard                                                   |
|   /dashboard/create-user   |  get   | Ya                | Halaman membuat user baru melalui CMS                               |
|   /dashboard/create-user   |  post  | Ya                | Proses Membuat User                                                 |
|  /dashboard/edit-user/:id  |  get   | Ya                | Halaman Mengedit / update User                                      |
|  /dashboard/edit-user/:id  |  post  | Ya                | Proses Mendupdate Data User                                         |
| /dashboard/delete-user/:id |  get   | Ya                | Proses Mendelete User                                               |

## Signup

Anda bisa membuat user baru, username harus unik tidak boleh sama dengan yang sudah pernah terdaftar. Data user yang dibuat akan dikirim ke database

## Login

Anda bisa Log In dengan user yang telah dibuat untuk mendapatkan akses ke url yang terproteksi.
Log in berdasarkan user yang ada di database. Jika data login sesuai dengan user database maka akan diberikan access key berupa JWT (jsonwebtoken) ke dalam cookie

## Protected Page

Protected page adalah halaman yang hanya bisa diakses oleh user yang berhasil login. Protected page akan mengautentikasi user yang ingin mengakses memiliki access key berupa JWT(jsonwebtoken) di dalam cookie. Jika iya, JWT akan di verifikasi dengan jsonwebtoken.verify(), jika berhasil terverifikasi, maka user bisa mengakses Protected Page.
Berikut Protected Page yang membutuhkan autentikasi :

1. /dashboard
2. /game
