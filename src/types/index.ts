// IP Address Types
export interface IpDetails {
  ip: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  continent_code: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  asn: string;
  org: string;
  isp: string;
  languages: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  connection: {
    type?: string;
    mobile?: boolean;
    proxy?: boolean;
    vpn?: boolean;
    tor?: boolean;
  };
}

// WHOIS Domain Types
export interface DomainDetails {
  domain: string;
  domain_id: string;
  status: string[];
  created: string;
  updated: string;
  expires: string;
  registrar: {
    name: string;
    url: string;
    email: string;
    phone: string;
  };
  registrant: {
    name: string;
    organization: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    email: string;
  };
  nameservers: string[];
  dnssec: boolean;
}

// System Information
export interface SystemInfo {
  browser: {
    name: string;
    version: string;
    language: string;
    platform: string;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
  screen: {
    width: number;
    height: number;
    colorDepth: number;
    orientation: string;
  };
  os: {
    name: string;
    version: string;
  };
  connection: {
    type: string;
    downlink: number;
    rtt: number;
    effectiveType: string;
  };
}

// Lookup History Item
export interface LookupHistoryItem {
  id: string;
  type: 'ip' | 'domain';
  query: string;
  timestamp: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}