class MailServices {
  async sendActivationEmail(to: string, link: string) {
    return { to, link };
  }
}
export const MailService = new MailServices();
