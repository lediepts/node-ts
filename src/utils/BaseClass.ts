import { Includeable, Model, ModelCtor, Order, WhereOptions } from "sequelize";

interface DefaultModel {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export default class BaseClass<T extends DefaultModel> {
  private DB: ModelCtor<Model<T>>;
  constructor(DB: ModelCtor<Model<any>>) {
    this.DB = DB;
  }

  async getAll(param?: {
    where?: WhereOptions<T>;
    group?: string;
    order?: Order;
    attributes?: string[];
    include?: Includeable | Includeable[];
  }): Promise<Model<T, T>[]> {
    try {
      const rs = await this.DB.findAll({ ...param });
      return rs;
    } catch (error) {
      console.log(error);
      throw (error as any).status || 500;
    }
  }
  async getOneByKey(
    param?:
      | number
      | string
      | {
          where?: WhereOptions<T>;
          group?: string;
          order?: Order;
          attributes?: string[];
          include?: Includeable | Includeable[];
        }
  ): Promise<Model<T, T> | undefined> {
    try {
      let rs: Model<T, T> | null = null;
      if (typeof param === "number" || typeof param === "string") {
        rs = await this.DB.findByPk(param);
      } else {
        rs = await this.DB.findOne({ ...param });
      }
      if (!rs)
        throw {
          status: 404,
          message: "not exits",
        };
      return rs;
    } catch (error) {
      throw (error as any).status || 500;
    }
  }

  async destroy(where: WhereOptions<T>) {
    try {
      await this.DB.destroy({
        where,
        force: true,
      });
    } catch (error) {
      throw (error as any).status || 500;
    }
  }
}
