const FieldId = require('./fieldId');

class Field {
  constructor(fieldId, mowers) {
    this.fieldId = fieldId;
    this.mowers = mowers;
  }

  getFieldId() {
    return this.fieldId;
  }

  getMowers() {
    return this.mowers;
  }

  static empty() {
    return new Field(FieldId.create(), []);
  }
}

module.exports = Field;
