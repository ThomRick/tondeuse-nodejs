import * as Router from 'koa-router';
import { Context } from 'koa';

export class FieldApi {
  constructor(private router: Router) {
    this.router.post('/api/fields', this.post);
  }

  private async post(context: Context) {
    context.status = 201;
  }
}