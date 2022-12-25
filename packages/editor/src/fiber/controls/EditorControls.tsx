import { CommandBarControls } from "../../commandbar"
import { FloatingPanels } from "../../ui/panels/panel-tunnels"
import { SceneControls } from "./SceneControls"
import { SelectedElementControls } from "./SelectedElementControls"

export function EditorControls() {
  return (
    <>
      <FloatingPanels.Outs />
      <SelectedElementControls store={"properties"} />
      <SceneControls store={"scene"} />
      <CommandBarControls />
    </>
  )
}
