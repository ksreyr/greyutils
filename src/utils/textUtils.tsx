export function getInfoFromText(text: string) {
    const lines = text.split("-")
    const discriminacionLine = lines.find(line => line.includes("Discriminación Tarifas de IVA"))
    const fechaLine = lines.find(line => line.includes("Fecha"))

    if (discriminacionLine && fechaLine) {
        const dateInText = fechaLine.split(" ")[13].split('/');
        // @ts-ignore
        const date = new Date(dateInText[2], dateInText[1] - 1, dateInText[0]).toISOString();
        const lines = discriminacionLine.split(" ")
        const sinIva = lines[lines.length - 2];
        const conIva = lines[lines.length - 1];
        return {
            totalSinIva: sinIva,
            conIva,
            date,
        }

    } else {
        alert("No se encontró datos requeridos para la creacion - verifique el pdf")
        return {
            totalSinIva: '',
            conIva: '',
            date: ''
        };
    }
}