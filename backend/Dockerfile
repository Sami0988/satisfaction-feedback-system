# -------------------------
# Stage 1: Build PHP / Composer dependencies
# -------------------------
FROM php:8.3-fpm AS base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libzip-dev \
    unzip \
    zip \
    && docker-php-ext-install pdo_pgsql zip bcmath

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files first (better caching)
COPY composer.json composer.lock ./

# Install PHP dependencies without running artisan scripts
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# -------------------------
# Stage 2: Copy Application
# -------------------------
FROM base AS app

# Copy application code
COPY . .

# Set permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose PHP-FPM port
EXPOSE 9000

# Run PHP-FPM
CMD ["php-fpm"]

# -------------------------
# NOTES:
# 1. We don't copy .env or run artisan commands here.
# 2. After container starts, you should run:
#      docker compose exec laravel.test cp .env.example .env
#      docker compose exec laravel.test php artisan key:generate
#      docker compose exec laravel.test php artisan migrate
# -------------------------
