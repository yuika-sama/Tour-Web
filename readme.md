### Cách cài đặt và khởi chạy
- Nhóm: 14, lớp: CSDL_04
- Project này của nhóm sử dụng VSCode để làm công cụ lập trình
- Project này sử dụng các công nghệ sau cho backend: expressjs, mysql2, bcrypt, crypto, dotenv, jsonwebtoken, nodemailer, passport ,cors
- Yêu cầu: 
	- Đã cài đặt nodejs trong máy.
	- Đã cài đặt VSCode trong máy.
	- Đã cài đặt Extension **Live Server**
	- Đã cài đặt MySQL trên máy tính và có các bảng phù hợp
- Khởi chạy: Chạy lần lượt theo thứ tự `api -> frontend`
### Back-end
- **Cài đặt môi trường:**  chạy lần lượt các lệnh sau trên Terminal
	- ```cd api```
	- ```npm install express mysql2 dotenv cors mysql2 bcrypt crypto dotenv jsonwebtoken nodemailer pasport```
	- Tạo một schema có tên: ```ltm```
	- Sửa lại trong file ```.env``` các thông tin phù hợp
		- ```shell
			DB_HOST=localhost
			DB_USER=root
			DB_PASSWORD=<database_password>
			DB_NAME=<database_name>
			PORT=3636
			JWT_SECRET=<your_JWT_secret>

			EMAIL_HOST=sandbox.smtp.mailtrap.io
			EMAIL_PORT=587
			EMAIL_USER=<find_in_mailtrap_setting>
			EMAIL_PASSWORD=<find_in_mailtrap_setting>
			EMAIL_FROM="Tour Booking <no-reply@example.com>"
			EMAIL_SECURE=false
			NODE_ENV=production
			```

- **Khởi chạy**
	- Tại terminal, chạy lần lượt các lệnh
		- ```cd api(nếu đã trỏ vào thư mục BE thì bỏ qua bước này)```
		- ```npm run dev```

### Front-end
- **Khởi chạy**
	- Yêu cầu: Cài extension **Live Server** của VSCode
	- Chuột phải vào file **login.html**, chọn **Open with LiveServer**
### P/s
- Hiện tại, do front-end làm xấu quá nên chỉ có code backend thôi hẹ hẹ hẹ
