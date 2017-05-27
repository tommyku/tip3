import {v4 as guid} from 'uuid';

class Paste {
  constructor(arg) {
    switch (typeof arg) {
      case 'Paste':
        this.constructAsPaste(arg);
        break;
      case 'object':
        this.constructAsObject(arg);
        break;
      default:
        this.constructAsObject({value: 'nothing'});
    }
  }

  constructAsPaste(paste) {
    this.constructAsObject(paste.serialize());
  }

  constructAsObject({value, createdAt, uuid, _id}) {
    this.value = value;
    this.createdAt = createdAt || (new Date()).toString();
    this.uuid = uuid || guid();
    this._id = `tip3-${this.uuid}`
  }

  serialize() {
    return {
      value: this.value,
      createdAt: this.createdAt,
      uuid: this.uuid,
      _id: this._id
    };
  }
}

export default Paste;
