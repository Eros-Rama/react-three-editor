import { StoreType } from "leva/dist/declarations/src/types"
import { Fragment } from "react"
import { ElementControls } from "../../editable/controls/useElementControls"
import { EditableElement } from "../../editable/EditableElement"
import { useEditorStore } from "../../editable/Editor"
import { useElementObserver } from "../useWatchElement"
import { ElementTransformControls } from "./ElementTransformControls"
import { usePanel } from "./Panel"

export function SelectedElementControls({
  store = "scene",
  order
}: {
  store?: StoreType | string
  order?: number
}) {
  const panel = usePanel(store)
  const selectedElement = useEditorStore((state) =>
    state.selectedId ? state.elements[state.selectedId] : null
  )

  return selectedElement ? (
    <Fragment key={selectedElement.id}>
      <ElementControls
        element={selectedElement}
        store={panel.store}
        order={order}
      />
      <ElementWatcher element={selectedElement} />
      {selectedElement.isObject3D() ? (
        <ElementTransformControls element={selectedElement} />
      ) : null}
    </Fragment>
  ) : null
}

function ElementWatcher({ element }: { element: EditableElement<any> }) {
  useElementObserver(element)
  return null
}