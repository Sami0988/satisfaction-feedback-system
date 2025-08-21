FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd
RUN docker-php-ext-enable pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files first for better cache
COPY composer.json composer.lock ./

# Copy .env.example temporarily to avoid config errors
COPY .env.example .env

# Install dependencies without running ANY scripts
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts --ignore-platform-reqs

# Copy rest of the app
COPY . .

# Now manually run the necessary artisan commands
RUN php artisan key:generate --force || true
RUN php artisan config:clear || true
RUN php artisan cache:clear || true

# Set permissions for storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Generate Swagger docs (non-blocking)
RUN php artisan l5-swagger:generate || echo "Swagger generation failed - continuing"

EXPOSE 9000

# Use the default command to run PHP-FPM
CMD ["php-fpm"]