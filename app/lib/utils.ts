export function format_serial_number(length: number, index: number) {
    return index.toString().padStart(length, "0");
}
