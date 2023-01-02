import { EditableElement, useEditor } from "@editable-jsx/core"
import { usePanel } from "@editable-jsx/panels"
import { Fragment } from "react"
import { ElementControls } from "../ElementControls"
import { useElementObserver } from "../useWatchElement"
import { ElementTransformControls } from "./ElementTransformControls"

export function SelectedElementControls({
  panel: store = "scene",
  order
}: {
  panel?: string
  order?: number
}) {
  const panel = usePanel(store)
  const editor = useEditor()
  const selectedElement = editor.useSelectedElement()
  console.log(selectedElement)
  const isEditorMode = editor.useStates("editing")

  return selectedElement ? (
    <Fragment key={selectedElement.id}>
      <ElementControls
        element={selectedElement}
        store={panel.store}
        order={order}
      />
      <ElementWatcher element={selectedElement} />
      {selectedElement.isObject3D() && isEditorMode ? (
        <ElementTransformControls element={selectedElement} />
      ) : null}
    </Fragment>
  ) : null
}

function ElementWatcher({ element }: { element: EditableElement<any> }) {
  useElementObserver(element)
  return null
}
