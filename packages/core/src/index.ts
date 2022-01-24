import {something as anotherThing} from '@gestaltjs/support';

export function something(): string {
  anotherThing();
  return 'string';
}
