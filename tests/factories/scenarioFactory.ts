import { resetDatabase } from "../../src/repositories/foodRepository.js";

export async function deleteAllData() {
  await resetDatabase();
}