# gestalt.config.js

Gestalt projects are configured through a configuration file at the root of the project, `gestalt.config.js` (or `.ts` when using Typescript). The configuration file is also used a reference to determine if a directory represents a Gestalt project.

```typescript
import {defineConfiguration} from "gestaltjs/configuration"

export default defineConfiguration({})
```

