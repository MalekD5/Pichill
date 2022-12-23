export function constructErr(message: string) {
  return {
    type: 'custom',
    message,
  };
}
