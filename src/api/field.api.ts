import * as Router from 'koa-router';
import { Context } from 'koa';

export class FieldApi {
  constructor(private router: Router) {
    router.post('/api/field', this.post);
  }

  private async post(context: Context) {
    context.status = 201;
  }
}
