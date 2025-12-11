import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import LinkButton from './index';
import IconArrowLeft from '../Icons/IconArrowLeft';

type StoryProps = ComponentProps<typeof LinkButton>;

const meta: Meta<StoryProps> = {
    component: LinkButton,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        variant: 'accent',
    },
    render: ({ ...args }) => (
        <LinkButton {...args}>
            <IconArrowLeft />
            Signin
        </LinkButton>
    ),
};
