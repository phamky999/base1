import { FARE_RULE_TYPE_LABEL } from '@/features/flight-management/constants';
import ExcelJS from 'exceljs';

export const generateFlightTemplateExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'VietAn';
  workbook.created = new Date();

  // COLORS
  const HEADER_BG = 'E6F4FF';
  const BORDER_COLOR = '000000';

  // COMMON STYLE
  const borderBase = {
    top: {
      style: 'thin' as const,
      color: { argb: BORDER_COLOR },
    },
    left: {
      style: 'thin' as const,
      color: { argb: BORDER_COLOR },
    },
    bottom: {
      style: 'thin' as const,
      color: { argb: BORDER_COLOR },
    },
    right: {
      style: 'thin' as const,
      color: { argb: BORDER_COLOR },
    },
  };

  const centerAlignmentBase = {
    vertical: 'middle' as const,
    horizontal: 'center' as const,
    wrapText: true,
  };

  const applyHeaderStyle = (cell: ExcelJS.Cell) => {
    cell.font = {
      bold: true,
      color: { argb: '000000' },
      size: 11,
      name: 'Times New Roman',
    };

    cell.alignment = centerAlignmentBase;

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: HEADER_BG },
    };

    cell.border = borderBase;
  };

  // SHEET 1 - DANH SÁCH CHUYẾN BAY
  const flightSheet = workbook.addWorksheet('Danh sách chuyến bay', {
    views: [{ state: 'frozen', ySplit: 2 }],
  });
  flightSheet.mergeCells('A1:A2');
  flightSheet.mergeCells('B1:B2');
  flightSheet.mergeCells('C1:C2');
  flightSheet.mergeCells('D1:D2');
  flightSheet.mergeCells('E1:E2');
  flightSheet.mergeCells('F1:F2');
  flightSheet.mergeCells('G1:G2');
  flightSheet.mergeCells('H1:H2');
  flightSheet.mergeCells('I1:I2');
  flightSheet.mergeCells('J1:J2');

  // Merge SEGMENT
  flightSheet.mergeCells('K1:Q1');
  flightSheet.mergeCells('R1:X1');

  // ROW 1
  flightSheet.getCell('A1').value = 'STT';
  flightSheet.getCell('B1').value = 'Mã hãng';
  flightSheet.getCell('C1').value = 'Mã đặt chỗ';
  flightSheet.getCell('D1').value = 'Số Ghế';
  flightSheet.getCell('E1').value = 'Thời gian giữ chỗ (phút)';
  flightSheet.getCell('F1').value = 'Đóng bán trước (ngày)';
  flightSheet.getCell('G1').value = 'Giá người lớn';
  flightSheet.getCell('H1').value = 'Giá trẻ em';
  flightSheet.getCell('I1').value = 'Giá em bé';
  flightSheet.getCell('J1').value = 'Hành trình';
  flightSheet.getCell('K1').value = 'Chiều đi';
  flightSheet.getCell('R1').value = 'Chiều về';

  // ROW 2 CHIỀU ĐI
  flightSheet.getCell('K2').value = 'Ngày khởi hành';
  flightSheet.getCell('L2').value = 'Giờ khởi hành';
  flightSheet.getCell('M2').value = 'Ngày hạ cánh';
  flightSheet.getCell('N2').value = 'Giờ hạ cánh';
  flightSheet.getCell('O2').value = 'Số hiệu';
  flightSheet.getCell('P2').value = 'Hạng ghế';
  flightSheet.getCell('Q2').value = 'Loại máy bay';

  // ROW 2 CHIỀU VỀ
  flightSheet.getCell('R2').value = 'Ngày khởi hành';
  flightSheet.getCell('S2').value = 'Giờ khởi hành';
  flightSheet.getCell('T2').value = 'Ngày hạ cánh';
  flightSheet.getCell('U2').value = 'Giờ hạ cánh';
  flightSheet.getCell('V2').value = 'Số hiệu';
  flightSheet.getCell('W2').value = 'Hạng ghế';
  flightSheet.getCell('X2').value = 'Loại máy bay';

  // APPLY STYLE
  for (let row = 1; row <= 2; row++) {
    flightSheet.getRow(row).eachCell(cell => {
      applyHeaderStyle(cell);
    });
  }

  const sampleRows = [
    [
      'FL001',
      'VN',
      'V12345',
      10,
      15,
      2,
      1500000,
      1200000,
      500000,
      'HANSGNHAN',
      //   chiều đi
      '12/06/2026',
      '10:00',
      '12/06/2026',
      '12:00',
      'VN123',
      'Y',
      'Airbus 321',
      // chiêu về
      '15/06/2026',
      '10:00',
      '15/06/2026',
      '12:00',
      'VN124',
      'Y',
      'Airbus 321',
    ],
  ];

  sampleRows.forEach(row => {
    const addedRow = flightSheet.addRow(row);

    addedRow.eachCell(cell => {
      cell.border = borderBase;

      cell.alignment = centerAlignmentBase;
    });
  });

  // ROW HEIGHT
  flightSheet.getRow(1).height = 28;
  flightSheet.getRow(2).height = 42;

  // COLUMN WIDTH
  flightSheet.columns = [
    { width: 8 }, // A
    { width: 10 }, // B
    { width: 10 }, // C
    { width: 10 }, // D
    { width: 15 }, // E
    { width: 15 }, // F
    { width: 15 }, // G
    { width: 15 }, // H
    { width: 15 }, // I
    { width: 15 }, // J
    { width: 15 }, // K
    { width: 15 }, // L
    { width: 15 }, // M
    { width: 15 }, // N
    { width: 10 }, // O
    { width: 10 }, // P
    { width: 15 }, // Q
    { width: 15 }, // R
    { width: 15 }, // S
    { width: 15 }, // T
    { width: 15 }, // U
    { width: 10 }, // V
    { width: 10 }, // W
    { width: 15 }, // X
  ];

  // SHEET 2 - DANH SÁCH BỘ ĐIỀU KIỆN
  const fareRuleSheet = workbook.addWorksheet('Danh sách bộ điều kiện', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  const fareRuleHeaders = ['Mã chuyến bay', 'Loại điều kiện', 'Nội dung'];

  fareRuleSheet.addRow(fareRuleHeaders);

  fareRuleSheet.columns = [{ width: 24 }, { width: 32 }, { width: 60 }];

  fareRuleSheet.getRow(1).eachCell(cell => {
    applyHeaderStyle(cell);
  });

  const fareRuleOptions = Object.values(FARE_RULE_TYPE_LABEL).join(',');

  for (let row = 2; row <= 1000; row++) {
    fareRuleSheet.getCell(`A${row}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ["'Danh sách chuyến bay'!$A$3:$A$1000"],
      showErrorMessage: true,
      errorStyle: 'stop',
      errorTitle: 'Giá trị không hợp lệ',
      error: 'Vui lòng chọn mã chuyến bay từ danh sách',
    };

    fareRuleSheet.getCell(`B${row}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${fareRuleOptions}"`],
      showErrorMessage: true,
      errorStyle: 'stop',
      errorTitle: 'Giá trị không hợp lệ',
      error: 'Vui lòng chọn loại điều kiện từ danh sách',
    };
  }

  fareRuleSheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    row.eachCell(cell => {
      cell.border = borderBase;

      cell.alignment = centerAlignmentBase;
    });
  });

  // SHEET 3 - HƯỚNG DẪN
  const instructionSheet = workbook.addWorksheet('Hướng dẫn nhập thông tin');

  instructionSheet.columns = [{ width: 50 }, { width: 200 }];

  instructionSheet.addRows([
    ['Mục', 'Hướng dẫn'],

    [
      'Danh sách chuyến bay - STT',
      'Người dùng tự định nghĩa, dữ liệu người dùng nhập sẽ được dùng làm đầu vào của cột "Mã chuyến bay" trong sheet 2 để cài đặt bộ điều kiện cho các chuyến bay có STT tương ứng',
    ],

    ['Danh sách chuyến bay - Mã hãng', 'Nhập mã hãng hàng không'],

    [
      'Danh sách chuyến bay - Thời gian giữ chỗ',
      'Nhập thời gian giữ chỗ tối đa của 1 đơn hàng (Đơn vị: Phút)',
    ],

    [
      'Danh sách chuyến bay - Đóng bán trước (ngày)',
      'Số ngày trước thời gian khởi hành mà hệ thống sẽ tự động đóng bán vé máy bay  (Đơn vị: Ngày)',
    ],

    [
      'Danh sách chuyến bay - Hành trình',
      'Nhập liên tục các mã sân bay lần lượt theo chiều đi, chiều về. Ví dụ: HANSGN, HOẶC HANSGNHAN',
    ],

    [
      'Định dạng ngày',
      'Vui lòng nhập đúng định dạng [ngày/tháng/năm]. Ví dụ: 12/5/2026, hoặc 12/05/2026',
    ],

    [
      'Định dạng thời gian',
      'Vui lòng nhập đúng định dạng [giờ:phút] (24h). Ví dụ: 10:00, hoặc 22:30',
    ],

    [
      'Danh sách bộ điều kiện',
      'Nhập các điều kiện của chuyến bay, có thể bỏ qua và cập nhật sau trên hệ thống',
    ],

    ['Lưu ý', 'Không xóa tiêu đề cột hoặc đổi tên sheet'],
  ]);

  instructionSheet.getRow(1).eachCell(cell => {
    applyHeaderStyle(cell);
  });

  instructionSheet.eachRow(row => {
    row.eachCell(cell => {
      cell.border = borderBase;
    });
  });

  // EXPORT
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = `flight-template-${Date.now()}.xlsx`;

  document.body.appendChild(a);

  a.click();

  a.remove();

  window.URL.revokeObjectURL(url);
};
