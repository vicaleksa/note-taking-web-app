import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Alert from './index';

type StoryProps = ComponentProps<typeof Alert>;

const meta: Meta<StoryProps> = {
    component: Alert,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        text: 'No notes have been archived yet. Move notes here for safekeeping, or create a new note.',
    },
};
