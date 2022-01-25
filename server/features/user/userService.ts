import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { getPaginatedList } from "../../utils/serviceUtils";
import { UserPostData } from "./userTypes";


export const getItem = async (id: string) => {
  const user = await User.findOneOrFail({ uuid: id });
  return user;
}



export const getList = async (page: number, rowsPerPage = 10) => {

  return await getPaginatedList(
    getRepository(User),
    {
      select: ['uuid', 'name', 'email', 'createdAt', 'updatedAt'],
      page,
      rowsPerPage,
      order: {
        updatedAt: 'DESC'
      }
    }
  );
}



export const checkExistingByEmail = async (email: string) => {
  return !!(await User.count({where: {email}}));
}



export const getAccountData = async (email: string) => {
  const user = await User.findOneOrFail({email});
  return user;
}



export const create = async (data: UserPostData) => {
  const user = User.create(data);
  await user.save();
  return user;
}



export default {
  getItem,
  getList,
  checkExistingByEmail,
  getAccountData,
  create
}