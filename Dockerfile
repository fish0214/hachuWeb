FROM php:8.2-apache

# 安裝系統套件與 PostgreSQL 擴展
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql

# 複製你的 PHP 檔案到容器內
COPY . /var/www/html/

# 設定 Apache 權限
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html
    
# 設定 Apache 首頁只為 index.html
RUN echo "<IfModule dir_module>\nDirectoryIndex index.html\n</IfModule>" > /etc/apache2/conf-available/directoryindex.conf \
    && a2enconf directoryindex

# 啟動 Apache
CMD ["apache2-foreground"]
