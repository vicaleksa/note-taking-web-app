import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import RadioItem from './index';

type StoryProps = ComponentProps<typeof RadioItem>;

const meta: Meta<StoryProps> = {
    component: RadioItem,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const ColorTheme: Story = {
    args: {
        name: 'colorTheme',
        value: 'system',
        title: 'System',
        description: 'Adapts to your device’s theme',
        icon: 'sunAndMoon',
        checked: false,
        onChange: fn(),
    },
};
