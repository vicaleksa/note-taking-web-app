const formatDate = (date: string) => {
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    } as const;
    return (new Date(date)).toLocaleDateString(undefined, options);
};

export default formatDate;
