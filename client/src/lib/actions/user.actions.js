import { Officer } from "@/constants";
export const getUser = (userId) => {
  const user = Officer.find((officer) => officer.id === userId);
  console.log(user);
  return user;
};
