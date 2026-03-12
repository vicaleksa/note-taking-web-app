const parseTags = (tags: string) => tags.split(',').map((tag) => tag.trim().toLowerCase()).filter(Boolean);

export default parseTags;
