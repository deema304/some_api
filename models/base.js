class Base {
  constructor() {}

  getInstance() {
    return this._schema;
  }

  async create(queryOptions) {
    return this.getInstance().create(queryOptions);
  }

  async findOne(queryOptions) {
    return this.getInstance().findOne(queryOptions);
  }

  async update(queryOptions, newValues) {
    const instance = await this.getInstance().findOne({ where: queryOptions });

    if(!instance) {
      throw new Error('Nothing to update');
    }

    instance.update(newValues);

    return instance;
  }

  async getById(id) {
    return this.getInstance().findOne({ where: { id } });
  }

  async search(queryOptions) {
    return this.getInstance().findAll({ where: queryOptions });
  }

  async deleteById(id) {
    return this.getInstance().destroy({ where: { id } });
  }
}

module.exports = Base;