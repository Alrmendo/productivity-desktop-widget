Setup đóng gói app Electron này thành file .exe chạy trên Windows.

YÊU CẦU:
1. Kiểm tra package.json hiện tại — xác nhận đang dùng electron-vite (do đã thấy electron.vite.config.ts), đảm bảo cấu trúc main/preload/renderer build ra đúng dist trước khi đóng gói.
2. Thêm electron-builder làm devDependency (nếu chưa có).
3. Cấu hình electron-builder trong package.json (field "build") hoặc file electron-builder.yml riêng:
   - appId: đặt theo tên app
   - productName: "productivity desktop widget"
   - target Windows: "portable" (1 file .exe duy nhất, chạy ngay không cần cài đặt — phù hợp vì đây là widget cá nhân, không cần installer/uninstaller/registry)
   - files: include đúng dist (main/preload/renderer output từ electron-vite build), loại trừ source code/node_modules dư thừa không cần thiết trong bundle
   - Nếu có file icon (.ico) trong project thì gán vào, nếu chưa có icon thì dùng icon mặc định của Electron và báo lại cho tôi biết để tôi chuẩn bị icon riêng sau.
4. Thêm npm script:
   "build:win": "electron-vite build && electron-builder --win portable"
5. Chạy thử npm run build:win, xác nhận file .exe được tạo ra (thường ở thư mục release/ hoặc dist/), báo lại đường dẫn chính xác của file .exe sau khi build xong.

Lưu ý: nếu muốn có installer dạng setup.exe (cài vào Program Files, tạo shortcut Start Menu, có uninstaller) thay vì portable, hãy nói rõ trước khi đổi target — mặc định chọn "portable" vì đơn giản và phù hợp app cá nhân dùng nội bộ.

Sau khi build thành công, show lại nội dung file build config đã thêm/sửa.