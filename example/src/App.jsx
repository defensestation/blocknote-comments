import { BlockNoteSchema, defaultStyleSpecs } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  FormattingToolbar,
  FormattingToolbarController,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import {
  commentStyleSpec,
  CommentToolbarController,
  CreateCommentButton,
} from "@defensestation/blocknote-comments";

const schema = BlockNoteSchema.create({
  styleSpecs: {
    // Adds all default styles.
    ...defaultStyleSpecs,
    // Adds the Font style.
    comment: commentStyleSpec,
  },
});

const CustomFormattingToolbar = () => (<FormattingToolbarController
  formattingToolbar={() => (
    <FormattingToolbar>
      <CreateCommentButton key={"createCommentButtin"} />
    </FormattingToolbar>
  )}
/>)

function App() {
  const editor = useCreateBlockNote({
    schema,
  });
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <BlockNoteView formattingToolbar={false} editor={editor}>
        <CustomFormattingToolbar />
        <CommentToolbarController />
      </BlockNoteView>
    </div>
  );
}

export default App;
