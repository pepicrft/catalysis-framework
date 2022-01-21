function isTruthy(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  return ['TRUE', 'true', 'YES', 'yes', '1'].includes(value);
}

export const isDebug = isTruthy(process.env.DEBUG);
