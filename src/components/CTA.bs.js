// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as React from "react";

function CTA(Props) {
  var href = Props.href;
  var children = Props.children;
  return React.createElement("a", {
              className: "inline-block px-3 py-2 mt-8 font-semibold text-white no-underline rounded shadow-lg bg-key hover:shadow focus:shadow transform transition-all duration-100 ease-in-out hover:translate-y-px",
              href: href
            }, children);
}

var make = CTA;

export {
  make ,
  
}
/* react Not a pure module */