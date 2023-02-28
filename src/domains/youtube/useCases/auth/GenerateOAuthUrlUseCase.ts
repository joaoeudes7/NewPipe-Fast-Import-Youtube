import { autoInjectable } from "tsyringe";
import { GoogleAuthRepository } from "../../data/repositories/GoogleAuthRepository";

@autoInjectable()
export class GenerateOAuthUrlUseCase {
  constructor(private oAuthRepository: GoogleAuthRepository) {}

  async execute() {
    return await this.oAuthRepository.generateOAuthUrl();
  }
}
