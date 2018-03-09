const Instruction = require('./aggregate/instruction');

class ExecuteInstructionHandler {
  constructor(mowerRepository) {
    this.mowerRepository = mowerRepository;
  }

  executeInstruction(mowerId, instructionName) {
    const instruction = Instruction.from(instructionName);
    const mower = this.mowerRepository.get(mowerId);
    mower.execute(instruction);
    this.mowerRepository.save(mower);
  }
}

module.exports = { ExecuteInstructionHandler };