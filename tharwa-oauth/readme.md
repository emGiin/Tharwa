# Tharwa server application

## Requirements
Install the following :
 - Wamp or Xamp (You just need PHP >= 7.0.0 & MySql)
 - [Composer](https://getcomposer.org/download/)
 

## Steps for Getting Started

```bash
cd tharwa-oauth
```

Install dependencies:

```bash
composer install
```

Set environment variables (Like DB configurations ..):

```bash
cp .env.example .env
```

Run those cmds:

```bash
# generate app key
php artisan key:generate

# create database schema
php artisan migrate --seed 
```
## Running Locally [development mode]

```bash
# checkout to develop branch
git checkout develop

# start your database service

# start dev server
php artisan serve
```


## Test

```bash

```


## Documentation

```bash

```

<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, yet powerful, providing tools needed for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of any modern web application framework, making it a breeze to get started learning the framework.

If you're not in the mood to read, [Laracasts](https://laracasts.com) contains over 1100 video tutorials on a range of topics including Laravel, modern PHP, unit testing, JavaScript, and more. Boost the skill level of yourself and your entire team by digging into our comprehensive video library.
