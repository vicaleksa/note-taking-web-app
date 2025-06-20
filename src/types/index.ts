interface Note {
    id: string,
    title: string,
    tags: Array<string>,
    content: string,
    lastEdited: string,
    isArchived: boolean;
}

export interface StoredData {
    notes: Array<Note>
}
