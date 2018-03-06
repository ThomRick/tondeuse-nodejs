import * as Router from 'koa-router';
import { Context } from 'koa';

export class MowerApi {
  constructor(private router: Router) {
    this.router.post('/api/mowers', this.post);
  }

  private async post(context: Context) {
    context.status = 201;
  }
}
