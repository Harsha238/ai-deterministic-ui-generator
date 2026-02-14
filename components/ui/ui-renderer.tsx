"use client"

import { UIComponents } from "./ui-components"

export function UIRenderer({ node }: any) {

  if (!node) return null

  const Component =
    UIComponents[node.type as keyof typeof UIComponents]

  if (!Component) {

    return (
      <div>
        Unknown component: {node.type}
      </div>
    )

  }

  return (

    <Component {...node.props}>

      {node.children?.map((child: any) => (

        <UIRenderer
          key={child.id}
          node={child}
        />

      ))}

    </Component>

  )

}
