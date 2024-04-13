import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export default CommentToolbarPlugin = Extension.create({
  name: "CommentToolbarPlugin",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("CommentToolbarPlugin"),
        props: {
          handleClick(view, pos, event) {
            // console.log("Clicked");
          },
          handleDoubleClick(view, pos, event) {
            // console.log("Double Clicked");
          },
          handlePaste(view, event, slice) {
            // console.log("Paste");
          },
          handleDOMEvents: {
            mouseenter: (view, event) => {
                // console.log("Mouse enter")
                console.log("Mouse entered")
            },
            mouseleave: (view, event) => {
                // console.log("Mouse enter")
            },
          }
        },
      }),
    ];
  },
});
