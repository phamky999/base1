import { AppDrawer } from '@/components/app-drawer';
import { AppTable } from '@/components/app-table';
import { AppTooltip } from '@/components/app-tooltip';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FARE_RULE_TYPE_LABEL } from '@/features/flight-management/constants';
import { getFareRuleType } from '@/features/flight-management/helper/validate-flight-data-import-';
import type { TParsedFlightFromExcelData } from '@/features/flight-management/types';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { Descriptions, Progress, Tag, type TableProps } from 'antd';
import {
  AlertTriangleIcon,
  CheckIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
} from 'lucide-react';
import { useState } from 'react';

type PreviewDataStepProps = {
  validatedFlights: TParsedFlightFromExcelData[];
  setStep: React.Dispatch<
    React.SetStateAction<'UPLOAD' | 'PREVIEW' | 'RESULT'>
  >;
  isImporting: boolean;
  importProgress: number;
  onImport: () => Promise<void>;
};

export const PreviewDataStep = ({
  validatedFlights,
  setStep,
  isImporting,
  onImport,
  importProgress,
}: PreviewDataStepProps) => {
  const [filterType, setFilterType] = useState<'ALL' | 'VALID' | 'INVALID'>(
    'ALL'
  );

  const [conditionDrawer, setConditionDrawer] = useState<{
    open: boolean;
    rules: { label: string; text: string }[];
    bookingCode?: string;
  }>({ open: false, rules: [] });

  const totalCount = validatedFlights.length;
  const validCount = validatedFlights.filter(x => x.isValid).length;
  const invalidCount = totalCount - validCount;
  const filteredFlights = validatedFlights.filter(item => {
    if (filterType === 'VALID') return item.isValid;
    if (filterType === 'INVALID') return !item.isValid;
    return true;
  });

  const columns: TableProps<TParsedFlightFromExcelData>['columns'] = [
    {
      title: 'Trạng thái',
      dataIndex: 'isValid',
      key: 'isValid',
      width: 130,
      render: (isValid: boolean, record: TParsedFlightFromExcelData) => {
        if (isValid) {
          return (
            <Tag
              variant="outlined"
              color="blue"
              className="flex w-max items-center gap-1 px-2.5 py-1 text-xs font-semibold"
            >
              <CheckIcon className="size-3.5" /> Hợp lệ
            </Tag>
          );
        }
        return (
          <AppTooltip
            content={
              <div className="max-h-60 space-y-1.5 overflow-y-auto p-1">
                <p>Danh sách lỗi ({record.errors.length}):</p>
                {record.errors.map((err: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-1 text-[11px] leading-relaxed"
                  >
                    <span>•</span> <span>{err}</span>
                  </div>
                ))}
              </div>
            }
          >
            <Tag
              color="error"
              variant="outlined"
              className="flex w-max items-center gap-1 px-2.5 py-1 text-xs font-semibold"
            >
              <AlertTriangleIcon className="size-3.5" /> {record.errors.length}{' '}
              lỗi
            </Tag>
          </AppTooltip>
        );
      },
    },
    {
      title: 'STT',
      dataIndex: ['rowRaw', 'stt'],
      key: 'stt',
      width: 80,
      render: (text: string) => (
        <span className="text-xs font-bold">{text}</span>
      ),
    },
    {
      title: 'Hãng',
      key: 'airlineCode',
      dataIndex: ['rowRaw', 'airlineCode'],
      width: 100,
      render: (text: string) => (
        <span className="text-xs font-bold">{text}</span>
      ),
    },
    {
      title: 'Mã đặt chỗ',
      key: 'bookingCode',
      dataIndex: ['rowRaw', 'bookingCode'],
      width: 120,
      render: (text: string) => (
        <span className="text-xs font-bold">{text}</span>
      ),
    },
    {
      title: 'Hành trình',
      key: 'itinerary',
      width: 140,
      render: (record: TParsedFlightFromExcelData) => {
        const it = String(record.rowRaw.itinerary || '').toUpperCase();
        const isRT =
          it.length >= 6 && it.substring(0, 3) === it.substring(it.length - 3);
        return (
          <div className="space-y-1">
            <div className="text-xs font-bold tracking-wider">
              {it || 'N/A'}
            </div>
            {it.length >= 6 ? (
              <Tag
                color={isRT ? 'geekblue' : 'orange'}
                className="rounded border-0 px-1.5 py-0 text-[10px] font-medium"
              >
                {isRT ? 'Khứ hồi' : 'Một chiều'}
              </Tag>
            ) : null}
          </div>
        );
      },
    },
    {
      title: 'Chiều đi',
      key: 'departure',
      width: 200,
      render: (record: TParsedFlightFromExcelData) => {
        const data = record?.rowRaw?.departure;

        if (!data?.date && !data?.flightNum)
          return (
            <span className="text-xs text-gray-400 italic">
              Không có thông tin
            </span>
          );
        return (
          <div className="space-y-1 py-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold">{data?.flightNum || 'N/A'}</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono font-bold">
                {data?.seatClass || 'N/A'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-bold">{data?.plane || 'N/A'}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <PlaneTakeoffIcon className="size-3.5 shrink-0 text-gray-400" />
                <strong>
                  {data?.time} {data?.date}
                </strong>
              </div>
              <div className="flex items-center gap-1.5">
                <PlaneLandingIcon className="size-3.5 shrink-0 text-gray-400" />
                <strong>
                  {data?.arrTime} {data?.arrDate}
                </strong>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Chiều về',
      key: 'return',
      width: 200,
      render: (record: TParsedFlightFromExcelData) => {
        const row = record.rowRaw;
        const it = String(row.itinerary || '').toUpperCase();
        const isRT =
          it.length >= 6 && it.substring(0, 3) === it.substring(it.length - 3);

        if (!isRT) {
          return (
            <span className="text-xs font-semibold text-slate-300">-</span>
          );
        }

        const data = record?.rowRaw?.return;

        if (!data?.date && !data?.flightNum) {
          return (
            <span className="flex w-max items-center gap-1 rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-500 italic">
              <AlertTriangleIcon className="size-3.5" /> Thiếu chiều về
            </span>
          );
        }

        return (
          <div className="space-y-1 py-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold">{data?.flightNum || 'N/A'}</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono font-bold">
                {data?.seatClass || 'N/A'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-bold">{data?.plane || 'N/A'}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <PlaneTakeoffIcon className="size-3.5 shrink-0 text-gray-400" />
                <strong>
                  {data?.time} {data?.date}
                </strong>
              </div>
              <div className="flex items-center gap-1.5">
                <PlaneLandingIcon className="size-3.5 shrink-0 text-gray-400" />
                <strong>
                  {data?.arrTime} {data?.arrDate}
                </strong>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Số Ghế',
      key: 'seatTotal',
      width: 80,
      render: (record: TParsedFlightFromExcelData) => {
        const row = record.rowRaw;

        return <span className="font-bold">{row.seatTotal || 0}</span>;
      },
    },
    {
      title: 'Giá',
      key: 'prices',
      width: 200,
      render: (record: TParsedFlightFromExcelData) => {
        const row = record.rowRaw;

        return (
          <div className="space-y-1 py-1 text-xs">
            <div className="flex flex-col gap-0.5 text-xs text-gray-400">
              <span className="flex justify-between gap-1.5">
                <span>Người lớn:</span>{' '}
                <strong className="text-foreground">
                  {formatDisplayCurrency(Number(row?.priceAdult ?? 0))}
                </strong>
              </span>
              <span className="flex justify-between gap-1.5">
                <span>Trẻ em:</span>{' '}
                <strong className="text-foreground">
                  {formatDisplayCurrency(Number(row?.priceChild ?? 0))}
                </strong>
              </span>
              <span className="flex justify-between gap-1.5">
                <span>Em bé:</span>{' '}
                <strong className="text-foreground">
                  {formatDisplayCurrency(Number(row?.priceInfant ?? 0))}
                </strong>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Bộ điều kiện',
      key: 'conditions',
      width: 140,
      render: (record: TParsedFlightFromExcelData) => {
        const rules = record.rules || [];
        if (rules.length === 0)
          return (
            <span className="text-xs text-gray-400 italic">
              Không có điều kiện
            </span>
          );
        return (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 px-2.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
            onClick={() =>
              setConditionDrawer({
                open: true,
                rules,
                bookingCode: record.rowRaw?.bookingCode,
              })
            }
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Table Filtering & Main Container */}
      <div className="card lg:p-6">
        <div className="mb-5 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-sm font-bold">Danh sách dữ liệu xem trước</h4>
            <p className="mt-0.5 text-xs text-gray-400">
              Vui lòng rà soát lại thông tin trước khi thực hiện import chính
              thức.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <span className="mr-1 text-xs font-semibold text-gray-400">
              Bộ lọc:
            </span>
            <Tabs value={filterType}>
              <TabsList>
                <TabsTrigger
                  className="text-xs"
                  value="ALL"
                  onClick={() => setFilterType('ALL')}
                >
                  Tất cả ({totalCount})
                </TabsTrigger>
                <TabsTrigger
                  className="text-xs"
                  value="VALID"
                  onClick={() => setFilterType('VALID')}
                >
                  Hợp lệ ({validCount})
                </TabsTrigger>
                <TabsTrigger
                  className="text-xs"
                  value="INVALID"
                  onClick={() => setFilterType('INVALID')}
                >
                  Không hợp lệ ({invalidCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <AppTable
            dataSource={filteredFlights}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>

        {/* Actions panel */}
        <div className="mt-6 flex items-center justify-between rounded-lg border bg-muted p-4">
          <Button
            variant="outline"
            onClick={() => setStep('UPLOAD')}
            disabled={isImporting}
            className="text-xs"
          >
            Chọn file khác
          </Button>

          <div className="flex items-center gap-4">
            {invalidCount > 0 && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                <AlertTriangleIcon className="size-4 shrink-0" />
                <span>
                  Có {invalidCount} dòng lỗi sẽ được bỏ qua. Hệ thống chỉ import{' '}
                  {validCount} dòng hợp lệ.
                </span>
              </div>
            )}
            <Button
              onClick={onImport}
              disabled={isImporting || validCount === 0}
              loading={isImporting}
              className="min-w-32 bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700"
            >
              Import {validCount} chuyến bay
            </Button>
          </div>
        </div>
      </div>

      {/* Importing Progress overlay */}
      {isImporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 text-center shadow-xs">
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Đang import dữ liệu...</h3>
              <p className="text-xs text-gray-400">
                Vui lòng không đóng trình duyệt lúc này.
              </p>
            </div>

            <div className="py-2">
              <Progress
                percent={importProgress}
                strokeColor="#1447e6"
                status="active"
              />
            </div>

            <p className="text-xs font-medium text-gray-400">
              Đã hoàn thành {Math.round((importProgress / 100) * validCount)} /{' '}
              {validCount} chuyến bay hợp lệ
            </p>
          </div>
        </div>
      )}

      {/* Drawer chi tiết bộ điều kiện */}
      <AppDrawer
        title={`Bộ điều kiện vé ${conditionDrawer.bookingCode} `}
        open={conditionDrawer.open}
        onOpenChange={open => setConditionDrawer(prev => ({ ...prev, open }))}
      >
        <Descriptions bordered column={1} className="rounded-lg shadow-xs">
          {conditionDrawer.rules.map((rule, index) => {
            const ruleType = getFareRuleType(rule.label);

            if (!ruleType) return null;
            return (
              <Descriptions.Item
                key={index}
                label={FARE_RULE_TYPE_LABEL[ruleType]}
                styles={{
                  label: {
                    width: 180,
                  },
                }}
              >
                {rule.text}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </AppDrawer>
    </div>
  );
};
