import { Button } from '@/components/ui/button';
import { generateFlightTemplateExcel } from '@/features/flight-management/helper/generate-flight-template-excel';
import { Upload, type UploadProps } from 'antd';
import {
  AlertTriangleIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  HelpCircleIcon,
  UploadCloudIcon,
} from 'lucide-react';

type UploadFileStepProps = {
  handleBeforeUpload: UploadProps['beforeUpload'];
};

export const UploadFileStep = ({ handleBeforeUpload }: UploadFileStepProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
      {/* Left: Drag & Drop Zone */}
      <div className="space-y-6 lg:col-span-5">
        <div className="overflow-hidden rounded-lg border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-2 border-b pb-4 text-base font-bold">
            <UploadCloudIcon className="size-5 text-primary" />
            Tải lên tệp Excel
          </div>

          <div className="py-10">
            <Upload.Dragger
              accept=".xlsx"
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              className="py-10 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/10 [&_.ant-upload-drag]:bg-muted"
            >
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="rounded-full border bg-card p-4 text-slate-400 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:text-indigo-500 group-hover:shadow-md">
                  <UploadCloudIcon className="size-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">
                    Kéo thả tệp tin Excel vào đây hoặc click để chọn
                  </p>
                  <p className="text-xs text-gray-400">
                    Chỉ chấp nhận tệp định dạng .xlsx có cấu trúc 3 sheet
                  </p>
                </div>
              </div>
            </Upload.Dragger>

            <div className="mt-10 flex items-center justify-between rounded-lg border bg-muted p-6">
              <div className="flex items-center gap-3">
                <FileSpreadsheetIcon className="size-6 text-primary" />
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">
                    Chưa có tệp Excel đúng mẫu?
                  </p>
                  <p className="text-xs text-gray-400">
                    Tải xuống tệp Excel chứa dữ liệu mẫu.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={generateFlightTemplateExcel}
                className="flex items-center gap-1.5 text-xs hover:bg-white"
              >
                <DownloadIcon className="size-3.5" /> Tải file mẫu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Instructions & Guidelines */}
      <div className="space-y-6 lg:col-span-3">
        <div className="overflow-hidden rounded-lg border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-2 border-b pb-4 text-base font-bold">
            <HelpCircleIcon className="size-5 text-primary" /> Hướng dẫn nhập
            liệu
          </div>
          <div className="space-y-4 py-4">
            <div className="space-y-1 border-b border-dashed pb-3">
              <span className="block text-sm font-bold tracking-wider">
                Sheet 1: Danh sách chuyến bay
              </span>
              <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                <li>Mỗi dòng đại diện cho 1 chuyến bay.</li>
                <li>
                  Cột <strong>STT</strong> sẽ được dùng làm{' '}
                  <strong>Mã chuyến bay</strong> ở Sheet 2.
                </li>
                <li>
                  Đối với cột <strong>Hành trình</strong>: <br /> Nhập liên tục
                  danh sách mã sân bay, không có khoảng trắng.
                  <br />
                  Ví dụ: <br /> <strong>HANSGNHAN</strong> (Đối với chuyến bay
                  khứ hồi HAN-SGN-HAN) <br /> <strong>HANSGN</strong> (Đối với
                  chuyến bay một chiều HAN-SGN).
                </li>
              </ul>
            </div>

            <div className="space-y-1 border-b border-dashed pb-3">
              <span className="block text-sm font-bold tracking-wider">
                Sheet 2: Danh sách bộ điều kiện
              </span>

              <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                <li>
                  Dùng để nhập bộ điều kiện cho các chuyến bay có trong Sheet 1,
                  hoặc cũng có thể bỏ qua và cập nhật sau.
                </li>
                <li>
                  Các điều kiện được thêm trong sheet này, nếu có cùng{' '}
                  <strong>Mã chuyến bay</strong> sẽ được áp dụng cho cùng 1
                  chuyến bay có <strong>STT</strong> tương ứng trong Sheet 1.
                </li>
              </ul>
            </div>

            <div className="space-y-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-red-600">
              <strong className="flex items-center gap-1 font-bold">
                <AlertTriangleIcon className="size-3.5" /> Lưu ý quan trọng:
              </strong>
              <ul className="list-disc space-y-1 pl-6 text-xs leading-relaxed">
                <li>
                  Tính năng nhập Excel <strong>CHỈ</strong> hỗ trợ cho những
                  chuyến bay có hành trình <strong>BAY THẲNG</strong>.
                </li>
                <li>Nhập tối đa 20 dòng/1 lần.</li>
                <li>
                  Thông tin hướng dẫn chi tiết vui lòng xem ở sheet{' '}
                  <strong>"Hướng dẫn nhập thông tin"</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
