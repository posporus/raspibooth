import { ComponentChildren } from "preact"



interface StoryProps {
  children: ComponentChildren
}

export function Story (props: StoryProps) {
  const { children } = props
  return (
    <>
      {children}
    </>
  )
}
