import {something as anotherThing} from '@gestaltjs/cli-support';

export function something(): string {
  anotherThing();
  return 'string';
}
