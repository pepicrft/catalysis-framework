export function content(componentModuleId: string, domElementSelector: string) {
  return `
  import ReactDOM from 'react-dom';
  import ComponentToHydrate from '${componentModuleId}';

  const domElement = document.querySelector('${domElementSelector}');
  ReactDOM.hydrate(<ComponentToHydrate/>, domElement);
  `
}

const extension = 'jsx'

export const hydrate = { content, extension }
