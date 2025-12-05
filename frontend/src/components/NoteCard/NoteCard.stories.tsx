import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import NoteCard from './index';

type StoryProps = ComponentProps<typeof NoteCard>;

const meta: Meta<StoryProps> = {
    component: NoteCard,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        title: 'React Performance Optimization',
        tags: ['Dev', 'React'],
        date: 'Wed Jul 28 2025 14:39:07 GMT+0200 (CEST)',
    },
};
