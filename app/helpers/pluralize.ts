export function pluralize(number: number, singular: string, plural: string): string {
    return number > 1 ? `${ number } ${plural}` : `${ number } ${singular}`;
}