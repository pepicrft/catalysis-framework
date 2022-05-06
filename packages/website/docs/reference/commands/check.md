# gestalt check

This command runs a series of checks to ensure that the Gestalt project is in a good state.

`gestalt check [option..]`

| Name | Description | Required | Default |
| --- | ----- | --- | ----- |
| `option` | The options are `code`, `styles` and `all`. | Yes | - |
| `--path` | The path to the app directory | No | working directory |
| `--fix` | Option to fix fixable problems detected within the checks | No | false|

## Usage

`gestalt check styles --path path`

`gestalt check code`
