/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
// Types
import "./types.d.ts"

// Styles
import "@/scss/style.scss"

// Import images
function importAll(req: __WebpackModuleApi.RequireContext) {
  let files: { [prop: string]: any } = {}
  req.keys().map(item => { files[item.replace("./", "")] = req(item) })
  return files
}

importAll(require.context("@/img/", false, /\.(png|jpg|jpeg|svg|gif|mp4|webp|webm)$/))

// Redux
import { AppStore, setupStore } from "./store/setupStore"
import { saveState } from "./store/localStorage"

export const store: AppStore = setupStore()

store.subscribe(() => {
  const state = {...store.getState()}
  saveState(state)
})

//========================================================================================================================================================
//====NATIVE====================================================================================================================================================
//========================================================================================================================================================

// import "./native/native"

//========================================================================================================================================================
//====REACT====================================================================================================================================================
//========================================================================================================================================================

import { render } from "./react/App"

render({ store })