# EditorJS Drag/Drop Plugin

![Stability Badge](https://img.shields.io/badge/stability-stable-green.svg)
![](https://badgen.net/badge/Editor.js/v0.0.1/blue)

Comments feature for [Blocknote](https://www.blocknotejs.org/).

![](assets/demo.gif)

## Installation

### Install via YARN

Get the package

```shell
$ yarn add @defensestation/blocknote-comments
```



## Usage

Include module at your application

```javascript
import {
  commentStyleSpec,
  CommentToolbarController,
  CreateCommentButton,
} from "@defensestation/blocknote-comments";
```

Create schema with comment style spec.
```javascript
const schema = BlockNoteSchema.create({
  styleSpecs: {
    // Adds all default styles.
    ...defaultStyleSpecs,
    // Adds the Font style.
    comment: commentStyleSpec,
  },
});
```

Add comment button in toolbar.
```javascript
const CustomToolbar = () => (<FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar>
              <CreateCommentButton key={"createCommentButtin"} />
            </FormattingToolbar>
          )}
        />)
```

Add comment controller.
```javascript
<BlockNoteView formattingToolbar={false} editor={editor}>
    <CustomToolbar />
    <CommentToolbarController />
</BlockNoteView>
```


## Demo

[A demo is worth a thousand words](https://defencestation.com)
