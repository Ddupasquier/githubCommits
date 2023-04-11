import type { Meta, StoryObj } from '@storybook/svelte';

import { GithubCommitCalendar } from '$lib';
import { generateRandomContributionData } from './genData';

const meta = {
    title: 'Example/GithubCommitCalendar',
    component: GithubCommitCalendar,
    argTypes: {
        gitToken: {
            control: 'text',
            description: 'A GitHub personal access token with the `repo` scope.'
        },
        size: {
            control: 'text' || 'number',
            description: 'The size of the calendar. Can be a number or a string === ["small", "medium", "large"].'
        },
        color: {
            control: 'color',
            description: 'The color of the calendar.'
        },
        background: {
            control: 'color',
            description: 'The background color of the calendar.'
        },
        gap: {
            control: 'number',
            description: 'The gap between the calendar squares.'
        },
        hover: {
            control: 'boolean',
            description: 'Whether or not to do the hover animation on hover.'
        },
        key: {
            control: 'boolean',
            description: 'Whether or not to show the key.'
        },
        months: {
            control: 'boolean',
            description: 'Whether or not to show the months.'
        },
        weekdays: {
            control: 'boolean',
            description: 'Whether or not to show the weekdays.'
        },
        commitDataOverride: {
            control: 'object',
            description: 'An object that overrides the commit data. This is useful for testing.'
        },
    },
} as Meta<GithubCommitCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        commitDataOverride: generateRandomContributionData(),
    },
    parameters: {
        layout: 'centered',
        docs: {
            source: {
                code: `<GithubCommitCalendar username="username" token="token" repo="repo" />`,
            },
            description: {
                component: 'A component that displays a GitHub commit calendar.',
            }
        }
    }
};
