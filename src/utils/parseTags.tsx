const parseTags = (tags: string) => tags.split(',').map((tag) => tag.trim()).filter(Boolean);

export default parseTags;
