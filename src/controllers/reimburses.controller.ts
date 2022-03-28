import {Body, Controller, Post, Route} from 'tsoa';
import {Inject} from 'typescript-ioc';
import { PartialReimburseRequest, ReimburseRequest } from '../types/controllers.type';
import {ReimbursesService} from '../services/reimburses/reimburses.service';

@Route('reimburses')
export class ReimbursesController extends Controller {
  @Inject protected readonly reimbursesService: ReimbursesService;

  @Post('{transaction}')
  public async reimburse(
    transaction: string,
    @Body() body: ReimburseRequest
  ): Promise<any> {
    const response = await this.reimbursesService.reimburse(
      transaction,
      body.reason
    );

    return response;
  }

  @Post('{transaction}/partial')
  public async partialReimburse(
    transaction: string,
    @Body() body: PartialReimburseRequest
  ): Promise<any> {
    const response = await this.reimbursesService.partialReimburse(
      transaction,
      body.reason,
      body.amount
    );

    return response;
  }
}