export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const generateUniqueId = (): string => {
    return 'id-' + Math.random().toString(36).substr(2, 9);
};

export const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || value === '';
};