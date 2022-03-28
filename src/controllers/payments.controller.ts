import {Body, Controller, Post, Route} from 'tsoa';
import {Inject} from 'typescript-ioc';
import {PaymentsService} from '../services/payments/payments.service';
import {CaptureRequest, PayRequest} from '../types/controllers.type';

@Route('payments')
export class PaymentsController extends Controller {
  @Inject protected readonly paymentsService: PaymentsService;

  @Post('')
  public async pay(
    @Body() body: PayRequest
  ): Promise<any> {
    const response = await this.paymentsService.pay(
      body.customer,
      body.company,
      body.gateway,
      body.amount
    );

    return response;
  }

  @Post('/capture')
  public async capture(
    @Body() body: CaptureRequest
  ): Promise<any> {
    const response = await this.paymentsService.capture(
      body.customer,
      body.company,
      body.gateway,
      body.amount
    );

    return response;
  }
}