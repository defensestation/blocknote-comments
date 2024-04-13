
import {
    createReactStyleSpec,
  } from "@blocknote/react";
import { useMemo } from "react";

export const comment = createReactStyleSpec(
    {
      type: "comment",
      propSchema: "string",
    },
    {
      render: (props) => {
        const id = useMemo(() => new Date().valueOf().toString(), [props]);
        return (
          <span
            id={id}
            className="testing"
            ref={props.contentRef}
            style={props.value ? { background: "#fcbc03", color: "#000" } : {}}
          ></span>
        );
      },
    }
  );