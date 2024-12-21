import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService){}

  async sendActiveCodeToGmail(name: string, code: string, template: string) {
    await this.mailerService.sendMail({
      to: "testcungcat@gmail.com",
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
