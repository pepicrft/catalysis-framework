import shell from 'shelljs';

export type ExecOptions = {
  cwd?: string;
  silent?: boolean;
}

export async function exec(command: string, options?: ExecOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = shell.exec(command, {async:true, silent: true, cwd: options?.cwd});
    child.stdout?.on('data', function (data) {
      if (!options?.silent) {
        console.log(data);
      }
    });
    child.stderr?.on('data', function (data) {
      if (!options?.silent) {
        console.error(data);
      }
    });
    child.on('exit', (exitCode) => {
      exitCode === 0 ? resolve() : reject();
    })
  });
}
