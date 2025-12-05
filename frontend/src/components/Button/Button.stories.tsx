import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import Button from './index';

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
    component: Button,
    args: {
        onClick: fn(),
    },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        buttonText: 'New note',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        buttonText: 'Delete note',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        buttonText: 'Cancel',
    },
};

export const IconButton: Story = {
    args: {
        variant: 'iconButton',
        leftIcon: 'archive',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        buttonText: 'Go Back',
        leftIcon: 'arrowLeft',
    },
};
export const GhostOnlyIcon: Story = {
    args: {
        variant: 'ghost',
        leftIcon: 'delete',
    },
};

export const AccentGhost: Story = {
    args: {
        variant: 'accentGhost',
        buttonText: 'Save Note',
    },
};
