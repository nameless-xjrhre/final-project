import { ComponentStory, ComponentMeta } from '@storybook/react'

import SignIn from './SignIn'

export default {
  title: 'Components/SignIn',
  component: SignIn,
} as ComponentMeta<typeof SignIn>

const Template: ComponentStory<typeof SignIn> = () => <SignIn />

export const Default = Template.bind({})
