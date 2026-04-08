# Use official PHP-FPM image with PHP 8.2
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libonig-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo_mysql mbstring zip

# Set working directory
WORKDIR /var/www/html

# Install Composer from official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy application source code
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions for Laravel storage and cache directories
RUN chown -R www-data:www-data storage bootstrap/cache

# Start PHP-FPM server
CMD ["php-fpm"]