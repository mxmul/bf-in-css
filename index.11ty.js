const css = require("noop-tag");
const html = require("noop-tag");

const bfProgramLibrary = {
  simpleDemo: "+++[.-].",
  helloWorld:
    "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
  fibonacci:
    "+.++++++++>+>+<<[->>.[->+>+<<]<[->>+<<]>>[-<+>]>[-<<<+>>>]<<<<]>>",
};
/* Update this line to simulate a different BF program */
const source = bfProgramLibrary.simpleDemo;

function highlightedRules() {
  return css`
    outline: 2px solid red;
  `;
}

function commonCSS() {
  return css`
    body {
      counter-reset: instruction -1;
      /* white-space: nowrap; */
      padding: 2rem;
    }
    button {
      padding: 1rem;
      font-size: 1.5rem;
    }

    a[data-instruction] {
      display: block;
      pointer-events: none;
      counter-increment: instruction;
    }
    a[data-instruction]::before {
      content: counter(instruction) " ";
    }
    a[data-instruction]:target {
      ${highlightedRules()}
      pointer-events: auto;
    }

    [data-branch-options] {
      display: none;
    }

    [data-jmp-for] {
      display: none;
    }
    input:active ~ [data-jmp-for] {
      display: none !important;
    }

    [data-jmp-for]:active {
      display: block;
    }
    [data-jmp-for] > a {
      ${highlightedRules()}
    }

    /* byte value readout */
    [data-bit="0"] {
      counter-reset: byte 0;
    }
    [data-bit="0"]:checked {
      counter-increment: byte 1;
    }
    [data-bit="1"]:checked {
      counter-increment: byte 2;
    }
    [data-bit="2"]:checked {
      counter-increment: byte 4;
    }
    [data-bit="3"]:checked {
      counter-increment: byte 8;
    }
    [data-bit="4"]:checked {
      counter-increment: byte 16;
    }
    [data-bit="5"]:checked {
      counter-increment: byte 32;
    }
    [data-bit="6"]:checked {
      counter-increment: byte 64;
    }
    [data-bit="7"]:checked {
      counter-increment: byte 128;
    }

    @counter-style unprintable-ascii {
      system: cyclic;
      symbols: "�";
    }
    @counter-style ascii {
      system: fixed;
      symbols: � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � � "␣"
        "!" '"' "#" "$" "%" "&" "'" "(" ")" "*" "+" "," "-" "." "/" "0" "1" "2"
        "3" "4" "5" "6" "7" "8" "9" ":" ";" "<" "=" ">" "?" "@" "A" "B" "C" "D"
        "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V"
        "W" "X" "Y" "Z" "[" "${"\\\\"}" "]" "^" "_" "${"`"}" "a" "b" "c" "d" "e"
        "f" "g" "h" "i" "j" "k" "l" "m" "n" "o" "p" "q" "r" "s" "t" "u" "v" "w"
        "x" "y" "z" "{" "|" "}" "~";
      fallback: unprintable-ascii;
    }
    [data-bit="7"]::after {
      content: counter(byte, ascii) " (" counter(byte, decimal-leading-zero) ")";
      font-family: monospace;
      white-space: nowrap;
      padding-left: 2rem;
    }

    /* NOOP rules */
    /* INC rules */
    [data-instruction="INC"]:target:focus
      ~ [name="memory-ptr"]:checked
      + [data-bit="0"],
    [data-instruction="INC"]:target
      ~ [name="memory-ptr"]:checked
      ~ [data-bit]:active,
    [data-instruction="INC"]:target
      ~ [name="memory-ptr"]:checked
      ~ [data-bit]:focus:not(:checked):not(:active)
      + [data-bit] {
      ${highlightedRules()}
    }

    /* INV rules */
    [data-instruction="INV"]:target:focus
      ~ [name="memory-ptr"]:checked
      + [data-bit="0"],
    [data-instruction="INV"]:target
      ~ [name="memory-ptr"]:checked
      ~ [data-bit]:active,
    [data-instruction="INV"]:target
      ~ [name="memory-ptr"]:checked
      ~ [data-bit]:focus:not(:active)
      + [data-bit] {
      ${highlightedRules()}
    }

    /* BNZ, BEQ */
    [name="memory-ptr"]:checked
      + [data-bit="0"]:not(:checked)
      + [data-bit="1"]:not(:checked)
      + [data-bit="2"]:not(:checked)
      + [data-bit="3"]:not(:checked)
      + [data-bit="4"]:not(:checked)
      + [data-bit="5"]:not(:checked)
      + [data-bit="6"]:not(:checked)
      + [data-bit="7"]:not(:checked)
      ~ [data-jmp-for]
      > [data-branch="1"] {
      display: none;
    }
    [name="memory-ptr"]:checked + :checked ~ [data-jmp-for] > [data-branch="0"],
    [name="memory-ptr"]:checked
      + *
      + :checked
      ~ [data-jmp-for]
      > [data-branch="0"],
    [name="memory-ptr"]:checked
      + *
      + *
      + :checked
      ~ [data-jmp-for]
      > [data-branch="0"],
    [name="memory-ptr"]:checked
      + *
      + *
      + *
      + :checked
      ~ [data-jmp-for]
      > [data-branch="0"],
    [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + *:checked
      ~ [data-jmp-for]
      > [data-branch="0"],
    [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + *
      + *:checked
      ~ [data-jmp-for]
      > [data-branch="0"],
    [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + *
      + *
      + *:checked
      ~ [data-jmp-for]
      > [data-branch="0"],
    [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + *
      + *
      + *
      + *:checked
      ~ [data-jmp-for]
      > [data-branch="0"] {
      display: none;
    }
    /* RIGHT */
    [data-instruction="RIGHT"]:target
      ~ [name="memory-ptr"]:checked
      ~ [name="memory-ptr"] {
      ${highlightedRules()}
    }
    [data-instruction="RIGHT"]:target
      ~ [name="memory-ptr"]:checked
      ~ [name="memory-ptr"]
      ~ [name="memory-ptr"],
    [data-instruction="RIGHT"]:target ~ [name="memory-ptr"]:focus,
    [data-instruction="RIGHT"]:target
      ~ [name="memory-ptr"]:focus
      ~ [name="memory-ptr"] {
      outline: none;
    }

    /* LEFT */
    [data-instruction="LEFT"]:target ~ [name="memory-ptr"] {
      ${highlightedRules()}
    }
    [data-instruction="LEFT"]:target ~ [name="memory-ptr"]:checked,
    [data-instruction="LEFT"]:target
      ~ [name="memory-ptr"]:checked
      ~ [name="memory-ptr"] {
      outline: none;
    }

    /* PUT */
    [data-instruction="PUT"]:target ~ [name="stdout-ptr"]:not(:checked) {
      ${highlightedRules()}
    }
    [data-instruction="PUT"]:target
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [name="stdout-ptr"],
    [data-instruction="PUT"]:target
      ~ [name="stdout-ptr"]:focus
      ~ [name="stdout-ptr"] {
      outline: none;
    }
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + [data-bit="0"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="0"]:not(:checked),
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + *
      + [data-bit="1"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="1"]:not(:checked),
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + *
      + *
      + [data-bit="2"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="2"]:not(:checked),
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + *
      + *
      + *
      + [data-bit="3"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="3"]:not(:checked),
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + [data-bit="4"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="4"]:not(:checked),
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + *
      + [data-bit="5"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="5"]:not(:checked),
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + *
      + *
      + [data-bit="6"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="6"]:not(:checked),
    [data-instruction="PUT"]:target
      ~ [name="memory-ptr"]:checked
      + *
      + *
      + *
      + *
      + *
      + *
      + *
      + [data-bit="7"]:checked
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [data-bit="7"]:not(:checked) {
      ${highlightedRules()}
    }
    [data-instruction="PUT"]:target
      ~ [name="stdout-ptr"]:not(:checked)
      ~ [name="stdout-ptr"]
      ~ [data-bit],
    [data-instruction="PUT"]:target ~ [name="stdout-ptr"]:focus ~ [data-bit] {
      outline: none !important;
    }
  `;
}

function instructionsCSS(instructions) {
  return instructions
    .map((instruction, idx) => {
      switch (instruction[0]) {
        case "NOOP":
        case "BNZ":
        case "BEZ":
          return css`
            /* ${idx}: ${instruction[0]} */
            #instruction-${idx}:target ~ [data-jmp-for="instruction-${idx}"] {
              display: block;
            }
          `;
        case "INC":
          return css`
            /* ${idx}: ${instruction[0]} */
            #instruction-${idx}:target
              ~ [data-bit]:focus:checked
              ~ [data-jmp-for="instruction-${idx}"],
            #instruction-${idx}:target
              ~ [data-bit="7"]:focus
              ~ [data-jmp-for="instruction-${idx}"] {
              display: block;
            }
          `;
        case "INV":
          return css`
            /* ${idx}: ${instruction[0]} */
            #instruction-${idx}:target
              ~ [data-bit="7"]:focus
              ~ [data-jmp-for="instruction-${idx}"] {
              display: block;
            }
          `;
        case "LEFT":
        case "RIGHT":
          return css`
            /* ${idx}: ${instruction[0]} */
            #instruction-${idx}:target
              ~ [name*="memory-ptr"]:focus
              ~ [data-jmp-for="instruction-${idx}"] {
              display: block;
            }
          `;

        case "PUT":
          return css`
            /* ${idx}: ${instruction[0]} */
            #instruction-${idx}:target
              ~ [name="stdout-ptr"]:focus
              ~ [data-jmp-for="instruction-${idx}"] {
              display: block;
            }
          `;
      }
    })
    .join("");
}

function instructionsHtml(instructions) {
  return instructions
    .map(
      (instruction, idx) =>
        html`
          <a
            id="instruction-${idx}"
            data-instruction="${instruction[0]}"
            href="#instruction-${idx}"
          >
            ${instruction.join(" ")}
          </a>
        `
    )
    .join("");
}

function instructionsJumpsHtml(instructions) {
  return instructions
    .map((instruction, idx) => {
      switch (instruction[0]) {
        case "BNZ":
          return html`
            <div data-jmp-for="instruction-${idx}">
              <a data-branch="0" href="#instruction-${idx + 1}"
                >JMP ${idx + 1}</a
              >
              <a data-branch="1" href="#instruction-${instruction[1]}"
                >JMP ${instruction[1]}</a
              >
            </div>
          `;
        case "BEZ":
          return html`
            <div data-jmp-for="instruction-${idx}">
              <a data-branch="0" href="#instruction-${instruction[1]}"
                >JMP ${instruction[1]}</a
              >
              <a data-branch="1" href="#instruction-${idx + 1}"
                >JMP ${idx + 1}</a
              >
            </div>
          `;
        case "HALT":
          return html`
            <div data-jmp-for="instruction-${idx}">
              <a href="#instruction-${idx}">JMP ${idx}</a>
            </div>
          `;
        default:
          return html`
            <div data-jmp-for="instruction-${idx}">
              <a href="#instruction-${idx + 1}">JMP ${idx + 1}</a>
            </div>
          `;
      }
    })
    .join("");
}

function memoryHtml(memSize, initialValues) {
  return Array(memSize)
    .fill(0)
    .map((_, idx) => {
      let initialValue = 0;
      if (idx < initialValues.length) {
        initialValue = initialValues[idx];
      }

      return html`<input
          name="memory-ptr"
          type="radio"
          ${idx === 0 ? "checked" : ""}
        />
        ${Array(8)
          .fill(0)
          .map(
            (_, bitIdx) =>
              html`
                <input
                  type="checkbox"
                  data-bit="${bitIdx}"
                  ${(initialValue >> bitIdx) & (1 === 1) ? "checked" : ""}
                />
              `
          )
          .join("")}
        <br />`;
    })
    .join("");
}

function outputHtml(maxLength) {
  return Array(maxLength)
    .fill(0)
    .map((_, idx) => {
      return html`<input name="stdout-ptr" type="checkbox" />
        ${Array(8)
          .fill(0)
          .map(
            (_, bitIdx) =>
              html` <input type="checkbox" data-bit="${bitIdx}" /> `
          )
          .join("")}
        <br />`;
    })
    .join("");
}

function compile(bf) {
  const instructions = [];
  const sourceMap = [];

  const openParenIdx = [];
  const matchingParenIdx = {};

  Array.from(bf).forEach((command, idx) => {
    switch (command) {
      case "[":
        openParenIdx.push(idx);
        break;
      case "]":
        const otherIdx = openParenIdx.pop();
        matchingParenIdx[idx] = otherIdx;
        matchingParenIdx[otherIdx] = idx;
        break;
    }
  });

  Array.from(bf).forEach((command, idx) => {
    let sourceMapEntry = [];

    function addInstruction(...instruction) {
      sourceMapEntry.push(instructions.length);
      instructions.push(instruction);
    }

    function negate() {
      addInstruction("INV");
      addInstruction("INC");
    }

    switch (command) {
      case ">":
        addInstruction("RIGHT");
        break;
      case "<":
        addInstruction("LEFT");
        break;
      case "+":
        addInstruction("INC");
        break;
      case "-":
        negate();
        /* INC */
        addInstruction("INC");
        /* NEGATE */
        negate();
        break;
      case "[":
        addInstruction("BEZ", matchingParenIdx[idx] + 1);
        break;
      case "]":
        addInstruction("BNZ", matchingParenIdx[idx] + 1);
        break;
      case ".":
        addInstruction("PUT");
        break;
      case ",":
        addInstruction("NOOP");
        break;
      default:
        break;
    }
    if (idx === bf.length - 1) {
      addInstruction("HALT");
    }

    sourceMap.push(sourceMapEntry);
  });

  // adjust jump targets to account for BF commands sometimes emitting multiple bytecode instructions
  instructions.forEach((instruction) => {
    if (instruction.length > 1) {
      if (instruction[1] === bf.length) {
        // point at the HALT instruction
        const sourceMapEntry = sourceMap[instruction[1] - 1];
        instruction[1] = sourceMapEntry[sourceMapEntry.length - 1];
      } else {
        // point at the first instruction associated with the target BF command
        const sourceMapEntry = sourceMap[instruction[1]];
        instruction[1] = sourceMapEntry[0];
      }
    }
  });

  //   >	Increment the data pointer (to point to the next cell to the right).
  // <	Decrement the data pointer (to point to the next cell to the left).
  // +	Increment (increase by one) the byte at the data pointer.
  // -	Decrement (decrease by one) the byte at the data pointer.
  // .	Output the byte at the data pointer.
  // ,	Accept one byte of input, storing its value in the byte at the data pointer.
  // [	If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
  // ]	If the byte at the data point

  return [instructions, sourceMap];
}

function bfProgram(source, sourceMap, instructions) {
  const bfCss = css`
    .bf-command {
      font-family: monospace;
      font-size: 1.5rem;
      padding: 8px;
    }

    ${instructions
      .map(
        (_, idx) => css`
          #instruction-${idx}:target ~ .bf-sourcemap-${idx} {
            background: yellow;
          }
        `
      )
      .join("\n")}
  `;

  const bfHtml = Array.from(source)
    .map((command, idx) => {
      return html`<span
        class="
        bf-command
        ${sourceMap[idx]
          .map((instructionIdx) => `bf-sourcemap-${instructionIdx}`)
          .join(" ")}
        "
        >${command}</span
      >`;
    })
    .join("");

  return html`<style>
      ${bfCss}</style
    >${bfHtml}`;
}

module.exports = function (data) {
  const [instructions, sourceMap] = compile(source);
  const memSize = 16;
  const outputSize = 16;
  const initialValues = [];

  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>CSS Brainfuck</title>
        <style>
          ${commonCSS()}
        </style>
        <style>
          ${instructionsCSS(instructions)}
        </style>
      </head>
      <body>
        <h2>Bytecode</h2>
        ${instructionsHtml(instructions)}

        <hr />
        <h2>Source</h2>
        ${bfProgram(source, sourceMap, instructions)}

        <hr />
        <h2>Memory</h2>
        ${memoryHtml(memSize, initialValues)}

        <hr />
        <h2>Output</h2>
        ${outputHtml(outputSize)} ${instructionsJumpsHtml(instructions)}

        <br />
        <button id="run">Run</button>
        <script>
          function getTarget() {
            const allElements = document.querySelectorAll("body *");
            const highlightedElements = Array.from(allElements).filter((el) => {
              const { display, outline } = getComputedStyle(el);
              const hasOutline = outline === "rgb(255, 0, 0) solid 2px";
              const { width, height } = el.getBoundingClientRect();
              const isVisible = width > 0 && height > 0;
              return hasOutline && isVisible;
            });
            return highlightedElements.length > 0
              ? highlightedElements[highlightedElements.length - 1]
              : null;
          }

          let clickCount = 0;

          function click() {
            const target = getTarget();
            if (target && target.dataset.instruction !== "HALT") {
              clickCount += 1;
              target.focus();
              target.click();
              return target;
            } else {
              console.log("halted after " + clickCount + " clicks");
              return null;
            }
          }

          function run() {
            function rafCallback() {
              const target = click();
              if (target) {
                requestAnimationFrame(rafCallback);
              }
            }
            requestAnimationFrame(rafCallback);
          }

          const runButton = document.querySelector("button#run");
          runButton.addEventListener("click", () => {
            run();
          });
        </script>
      </body>
    </html>
  `;
};
