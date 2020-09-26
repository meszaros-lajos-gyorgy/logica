/* global R */

const { init, last, evolve } = R

const tick = gate => {
  if (gate.gates) {
    const { gates, output } = gate.handler(gate.inputs, gate.gates)
    return evolve(
      {
        gates: () => gates,
        output: () => output
      },
      gate
    )
  } else {
    const buffer = [gate.handler(gate.inputs), ...gate.buffer]
    return evolve(
      {
        buffer: () => init(buffer),
        output: () => last(buffer)
      },
      gate
    )
  }
}

const NOR = () => {
  return {
    inputs: {
      a: false,
      b: false
    },
    buffer: [],
    handler: ({ a, b }) => !a && !b,
    output: null
  }
}

const CLOCK = () => {
  return {
    gates: {
      nor: NOR()
    },
    inputs: {},
    output: null,
    handler: (inputs, gates) => {
      gates.nor.inputs.b = gates.nor.output
      const nextNor = tick(gates.nor)

      return {
        gates: {
          nor: nextNor
        },
        output: nextNor.output
      }
    }
  }
}

let clock = CLOCK()

for (let i = 0; i < 30; i++) {
  clock = tick(clock)
  console.log(clock.output)
}
