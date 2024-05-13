- Cài đặt Nodejs
- Clone reposistory github: https://github.com/Tatu2002vz/DATN/
Mở Terminal nhập:
git clone https://github.com/Tatu2002vz/DATN/
 
- Truy cập vào thư mục backend và tải các package cần thiết:
npm install
 
- Truy cập vào thư mục frontend và tải các package cần thiết:
npm install
 
Chạy cả 2 sử dụng lệnh: npm start
- Chèn dữ liệu vào cơ sở dữ liệu sử dụng postman:
•	Thêm các thể loại:
method: Post - url: http://localhost:8888/api/insert/ 
•	Thêm các truyện:
method: Post - url: http://localhost:8888/api/insert/comic
•	Thêm các chương:
method: Post - url: http://localhost:8888/api/insert/chapter

- Truy cập vào url http://localhost:3000/ để sử dụng hệ thống
