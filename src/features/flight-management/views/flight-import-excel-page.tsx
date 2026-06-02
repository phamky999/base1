import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { Button } from '@/components/ui/button';
import { PreviewDataStep } from '@/features/flight-management/components/import-excel/preview-data-step';
import { ShowResultStep } from '@/features/flight-management/components/import-excel/show-result-step';
import { UploadFileStep } from '@/features/flight-management/components/import-excel/upload-file-step';
import {
  getCellDateOnly,
  getCellNumber,
  getCellString,
  getCellTimeOnly,
} from '@/features/flight-management/helper/parse-excel-value-helper';
import {
  mapFlightDataImportToCreateFlightPayload,
  validateFlightDataImport,
} from '@/features/flight-management/helper/validate-flight-data-import-';
import { useCreateFlightMutation } from '@/features/flight-management/query';
import type {
  TFlightExcelImportRow,
  TImportResult,
  TImportResultDetailItem,
  TParsedFlightFromExcelData,
} from '@/features/flight-management/types';
import { Steps, type UploadProps } from 'antd';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

export const FlightImportExcelPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<'UPLOAD' | 'PREVIEW' | 'RESULT'>('UPLOAD');
  const [validatedFlights, setValidatedFlights] = useState<
    TParsedFlightFromExcelData[]
  >([]);

  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<TImportResult>({
    success: 0,
    fail: 0,
    details: [],
  });

  const [createFlightMutationFn] = useCreateFlightMutation();

  const beforeUploadFlightExcel: UploadProps['beforeUpload'] = async file => {
    try {
      const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer, {
        type: 'array',
        raw: false,
        cellText: true,
        cellDates: true,
      });

      const flightSheet = workbook.Sheets['Danh sách chuyến bay'];
      const fareRuleSheet = workbook.Sheets['Danh sách bộ điều kiện'];

      if (!flightSheet) {
        toast.error(
          'File Excel không đúng cấu trúc (thiếu sheet "Danh sách chuyến bay")'
        );

        return false;
      }

      const fareRulesGrouped: Record<
        string,
        Array<{ label: string; text: string }>
      > = {};

      if (fareRuleSheet) {
        const rawFareRuleRows = XLSX.utils.sheet_to_json<(string | number)[]>(
          fareRuleSheet,
          {
            header: 1,
            blankrows: false,
            defval: '',
          }
        );

        rawFareRuleRows.slice(1).forEach((_, index) => {
          const rowIndex = index + 2;
          const airSTT = getCellString(fareRuleSheet, `A${rowIndex}`);
          const ruleTypeLabel = getCellString(fareRuleSheet, `B${rowIndex}`);
          const ruleText = getCellString(fareRuleSheet, `C${rowIndex}`);
          if (airSTT && ruleTypeLabel && ruleText) {
            if (!fareRulesGrouped[airSTT]) {
              fareRulesGrouped[airSTT] = [];
            }
            fareRulesGrouped[airSTT].push({
              label: ruleTypeLabel,
              text: ruleText,
            });
          }
        });
      }

      /**
       * get all rows
       * header: 1 => array[][]
       */
      const rawFlightRows = XLSX.utils.sheet_to_json<(string | number)[]>(
        flightSheet,
        {
          header: 1,
          blankrows: false,
          defval: '',
        }
      );

      const parsedFlights: TParsedFlightFromExcelData[] = [];
      /**
       * skip header rows
       * excel row starts from 1
       * data starts from row 3
       */
      rawFlightRows.slice(2).forEach((_, index) => {
        const rowIndex = index + 3;

        const stt = getCellString(flightSheet, `A${rowIndex}`);

        if (!stt) return;

        const item: TFlightExcelImportRow = {
          stt,
          airlineCode: getCellString(flightSheet, `B${rowIndex}`),
          bookingCode: getCellString(flightSheet, `C${rowIndex}`),
          seatTotal: getCellNumber(flightSheet, `D${rowIndex}`),
          timeLimit: getCellNumber(flightSheet, `E${rowIndex}`),
          closingDaysBeforeDeparture: getCellNumber(
            flightSheet,
            `F${rowIndex}`
          ),
          priceAdult: getCellNumber(flightSheet, `G${rowIndex}`),
          priceChild: getCellNumber(flightSheet, `H${rowIndex}`),
          priceInfant: getCellNumber(flightSheet, `I${rowIndex}`),
          itinerary: getCellString(flightSheet, `J${rowIndex}`),
          departure: {
            date: getCellDateOnly(flightSheet, `K${rowIndex}`),
            time: getCellTimeOnly(flightSheet, `L${rowIndex}`),
            arrDate: getCellDateOnly(flightSheet, `M${rowIndex}`),
            arrTime: getCellTimeOnly(flightSheet, `N${rowIndex}`),
            flightNum: getCellString(flightSheet, `O${rowIndex}`),
            seatClass: getCellString(flightSheet, `P${rowIndex}`),
            plane: getCellString(flightSheet, `Q${rowIndex}`),
          },
          return: {
            date: getCellDateOnly(flightSheet, `R${rowIndex}`),
            time: getCellTimeOnly(flightSheet, `S${rowIndex}`),
            arrDate: getCellDateOnly(flightSheet, `T${rowIndex}`),
            arrTime: getCellTimeOnly(flightSheet, `U${rowIndex}`),
            flightNum: getCellString(flightSheet, `V${rowIndex}`),
            seatClass: getCellString(flightSheet, `W${rowIndex}`),
            plane: getCellString(flightSheet, `X${rowIndex}`),
          },
        };

        const itemFareRules = fareRulesGrouped[item.stt || ''] || [];

        const errors = validateFlightDataImport(item, itemFareRules);
        const isValid = errors.length === 0;

        const payload = isValid
          ? mapFlightDataImportToCreateFlightPayload(item, itemFareRules)
          : null;
        parsedFlights.push({
          id: `${item.stt}-${rowIndex}-${Date.now()}`,
          rowRaw: item,
          rules: itemFareRules,
          errors,
          isValid,
          payload,
        });
      });

      if (parsedFlights.length === 0) {
        toast.error('Không tìm thấy dòng dữ liệu chuyến bay nào trong file.');

        return false;
      }

      setValidatedFlights(parsedFlights.slice(0, 20));
      setStep('PREVIEW');
      toast.success(
        `Đã xử lý xong ${parsedFlights.length > 20 ? 20 : parsedFlights.length} dòng dữ liệu.`
      );
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi đọc tệp Excel');
    }

    return false;
  };

  // Run the batch import mutations
  const handleImportSubmit = async () => {
    const validRecords = validatedFlights.filter(x => x.isValid);
    if (validRecords.length === 0) {
      toast.error('Không có dòng dữ liệu hợp lệ nào để import.');
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    let successCount = 0;
    let failCount = 0;
    const details: TImportResultDetailItem[] = [];

    for (let i = 0; i < validRecords.length; i++) {
      const record = validRecords[i];
      setImportProgress(Math.round((i / validRecords.length) * 100));
      try {
        const payload = record.payload;
        if (!payload) throw new Error('Không có thông tin chuyến bay');
        await createFlightMutationFn({
          payload,
          extraOptions: {
            skipGlobalErrorHandler: true,
          },
        }).unwrap();
        successCount++;
        details.push({ bookingCode: payload.bookingCode, success: true });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        failCount++;
        const errMsg = err?.data?.message || err?.message || 'Lỗi hệ thống';
        details.push({
          bookingCode: record.rowRaw.bookingCode || `STT ${record.rowRaw.stt}`,
          success: false,
          error: errMsg,
        });
      }
    }

    setImportProgress(100);
    setIsImporting(false);
    setImportResults({
      success: successCount,
      fail: failCount,
      details,
    });
    setStep('RESULT');
  };

  return (
    <>
      <PageHelmet title="Import Excel | Kho vé máy bay" />
      <AppPageHeader
        title={
          <span className="flex items-center gap-2">
            <Button
              size={'icon-sm'}
              variant={'ghost'}
              onClick={() => {
                if (step === 'PREVIEW') setStep('UPLOAD');
                else navigate(-1);
              }}
            >
              <ArrowLeftIcon className="size-4" />
            </Button>
            Tạo chuyến bay từ Excel
          </span>
        }
      />

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4 py-6 shadow-xs">
          <Steps
            titlePlacement="vertical"
            current={step === 'UPLOAD' ? 0 : step === 'PREVIEW' ? 1 : 2}
            items={[
              { title: 'Tải tệp tin mẫu & chọn file' },
              { title: 'Xem trước & kiểm tra' },
              { title: 'Hoàn tất import' },
            ]}
          />
        </div>

        {step === 'UPLOAD' && (
          <UploadFileStep handleBeforeUpload={beforeUploadFlightExcel} />
        )}

        {step === 'PREVIEW' && (
          <PreviewDataStep
            importProgress={importProgress}
            validatedFlights={validatedFlights}
            setStep={setStep}
            isImporting={isImporting}
            onImport={handleImportSubmit}
          />
        )}

        {step === 'RESULT' && (
          <ShowResultStep
            importResults={importResults}
            setValidatedFlights={setValidatedFlights}
            setStep={setStep}
          />
        )}
      </div>
    </>
  );
};
