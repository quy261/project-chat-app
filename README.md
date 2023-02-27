Hướng dẫn chạy dự án
### Install các packages phục vụ cho dự án
    npm i --save react-router-dom
    npm i --save lodash
    npm i --save styled-components
    npm i --save date-fns
    npm i --save firebase  
    npm i --save antd ant-design/icons
### Thiết lập cấu hình file config.js
    ...(xem trong video hương dẫn)
### Tải firebase CLI để chạy firebase local emulator dành cho chế độ  local development
    Tạo thư mục mới emulator -> new terminal tại thư mục này -> npm i --save -g firebase-tools
### Thiết lập firebase emulator
    ### Đăng nhập vô tài khoản firebase đã dùng để thiết lập cấu hình trong file config.js
        Tại terminal trên: firebase login 
    ### Khởi tạo
        firebase init -> ...(xem trong video hướng dẫn)
    ### khởi chạy
        firebase emulators:start
### Chạy dự án
    Tại thư mục chat-app -> new terminal -> npm start/yarn start           