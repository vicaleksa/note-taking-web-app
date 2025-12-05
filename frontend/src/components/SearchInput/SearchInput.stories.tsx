import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import SearchInput from './index';

type StoryProps = ComponentProps<typeof SearchInput>;

const meta: Meta<StoryProps> = {
    component: SearchInput,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        onChange: fn(),
    },
};
