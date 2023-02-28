import { autoInjectable } from "tsyringe";
import { GoogleAuthRepository } from "../../data/repositories/GoogleAuthRepository";
import { GoogleSource } from "../../data/sources/remote/GoogleSource";

@autoInjectable()
export class GetTokenOAuthUseCase {
  constructor(
    private authRepository: GoogleAuthRepository,
  ) {}

  async execute(code: string) {
    return await this.authRepository.getCredentialOAuth(code);
  }
}
