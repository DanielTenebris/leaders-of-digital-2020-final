import { Stories } from './stories';

export class Api {
  constructor(axios) {
    this.stories = new Stories(axios, '/api');
  }
}
