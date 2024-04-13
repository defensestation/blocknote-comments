import "./App.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { BlockNoteSchema, defaultStyleSpecs } from "@blocknote/core";
import { comment } from "../lib/comment-style-spec";
import {CustomFormattingToolbar} from "./CustomFormattingToolbar"
import { CommentToolbarController } from "../lib/components/CommentToolbar/CommentToolbarController";

const customStyleSpecs = {
  ...defaultStyleSpecs,
  comment,
};

export default () => {
  const blockSchema = BlockNoteSchema.create({
    styleSpecs: customStyleSpecs,
  });

  const editor = useCreateBlockNote({
    schema: blockSchema,
    initialContent: [
      {
          "id": "26de9ad9-8814-4633-8a02-4a6502da3ecf",
          "type": "paragraph",
          "props": {
              "textColor": "default",
              "backgroundColor": "default",
              "textAlignment": "left"
          },
          "content": [
              {
                  "type": "text",
                  "text": "Lorem Ipsum",
                  "styles": {
                      "bold": true
                  }
              },
              {
                  "type": "text",
                  "text": " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of ",
                  "styles": {}
              },
              {
                  "type": "text",
                  "text": "Letraset",
                  "styles": {
                      "comment": "adsa dasdas das dasdasdas das"
                  }
              },
              {
                  "type": "text",
                  "text": " sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "styles": {}
              }
          ],
          "children": []
      },
      {
          "id": "d69d1ce8-7e59-48a3-8c87-99007ff81a7f",
          "type": "paragraph",
          "props": {
              "textColor": "default",
              "backgroundColor": "default",
              "textAlignment": "left"
          },
          "content": [],
          "children": []
      }
  ],
  });


  return <BlockNoteView onChange={() => console.log(editor.document)} theme={"light"} editable editor={editor} formattingToolbar={false}>
    <CustomFormattingToolbar />
    <CommentToolbarController />
  </BlockNoteView>;
};
