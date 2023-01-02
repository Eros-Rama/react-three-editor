import { useEditor } from "@editable-jsx/core"
import { usePanel } from "@editable-jsx/panels"
import { useControls } from "leva"
import { tree } from "../../ui/leva/tree/tree"

export function SceneControls({
  panel: store = "scene",
  order
}: {
  panel?: string
  order?: number
}) {
  const editor = useEditor()
  const panel = usePanel(store)
  const [p] = editor.store((state) => [state.elements[editor.rootId]])
  const items: Record<string, any> = {}
  p?.children.forEach((v) => {
    items[v.id] = v
  })

  editor.useSettings("scene", {
    fontSize: {
      value: 12,
      step: 1,
      onChange(e) {
        document.body.style.setProperty("--leva-tree-font-size", e + "px")
      }
    },
    verticalSpacing: {
      value: 0.5,
      step: 0.1,
      min: 0.1,
      max: 2,
      onChange(e) {
        document.body.style.setProperty(
          "--leva-tree-vertical-spacing",
          e + "em"
        )
      }
    }
  })

  useControls(
    {
      scene: tree({
        items,
        scrollable: false,
        order: order
      })
    },
    { store: panel.store },
    [items, order]
  )

  return null
}
