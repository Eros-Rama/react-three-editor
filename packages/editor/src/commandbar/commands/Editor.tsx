import { FC, useEffect } from "react"
import { Group, Mesh } from "three"
import { EditableElement, useEditor } from "../../editable"
import { ThreeEditor } from "../../fiber/ThreeEditor"
import { CommandType } from "../types"

export const EditorCommands: FC = () => {
  const editor = useEditor()
  useEffect(() => {
    const commands: CommandType[] = [
      {
        name: "toggle-play-mode",
        type: "command",
        description(editor) {
          return `Go to ${
            editor.state.matches("editing") ? "Play" : "Editor"
          } mode`
        },
        shortcut: ["meta", "e"],
        execute(editor) {
          editor.send("TOGGLE_MODE")
        }
      },
      {
        name: "isolate",
        description: "Isolate element",
        type: "command",
        shortcut: ["meta", "f"],
        execute(editor) {
          let el = editor.root
          let selectedElement = editor.selectedElement
          let selected = selectedElement?.treeId

          function show(c: EditableElement) {
            if (c.ref instanceof Mesh || c.ref instanceof Group) {
              c.visible = true
            } else {
              for (var d of c.children) {
                show(d)
              }
            }
          }

          function hide(c: EditableElement) {
            if (c.ref instanceof Mesh || c.ref instanceof Group) {
              c.visible = false
            } else {
              for (var d of c.children) {
                hide(d)
              }
            }
          }

          function focus(c: EditableElement, selected: string) {
            if (!selected.startsWith(c.treeId)) {
              hide(c)
            } else if (selected === c.treeId) {
            } else {
              for (var d of c.children) {
                focus(d, selected)
              }
            }
          }

          if (selected) {
            show(el)
            for (var child of el.children) {
              focus(child, selected)
            }
          }
          ;(editor as ThreeEditor).bounds.refresh(selectedElement?.ref).fit()
        }
      },
      {
        name: "save-selected-element",
        description: "Save selected element",
        type: "command",
        execute(editor) {
          editor.selectedElement?.save()
        }
      },
      {
        name: "clear-local-storage",
        description: "Clear local storage",
        type: "command",
        execute(editor) {
          localStorage.clear()
        }
      },
      {
        name: "insert-element",
        description: "Insert element into the scene",
        type: "command"
      },
      // {
      //   name: "duplicate-element",
      //   description: "Duplicate element",
      //   execute(editor) {
      //     element.selectedElement.refs.setMoreChildren?.((children) => [
      //       ...children,
      //       createElement(editable[componentType], {
      //         _source: {
      //           ...element.source,
      //           lineNumber: -1,
      //           elementName: componentType
      //         },
      //         key: children.length
      //       })
      //     ])
      // },
      {
        name: "remove-element",
        description: "Remove element from the scene",
        type: "command"
      }
    ]
    editor.commands.registerCommands(commands)
    return () => {
      editor.commands.unregisterCommands(commands)
    }
  }, [editor])
  return null
}
