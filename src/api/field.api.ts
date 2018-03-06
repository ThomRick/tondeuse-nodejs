import { Context } from 'koa';
import * as Router from 'koa-router';

export class FieldApi {
  constructor(private router: Router) {
    this.router.post('/api/fields', this.post);
  }

  private async post(context: Context) {
    context.status = 201;
  }
}
