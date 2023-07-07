import type { Meta, StoryObj } from '@storybook/react'

import C64Chat from '../components/App'
import '../../dist/index.css'
const meta = {
  title: 'C64Chat',
  component: C64Chat,
  tags: ['autodocs'],
  argTypes: {
    helpColor: { control: 'color' },
    mainColor: { control: 'color' },
    hoverColor: { control: 'color' },
  },
} satisfies Meta<typeof C64Chat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    helpColor: '#F16963',
  },
}
