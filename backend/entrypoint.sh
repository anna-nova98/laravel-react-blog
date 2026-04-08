#!/bin/sh
set -e

echo "Waiting for MySQL..."
until php -r "new PDO('mysql:host='.\$_ENV['DB_HOST'].';port='.\$_ENV['DB_PORT'].';dbname='.\$_ENV['DB_DATABASE'], \$_ENV['DB_USERNAME'], \$_ENV['DB_PASSWORD']);" 2>/dev/null; do
  sleep 2
done

echo "MySQL ready. Running migrations..."
php artisan config:clear
php artisan migrate --force
php artisan db:seed --force

echo "Starting php-fpm and nginx..."
php-fpm -D
nginx -g "daemon off;"
