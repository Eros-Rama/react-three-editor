import { EditableContext, EditorContext, useEditor } from "@editable-jsx/core"
import { Canvas as FiberCanvas, Props } from "@react-three/fiber"
import { forwardRef, Suspense } from "react"
import { Toaster } from "react-hot-toast"
import { CommandBar } from "../commandbar"
import { AllCommands } from "../commands"
import { JSXSource } from "../types"
import { Outs } from "../ui/tunnel"
import { createMultiTunnel } from "../ui/tunnels"
import { CameraBounds } from "./CameraBounds"
import { EditorCamera } from "./controls/EditorCamera"
import { EditorControls } from "./controls/EditorControls"
import { EditorPanels } from "./controls/EditorPanels"
import { editor } from "./editor"
import { PanelGroup } from "./PanelGroup"
export const editorTunnel = createMultiTunnel()
export const Editor = editorTunnel.In
export type CanvasProps = Props & { _source: JSXSource }

export const EditorCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (props, ref) => {
    // @ts-ignore
    window.editor = editor

    return (
      <div
        style={{
          display: "contents"
        }}
      >
        <EditorContext.Provider value={editor}>
          <EditorPanels />
          <AllCommands />
          <div
            style={{
              display: "flex",
              height: "100vh",
              flexDirection: "row",
              width: "100vw"
            }}
          >
            <PanelGroup side="left" />
            <EditableCanvas {...props} ref={ref} />
            <PanelGroup side="right" />
          </div>
          <CommandBar />
          <Toaster />
          <Outs />
        </EditorContext.Provider>
      </div>
    )
  }
)

const EditableCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  function EditableCanvas(props, ref) {
    const store = useEditor()
    const [settings] = store.useSettings("scene", {
      shadows: {
        value: true
      }
    })

    const [editableElement, { children, ...overrideProps }] = editor.useElement(
      "canvas",
      {
        ...props,
        id: "root"
      }
    )

    editableElement.index = "0"
    editor.rootId = editableElement.id
    return (
      <FiberCanvas
        ref={ref}
        onPointerMissed={(e: any) => {
          store.clearSelection()
        }}
        {...overrideProps}
        {...settings}
      >
        <EditorContext.Provider value={store}>
          <EditorCamera />
          <CameraBounds>
            <Suspense>
              <EditableContext.Provider value={editableElement}>
                {children}
              </EditableContext.Provider>
            </Suspense>
          </CameraBounds>
          <editorTunnel.Outs fallback={<EditorControls />} />
        </EditorContext.Provider>
      </FiberCanvas>
    )
  }
)
