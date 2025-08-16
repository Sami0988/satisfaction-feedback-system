FROM php:8.3-fpm AS base

RUN apt-get update && apt-get install -y \
    git curl libpq-dev libzip-dev unzip zip \
    && docker-php-ext-install pdo_pgsql zip bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Step 1: Install deps without scripts
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-interaction --prefer-dist --optimize-autoloader

FROM base AS app

# Step 2: Copy application code
COPY . .

# Step 3: Run scripts now that artisan exists
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache vendor

HEALTHCHECK --interval=30s --timeout=3s \
    CMD php -r "require '/var/www/html/vendor/autoload.php'; echo 'OK';" || exit 1

CMD ["php-fpm"]
