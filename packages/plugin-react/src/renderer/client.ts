import { renderer } from '@gestaltjs/plugins'

// eslint-disable-next-line import/no-default-export
export const clientRenderer: renderer.Client = {
  hydrate: async function (componentModuleId, domElementSelector) {
    return `
    import ReactDOM from 'react-dom';
    import ComponentToHydrate from '${componentModuleId}';

    const domElement = document.querySelector('${domElementSelector}');
    ReactDOM.hydrate(<ComponentToHydrate/>, domElement);
    `
  },
}
