# 使用官方 PHP + Apache 映像
FROM php:8.2-apache

# 安裝 MySQL 擴展
RUN docker-php-ext-install mysqli pdo pdo_mysql

# 複製你的 PHP 檔案到容器內
COPY . /var/www/html/

# 設定 Apache 權限
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# 啟動 Apache
CMD ["apache2-foreground"]
