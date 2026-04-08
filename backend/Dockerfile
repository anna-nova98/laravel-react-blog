# Stage 1: Composer dependencies
FROM composer:2 AS vendor

WORKDIR /app

COPY backend/composer.json backend/composer.lock ./
RUN composer install --prefer-dist --no-interaction --optimize-autoloader --no-scripts --ignore-platform-reqs

# Stage 2: PHP runtime
FROM php:8.3-fpm

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip libonig-dev libzip-dev zip \
    && docker-php-ext-install pdo_mysql mbstring zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy application files
COPY backend/ ./

# Overwrite .env to use MySQL (docker-compose env vars will take precedence at runtime)
RUN sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=mysql/' .env && \
    sed -i 's/^# DB_HOST=.*/DB_HOST=db/' .env && \
    sed -i 's/^# DB_PORT=.*/DB_PORT=3306/' .env && \
    sed -i 's/^# DB_DATABASE=.*/DB_DATABASE=blog/' .env && \
    sed -i 's/^# DB_USERNAME=.*/DB_USERNAME=root/' .env && \
    sed -i 's/^# DB_PASSWORD=.*/DB_PASSWORD=root/' .env

# Copy vendor from previous stage
COPY --from=vendor /app/vendor ./vendor

# Clear cached package discovery (regenerate without dev deps)
RUN rm -f bootstrap/cache/packages.php && php artisan package:discover --ansi

# Make entrypoint executable
RUN chmod +x entrypoint.sh

# Expose port
EXPOSE 8000

# Run Laravel development server
CMD ["sh", "entrypoint.sh"]