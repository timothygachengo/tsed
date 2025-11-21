import {DmmfModel} from "../generator/domain/DmmfModel.js";
import dmmfUserModel from "./dmmfUserModel.json" with {type: "json"};

export function createDmmfModelFixture() {
  return new DmmfModel(dmmfUserModel as any);
}
