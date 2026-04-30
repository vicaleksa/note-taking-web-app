interface ApiTag {
    id: number,
    name: string,
}

export interface ApiNote {
    id: number,
    title: string,
    tags: Array<ApiTag>,
    content: string,
    lastEdited: string,
    isArchived: boolean,
}
