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
        disabled: false,
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        buttonText: 'Delete note',
        disabled: false,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        buttonText: 'Cancel',
        disabled: false,
    },
};

export const IconButton: Story = {
    args: {
        variant: 'iconButton',
        leftIcon: 'archive',
        disabled: false,
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        buttonText: 'Go Back',
        leftIcon: 'arrowLeft',
        disabled: false,
    },
};
export const GhostOnlyIcon: Story = {
    args: {
        variant: 'ghost',
        leftIcon: 'delete',
        disabled: false,
    },
};

export const AccentGhost: Story = {
    args: {
        variant: 'accentGhost',
        buttonText: 'Save Note',
        disabled: false,
    },
};
