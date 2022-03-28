import {Body, Controller, Post, Route} from 'tsoa';
import {Inject} from 'typescript-ioc';
import { TokenizeRequest } from '../types/controllers.type';
import {TokenizationsService} from '../services/tokenizations/tokenizations.service';

@Route('tokenizations')
export class TokenizationsController extends Controller {
  @Inject protected readonly tokenizationsService: TokenizationsService;

  @Post('')
  public async tokenize(
    @Body() body: TokenizeRequest
  ): Promise<any> {
    const response = await this.tokenizationsService.tokenize(
      body.customer,
      body.company,
      body.gateway,
      body.card
    );

    return response;
  }

}