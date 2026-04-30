export interface Note {
    id: string,
    title: string,
    tags: Array<string>,
    content: string,
    lastEdited: string,
    isArchived: boolean;
}

export interface FormDataType {
    title: string,
    tags: string,
    content: string,
}
