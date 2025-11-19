import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import Modal from './index';

type StoryProps = ComponentProps<typeof Modal>;

const meta: Meta<StoryProps> = {
    component: Modal,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Delete: Story = {
    args: {
        type: 'delete',
        icon: 'delete',
        title: 'Delete Note',
        text: 'Are you sure you want to permanently delete this note? This action cannot be undone.',
        open: true,
        onClose: fn(),
        onAction: fn(),
        actionContent: 'Delete Note',
    },
};

export const Archive: Story = {
    args: {
        type: 'archive',
        icon: 'archive',
        title: 'Archive Note',
        text: `Are you sure you want to archive this note?
            You can find it in the Archived Notes section and restore it anytime.`,
        open: true,
        onClose: fn(),
        onAction: fn(),
        actionContent: 'Archive Note',
    },
};
