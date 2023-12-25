export const environment = {
  apiDomain: "http://10.1.12.148:5000",
  sso: {
    ssoFormIp: "https://sso.dev.elcld.net/auth/realms/Ticketing/protocol/openid-connect/auth?response_type=code&scope=ticketing-service&client_id=ticketing-client&redirect_uri=http://localhost:4200/redirect_uri",
    ssoTokenIp: "https://sso.dev.elcld.net/auth/realms/Ticketing/protocol/openid-connect/token",
    mySiteIp: "http://localhost:4200/redirect_uri",
  },
  Config: {
    Basic: {
      language: 'en'
    },
    Storage: {
      Key: 'ticketSystem',
      Timeout: 168, // a week
      ResetKey: '20220607' // yyyymmdd is best option
    },
  }
};
