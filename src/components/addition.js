import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { AiOutlineMinusCircle } from "react-icons/ai";

export default function Addition({ set, add, remove, idx, val }) {
  const [open, setOpen] = useState(false);
  const props = useSpring({
    to: { opacity: 1, overflow: "hidden", height: "auto" },
    from: { opacity: 0, height: 0 },
  });
  return (
    <animated.div style={props}>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="p-2 form-group mx-sm-3"
      >
        <input
          className="form-control"
          type="text"
          onChange={(e) => set(idx, e.target.value)}
          value={val}
        />
        <button type="button" class="iconic" onClick={() => remove(idx)}>
          <AiOutlineMinusCircle />
        </button>
      </div>
    </animated.div>
  );
}
