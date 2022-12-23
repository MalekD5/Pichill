import jwtDecode from 'jwt-decode';

type JWTDecode = {
  username: string;
};

export function decodeUsername(token: string): string {
  return jwtDecode<JWTDecode>(token).username;
}
