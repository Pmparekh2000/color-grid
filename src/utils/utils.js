export const getGrid = (rows, columns) => {
    return Array.from({length: rows}, () => {
        return Array.from({length: columns}, () => {
            return false;
        });
    });
};
