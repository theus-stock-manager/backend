import { AppDataSource } from "../data-source";
import { Company } from "../entities/company";
import { User } from "../entities/user";

export const initStaff = async (): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const companyRepo = AppDataSource.getRepository(Company);

  const staffAlreadyExists = await userRepo.findOneBy({ name: "Theus" });
  const companyAlreadyExists = await companyRepo.findOneBy({
    name: "stock manager staff",
  });

  if (!companyAlreadyExists) {
    const staffCompany = companyRepo.create({
      name: "stock manager staff",
      image: "https://i.ibb.co/s18dn80/staff-sticker.jpg",
    });

    await companyRepo.save(staffCompany);
  }

  if (!staffAlreadyExists) {
    const company = await companyRepo.findOneBy({
      name: "stock manager staff",
    });

    // console.log("=====================================================");
    // console.log(company);
    // console.log("=====================================================");

    const staff = userRepo.create({
      name: "Theus",
      password: "$2b$10$4KiN0bfjIedoVdbWAaC2PegM5zpwjAoKV1NGBDItldWsO/WOomGIW",
      securityAsk: "Data de casamento na igreja",
      securityAnswer: "23/02/2019",
      isAdm: true,
      isStaff: true,
      company: company!,
    });

    await userRepo.save(staff);

    console.log("Empresa staff criada com sucesso");
    console.log("Usuário staff criado com sucesso");
  } else {
    console.log("Empresa já existente no banco de dados");
    console.log("Usuário staff já existente no banco de dados");
  }
};
