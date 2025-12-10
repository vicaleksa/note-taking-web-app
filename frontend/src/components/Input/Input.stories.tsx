import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Input from './index';

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
    component: Input,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        placeholder: 'Placeholder text',
        type: 'email',
        label: 'Label',
        name: 'email',
        errorMessage: 'This is a hint text to help user',
        leftIcon: 'show',
        rightIcon: 'show',
    },
};
