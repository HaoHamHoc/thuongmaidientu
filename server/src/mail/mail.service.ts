import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService){}

  async sendActiveCodeToGmail(email: string, name: string, code: string, template: string) {
    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <Kitten>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: `./${template}`,
      context: {
        name: name,
        code: code
      },
    });
  }
}
