import * as XLSX from "xlsx";

export const handleDownload = (totalSinIva:string,
                               conIva:string) => {
    const data = [
        ["precio sin iva", totalSinIva],
        ["total", conIva],
    ];
    if (!XLSX) {
        alert('Not object found')
        return;
    }
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
};