import { Button } from '@/components/ui/button';
import { flightManagementPaths } from '@/features/flight-management/routes';
import type {
  TImportResult,
  TParsedFlightFromExcelData,
} from '@/features/flight-management/types';
import { AlertTriangleIcon, CheckCircle2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  importResults: TImportResult;
  setValidatedFlights: React.Dispatch<
    React.SetStateAction<TParsedFlightFromExcelData[]>
  >;
  setStep: React.Dispatch<
    React.SetStateAction<'UPLOAD' | 'PREVIEW' | 'RESULT'>
  >;
};

export const ShowResultStep = ({
  importResults,
  setValidatedFlights,
  setStep,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg border! bg-card p-8 shadow-xs">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="flex flex-col items-center gap-3">
          {importResults.fail === 0 ? (
            <div className="animate-bounce rounded-full bg-emerald-100 p-4 text-emerald-600">
              <CheckCircle2Icon className="size-12" />
            </div>
          ) : (
            <div className="rounded-full bg-amber-100 p-4 text-amber-600">
              <AlertTriangleIcon className="size-12" />
            </div>
          )}
          <h2 className="mt-2 text-xl font-bold">Import hoàn tất!</h2>
          <p className="text-xs leading-relaxed">
            Quá trình thêm dữ liệu vào hệ thống đã được hoàn thành. Dưới đây là
            kết quả chi tiết.
          </p>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-muted p-4">
          <div className="space-y-0.5 border-r">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Thành công
            </span>
            <p className="text-xl font-bold text-emerald-500">
              {importResults.success} chuyến bay
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Thất bại
            </span>
            <p className="text-xl font-bold text-red-500">
              {importResults.fail} chuyến bay
            </p>
          </div>
        </div>

        {/* Details failure list if any */}
        {importResults.fail > 0 && (
          <div className="space-y-4 text-left">
            <span className="mb-2 inline-block text-xs">
              Chi tiết các chuyến bay thất bại:
            </span>
            <div className="max-h-40 space-y-1 divide-y overflow-y-auto rounded-lg border bg-muted p-2">
              {importResults.details
                .filter(x => !x.success)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-2 text-xs"
                  >
                    <span className="shrink-0 font-mono font-bold">
                      {item.bookingCode}
                    </span>
                    <span className="text-right text-[11px] leading-normal text-red-500">
                      {item.error}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setValidatedFlights([]);
              setStep('UPLOAD');
            }}
            className="px-5 text-xs"
          >
            Tiếp tục nhập file khác
          </Button>
          <Button
            onClick={() => navigate(flightManagementPaths.flightList.fullPath)}
            className="px-6 text-xs font-bold text-white"
          >
            Quay về danh sách chuyến bay
          </Button>
        </div>
      </div>
    </div>
  );
};
